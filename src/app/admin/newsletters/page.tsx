"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Newsletter {
  _id?: string;
  title: string;
  summary: string;
  content: string;
  included?: boolean;
}

const CACHE_KEY = "newslettersCache";

export default function NewslettersAdmin() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [newNewsletter, setNewNewsletter] = useState<Newsletter>({
    title: "",
    summary: "",
    content: "",
    included: true,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  async function fetchNewsletters() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { parsed, ts } = JSON.parse(cached);
        if (Array.isArray(parsed) && Date.now() - ts < cacheTTL) {
          setNewsletters(parsed);
          setLoading(false);
          return;
        }
      }
      const res = await fetch("/api/newsletters");
      if (!res.ok) throw new Error("Failed to fetch newsletters");
      const data = await res.json();
      const validData = Array.isArray(data) ? data : [];
      setNewsletters(validData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(validData));
    } catch (err) {
      toast.error("Error fetching newsletters");
    } finally {
      setLoading(false);
    }
  }

  function updateCache(newData: Newsletter[]) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    setNewsletters(newData);
  }

  async function handleAdd() {
    if (
      !newNewsletter.title.trim() ||
      !newNewsletter.summary.trim() ||
      !newNewsletter.content.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNewsletter),
      });
      if (!res.ok) throw new Error("Failed to add newsletter");
      toast.success("Newsletter added successfully!");

      const created = await res.json();
      const updatedNewsletters = [...newsletters, created];
      updateCache(updatedNewsletters);
      setNewNewsletter({ title: "", summary: "", content: "", included: true });

      await fetch("/api/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(created),
      });
    } catch {
      toast.error("Error adding newsletter");
    } finally {
      setUpdating(false);
    }
  }

  async function handleEdit(newsletter: Newsletter) {
    if (
      !newsletter.title.trim() ||
      !newsletter.summary.trim() ||
      !newsletter.content.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch("/api/newsletters", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsletter),
      });
      if (!res.ok) throw new Error("Failed to update newsletter");
      toast.success("Newsletter updated successfully!");
      const updatedNewsletters = newsletters.map((n) =>
        n._id === newsletter._id ? newsletter : n
      );
      updateCache(updatedNewsletters);
    } catch {
      toast.error("Error updating newsletter");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/newsletters?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete newsletter");
      toast.success("Newsletter deleted successfully!");
      const updatedNewsletters = newsletters.filter((n) => n._id !== id);
      updateCache(updatedNewsletters);
    } catch {
      toast.error("Error deleting newsletter");
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
        Manage Newsletters
      </h1>

      <div className="space-y-6 max-w-5xl mx-auto">
        {newsletters.map((n) => (
          <motion.div
            key={n._id}
            className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow flex flex-col gap-3"
          >
            <Input
              placeholder="Title"
              value={n.title}
              onChange={(e) =>
                setNewsletters((prev) =>
                  prev.map((x) =>
                    x._id === n._id ? { ...x, title: e.target.value } : x
                  )
                )
              }
            />
            <Textarea
              placeholder="Summary"
              value={n.summary}
              onChange={(e) =>
                setNewsletters((prev) =>
                  prev.map((x) =>
                    x._id === n._id ? { ...x, summary: e.target.value } : x
                  )
                )
              }
            />
            <Textarea
              placeholder="Content (supports Markdown or long text)"
              value={n.content}
              rows={10}
              onChange={(e) =>
                setNewsletters((prev) =>
                  prev.map((x) =>
                    x._id === n._id ? { ...x, content: e.target.value } : x
                  )
                )
              }
            />

            <div className="flex gap-2 mt-2 items-center">
              <Toggle
                pressed={n.included}
                onPressedChange={() =>
                  setNewsletters((prev) =>
                    prev.map((p) =>
                      p._id === n._id ? { ...p, included: !p.included } : p
                    )
                  )
                }
                className={`font-display transition-colors cursor-pointer duration-200 ${
                  n.included
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
                }`}
                size="sm"
              >
                {n.included ? (
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
                onClick={() => handleEdit(n)}
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
                onClick={() => handleDelete(n._id!)}
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
          <h3 className="text-lg font-bold mb-4">Add New Newsletter</h3>
          <Input
            placeholder="Title"
            value={newNewsletter.title}
            onChange={(e) =>
              setNewNewsletter({ ...newNewsletter, title: e.target.value })
            }
            className="mb-2"
          />
          <Textarea
            placeholder="Summary"
            value={newNewsletter.summary}
            onChange={(e) =>
              setNewNewsletter({ ...newNewsletter, summary: e.target.value })
            }
            className="mb-2"
          />
          <Textarea
            placeholder="Content (Markdown or long text)"
            value={newNewsletter.content}
            onChange={(e) =>
              setNewNewsletter({ ...newNewsletter, content: e.target.value })
            }
            rows={10}
            className="mb-4"
          />
          <Toggle
            pressed={newNewsletter.included}
            onPressedChange={() =>
              setNewNewsletter({
                ...newNewsletter,
                included: !newNewsletter.included,
              })
            }
            variant={newNewsletter.included ? "default" : "outline"}
            className={`font-display mb-4 cursor-pointer ${
              newNewsletter.included
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
            }`}
          >
            {newNewsletter.included ? (
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
            Add Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}
