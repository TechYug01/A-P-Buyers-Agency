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

interface Webinar {
  _id?: string;
  title: string;
  date: string;
  time: string;
  url: string;
  description: string;
  included?: boolean;
}

const CACHE_KEY = "webinarsCache";

export default function WebinarsAdmin() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWebinar, setNewWebinar] = useState<Webinar>({
    title: "",
    date: "",
    time: "",
    url: "",
    description: "",
    included: true,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<Webinar | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchWebinars();
  }, []);

  async function fetchWebinars() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Array.isArray(data) && Date.now() - ts < cacheTTL) {
          setWebinars(data);
          setLoading(false);
          return;
        }
      }
      const res = await fetch("/api/webinars");
      if (!res.ok) throw new Error("Failed to fetch webinars");
      const data = await res.json();
      const validData = Array.isArray(data) ? data : [];
      setWebinars(validData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(validData));
    } catch {
      console.error("Error fetching webinars");
      setWebinars([]);
    } finally {
      setLoading(false);
    }
  }

  function updateCache(newData: Webinar[]) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    setWebinars(newData);
  }

  async function handleAdd() {
    if (
      !newWebinar.title.trim() ||
      !newWebinar.date.trim() ||
      !newWebinar.time.trim() ||
      !newWebinar.url.trim() ||
      !newWebinar.description.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch("/api/webinars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWebinar),
      });
      if (!res.ok) throw new Error("Failed to add webinar");
      toast.success("Webinar added successfully!");
      const created = await res.json();
      const updatedWebinars = [created, ...webinars];
      updateCache(updatedWebinars);
      setNewWebinar({
        title: "",
        date: "",
        time: "",
        url: "",
        description: "",
        included: true,
      });
      setOpen(false);
    } catch {
      toast.error("Error adding webinar");
    } finally {
      setUpdating(false);
    }
  }

  async function handleEdit(webinar: Webinar) {
    if (
      !webinar.title.trim() ||
      !webinar.date.trim() ||
      !webinar.time.trim() ||
      !webinar.url.trim() ||
      !webinar.description.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch("/api/webinars", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webinar),
      });
      if (!res.ok) throw new Error("Failed to update webinar");
      toast.success("Webinar updated successfully!");
      const updatedWebinars = webinars.map((w) =>
        w._id === webinar._id ? webinar : w
      );
      updateCache(updatedWebinars);
    } catch {
      toast.error("Error updating webinar");
    } finally {
      setUpdating(false);
    }
  }

  const filteredWebinars = webinars.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleDeleteConfirmed(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/webinars?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete webinar");
      toast.success("Webinar deleted successfully!");
      const updatedWebinars = webinars.filter((w) => w._id !== id);
      updateCache(updatedWebinars);
      setConfirmDelete(null);
      setConfirmText("");
    } catch {
      toast.error("Error deleting webinar");
    } finally {
      setUpdating(false);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin size-8 border-4 border-current border-t-transparent text-blue-500 rounded-full dark:text-blue-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-light dark:bg-dark p-10 mt-20">
      <h1 className="text-3xl font-display font-bold mb-8 text-center">
        Manage Webinars
      </h1>

      {/* Search + Add */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by title..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="font-display cursor-pointer">
              <PlusCircle className="h-4 w-4" /> Add New Webinar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-4">
            <DialogHeader>
              <DialogTitle>Add New Webinar</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Title"
              value={newWebinar.title}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, title: e.target.value })
              }
            />
            <div className="flex gap-2">
              <Input
                placeholder="Date"
                value={newWebinar.date}
                onChange={(e) =>
                  setNewWebinar({ ...newWebinar, date: e.target.value })
                }
              />
              <Input
                placeholder="Time"
                value={newWebinar.time}
                onChange={(e) =>
                  setNewWebinar({ ...newWebinar, time: e.target.value })
                }
              />
            </div>
            <Input
              placeholder="Webinar URL"
              value={newWebinar.url}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, url: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={newWebinar.description}
              onChange={(e) =>
                setNewWebinar({ ...newWebinar, description: e.target.value })
              }
            />
            <Toggle
              pressed={newWebinar.included}
              onPressedChange={() =>
                setNewWebinar({ ...newWebinar, included: !newWebinar.included })
              }
              className={`font-display cursor-pointer ${
                newWebinar.included
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
              }`}
            >
              {newWebinar.included ? (
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
              className="cursor-pointer"
            >
              Add Webinar
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {filteredWebinars.map((w) => (
          <motion.div
            key={w._id}
            className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow flex flex-col gap-2"
          >
            <Input
              placeholder="Title"
              value={w.title}
              onChange={(e) =>
                setWebinars((prev) =>
                  prev.map((x) =>
                    x._id === w._id ? { ...x, title: e.target.value } : x
                  )
                )
              }
            />
            <div className="flex gap-2">
              <Input
                placeholder="Date"
                value={w.date}
                onChange={(e) =>
                  setWebinars((prev) =>
                    prev.map((x) =>
                      x._id === w._id ? { ...x, date: e.target.value } : x
                    )
                  )
                }
              />
              <Input
                placeholder="Time"
                value={w.time}
                onChange={(e) =>
                  setWebinars((prev) =>
                    prev.map((x) =>
                      x._id === w._id ? { ...x, time: e.target.value } : x
                    )
                  )
                }
              />
            </div>
            <Input
              placeholder="Webinar URL"
              value={w.url}
              onChange={(e) =>
                setWebinars((prev) =>
                  prev.map((x) =>
                    x._id === w._id ? { ...x, url: e.target.value } : x
                  )
                )
              }
            />
            <Textarea
              placeholder="Description"
              value={w.description}
              onChange={(e) =>
                setWebinars((prev) =>
                  prev.map((x) =>
                    x._id === w._id ? { ...x, description: e.target.value } : x
                  )
                )
              }
            />

            <div className="flex gap-2 mt-2 items-center">
              <Toggle
                pressed={w.included}
                onPressedChange={() =>
                  setWebinars((prev) =>
                    prev.map((p) =>
                      p._id === w._id ? { ...p, included: !p.included } : p
                    )
                  )
                }
                className={`font-display transition-colors cursor-pointer duration-200 ${
                  w.included
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
                }`}
                size="sm"
              >
                {w.included ? (
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
                onClick={() => handleEdit(w)}
                disabled={updating}
                className="cursor-pointer"
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setConfirmDelete(w)}
                disabled={updating}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        ))}
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
                  Are you sure you want to delete the following webinar?
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
                    placeholder="Paste the webinar title here to confirm"
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
                    className="cursor-pointer"
                    onClick={() => handleDeleteConfirmed(confirmDelete._id!)}
                  >
                    Delete Webinar
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
