"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { parsed, ts } = JSON.parse(cached);
        if (Array.isArray(parsed) && Date.now() - ts < cacheTTL) {
          setEvents(parsed);
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

      const updatedEvents = [...events, created];
      updateCache(updatedEvents);

      setNewEvent({
        title: "",
        date: "",
        description: "",
        image: "",
        link: "",
        included: true,
      });
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

  async function handleDelete(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      toast.success("Event deleted successfully!");
      const updatedEvents = events.filter((e) => e._id !== id);
      updateCache(updatedEvents);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting event");
    } finally {
      setUpdating(false);
    }
  }

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

      <div className="space-y-6 max-w-4xl mx-auto">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((e) => (
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
                  onClick={() => handleDelete(e._id!)}
                  disabled={updating}
                  className={`font-display cursor-pointer ${
                    updating ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No events found.
          </p>
        )}

        <div className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow mt-10">
          <h3 className="text-lg font-bold mb-4">Add New Event</h3>
          <Input
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="mb-2"
          />
          <Input
            placeholder="Date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="mb-2"
          />
          <Textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            className="mb-2"
          />
          <Input
            placeholder="Image URL"
            value={newEvent.image}
            onChange={(e) =>
              setNewEvent({ ...newEvent, image: e.target.value })
            }
            className="mb-2"
          />
          <Input
            placeholder="Event Link"
            value={newEvent.link}
            onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
            className="mb-4"
          />
          <Toggle
            pressed={newEvent.included}
            onPressedChange={() =>
              setNewEvent({ ...newEvent, included: !newEvent.included })
            }
            variant={newEvent.included ? "default" : "outline"}
            className={`font-display mb-4 cursor-pointer ${
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
            className={`font-display ml-2 cursor-pointer ${
              updating ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={updating}
          >
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}
