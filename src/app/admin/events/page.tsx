"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";
import { Check, Copy, PlusCircle, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Event {
  _id?: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  included?: boolean;
}

const CACHE_KEY = "eventsCache";

export default function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    date: "",
    description: "",
    image: "",
    link: "",
    included: true,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<Event | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Array.isArray(data) && Date.now() - ts < cacheTTL) {
          setEvents(data);
          setLoading(false);
          return;
        }
      }

      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();
      const validData = Array.isArray(data) ? data : [];

      setEvents(validData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(validData));
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  function updateCache(newData: Event[]) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    setEvents(newData);
  }

  async function handleAdd() {
    if (
      !newEvent.title.trim() ||
      !newEvent.date.trim() ||
      !newEvent.description.trim() ||
      !newEvent.image.trim() ||
      !newEvent.link.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error("Failed to add event");

      const created = await res.json();
      toast.success("Event added successfully!");

      const updatedEvents = [created, ...events];
      updateCache(updatedEvents);

      setNewEvent({
        title: "",
        date: "",
        description: "",
        image: "",
        link: "",
        included: true,
      });
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Error adding event");
    } finally {
      setUpdating(false);
    }
  }

  async function handleEdit(event: Event) {
    if (
      !event.title.trim() ||
      !event.date.trim() ||
      !event.description.trim() ||
      !event.image.trim() ||
      !event.link.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to update event");

      toast.success("Event updated successfully!");
      const updatedEvents = events.map((e) =>
        e._id === event._id ? event : e
      );
      updateCache(updatedEvents);
    } catch (err) {
      console.error(err);
      toast.error("Error updating event");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDeleteConfirmed(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      toast.success("Event deleted successfully!");
      const updatedEvents = events.filter((e) => e._id !== id);
      updateCache(updatedEvents);
      setConfirmDelete(null);
      setConfirmText("");
      setCopied(false);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting event");
    } finally {
      setUpdating(false);
    }
  }

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="
            animate-spin 
            inline-block 
            size-8 
            border-4 
            border-current 
            border-t-transparent 
            text-blue-500 
            rounded-full 
            dark:text-blue-400
          "
          role="status"
          aria-label="loading"
        ></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-light dark:bg-dark p-10">
      <h1 className="text-3xl font-display font-bold mb-8 text-center mt-20">
        Manage Events
      </h1>

      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by title..."
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="font-display cursor-pointer">
                <PlusCircle className="h-4 w-4" />
                Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-4">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-2">
                <Input
                  placeholder="Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <Input
                  placeholder="Date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
                <Input
                  placeholder="Image URL"
                  value={newEvent.image}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, image: e.target.value })
                  }
                />
                <Input
                  placeholder="Event Link"
                  value={newEvent.link}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, link: e.target.value })
                  }
                />

                <Toggle
                  pressed={newEvent.included}
                  onPressedChange={() =>
                    setNewEvent({ ...newEvent, included: !newEvent.included })
                  }
                  className={`font-display w-full cursor-pointer ${
                    newEvent.included
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
                  }`}
                >
                  {newEvent.included ? (
                    <>
                      Included <Check className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Excluded <X className="h-4 w-4" />
                    </>
                  )}
                </Toggle>

                <Button
                  onClick={handleAdd}
                  disabled={updating}
                  className={`font-display w-full cursor-pointer ${
                    updating ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  Add Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events Grid */}
        {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((e) => (
              <motion.div
                key={e._id}
                className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow flex flex-col gap-2"
              >
                <Input
                  className="text-lg font-semibold bg-transparent outline-none"
                  value={e.title}
                  onChange={(ev) =>
                    setEvents((prev) =>
                      prev.map((x) =>
                        x._id === e._id ? { ...x, title: ev.target.value } : x
                      )
                    )
                  }
                />
                <Input
                  type="text"
                  className="bg-transparent outline-none"
                  placeholder="Date"
                  value={e.date}
                  onChange={(ev) =>
                    setEvents((prev) =>
                      prev.map((x) =>
                        x._id === e._id ? { ...x, date: ev.target.value } : x
                      )
                    )
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={e.description}
                  onChange={(ev) =>
                    setEvents((prev) =>
                      prev.map((x) =>
                        x._id === e._id
                          ? { ...x, description: ev.target.value }
                          : x
                      )
                    )
                  }
                />
                <Input
                  placeholder="Image URL"
                  value={e.image}
                  onChange={(ev) =>
                    setEvents((prev) =>
                      prev.map((x) =>
                        x._id === e._id ? { ...x, image: ev.target.value } : x
                      )
                    )
                  }
                />
                <Input
                  placeholder="Event Link"
                  value={e.link}
                  onChange={(ev) =>
                    setEvents((prev) =>
                      prev.map((x) =>
                        x._id === e._id ? { ...x, link: ev.target.value } : x
                      )
                    )
                  }
                />

                <div className="flex gap-2 mt-2 items-center">
                  <Toggle
                    pressed={e.included}
                    onPressedChange={() =>
                      setEvents((prev) =>
                        prev.map((p) =>
                          p._id === e._id ? { ...p, included: !p.included } : p
                        )
                      )
                    }
                    className={`font-display transition-colors cursor-pointer duration-200 ${
                      e.included
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
                    }`}
                    size="sm"
                  >
                    {e.included ? (
                      <>
                        Included <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Excluded <X className="h-4 w-4" />
                      </>
                    )}
                  </Toggle>

                  <Button
                    size="sm"
                    onClick={() => handleEdit(e)}
                    disabled={updating}
                    className={`font-display cursor-pointer ${
                      updating ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setConfirmDelete(e)}
                    disabled={updating}
                    className={`font-display cursor-pointer ${
                      updating ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No events found.
          </p>
        )}
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmDelete(null);
            setConfirmText("");
            setCopied(false);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          {confirmDelete && (
            <>
              <div className="mb-2">
                Are you sure you want to delete the following event?
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 p-2 rounded">
                <span className="font-mono break-words">
                  {confirmDelete.title}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(confirmDelete.title);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                {copied && (
                  <span className="text-green-500 text-sm">Copied!</span>
                )}
              </div>
              <div className="mt-2">
                <Input
                  placeholder="Paste the event title here to confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setConfirmDelete(null);
                    setConfirmText("");
                    setCopied(false);
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  disabled={confirmText !== confirmDelete.title}
                  onClick={() => handleDeleteConfirmed(confirmDelete._id!)}
                  className="cursor-pointer"
                >
                  Delete Event
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
