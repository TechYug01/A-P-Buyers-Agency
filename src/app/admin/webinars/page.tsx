"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
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

  useEffect(() => {
    fetchWebinars();
  }, []);

  async function fetchWebinars() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { parsed, ts } = JSON.parse(cached);
        if (Array.isArray(parsed) && Date.now() - ts < cacheTTL) {
          setWebinars(parsed);
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
    } catch (err) {
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
      const updatedWebinars = [...webinars, created];
      updateCache(updatedWebinars);
      setNewWebinar({
        title: "",
        date: "",
        time: "",
        url: "",
        description: "",
        included: true,
      });
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

  async function handleDelete(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/webinars?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete webinar");
      toast.success("Webinar deleted successfully!");
      const updatedWebinars = webinars.filter((w) => w._id !== id);
      updateCache(updatedWebinars);
    } catch {
      toast.error("Error deleting webinar");
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
    <div className="min-h-screen bg-light dark:bg-dark p-10 mt-20">
      <h1 className="text-3xl font-display font-bold mb-8 text-center">
        Manage Webinars
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {webinars.map((w) => (
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
                className={`font-display cursor-pointer ${
                  updating ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(w._id!)}
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

        <div className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow mt-10">
          <h3 className="text-lg font-bold mb-4">Add New Webinar</h3>
          <Input
            placeholder="Title"
            value={newWebinar.title}
            onChange={(e) =>
              setNewWebinar({ ...newWebinar, title: e.target.value })
            }
            className="mb-2"
          />
          <div className="flex gap-2 mb-2">
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
            className="mb-2"
          />
          <Textarea
            placeholder="Description"
            value={newWebinar.description}
            onChange={(e) =>
              setNewWebinar({ ...newWebinar, description: e.target.value })
            }
            className="mb-4"
          />
          <Toggle
            pressed={newWebinar.included}
            onPressedChange={() =>
              setNewWebinar({ ...newWebinar, included: !newWebinar.included })
            }
            variant={newWebinar.included ? "default" : "outline"}
            className={`font-display mb-4 cursor-pointer ${
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
            className={`font-display cursor-pointer ml-2 ${
              updating ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={updating}
          >
            Add Webinar
          </Button>
        </div>
      </div>
    </div>
  );
}
