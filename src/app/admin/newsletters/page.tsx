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
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<Newsletter | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  async function fetchNewsletters() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Array.isArray(data) && Date.now() - ts < cacheTTL) {
          setNewsletters(data);
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
    } catch {
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
      const updatedNewsletters = [created, ...newsletters];
      updateCache(updatedNewsletters);
      setNewNewsletter({ title: "", summary: "", content: "", included: true });
      setOpenModal(false);
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

  async function handleDeleteConfirmed(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/newsletters?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete newsletter");
      toast.success("Newsletter deleted successfully!");
      const updatedNewsletters = newsletters.filter((n) => n._id !== id);
      updateCache(updatedNewsletters);
      setConfirmDelete(null);
      setConfirmText("");
      setCopied(false);
    } catch {
      toast.error("Error deleting newsletter");
    } finally {
      setUpdating(false);
    }
  }

  const filteredNewsletters = newsletters.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-blue-500 rounded-full dark:text-blue-400"
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

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
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
                Add Newsletter
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-4">
              <DialogHeader>
                <DialogTitle>Add New Newsletter</DialogTitle>
              </DialogHeader>

              <Input
                placeholder="Title"
                value={newNewsletter.title}
                onChange={(e) =>
                  setNewNewsletter({ ...newNewsletter, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Summary"
                value={newNewsletter.summary}
                onChange={(e) =>
                  setNewNewsletter({
                    ...newNewsletter,
                    summary: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Content (Markdown or long text)"
                value={newNewsletter.content}
                onChange={(e) =>
                  setNewNewsletter({
                    ...newNewsletter,
                    content: e.target.value,
                  })
                }
                rows={10}
              />
              <Toggle
                pressed={newNewsletter.included}
                onPressedChange={() =>
                  setNewNewsletter({
                    ...newNewsletter,
                    included: !newNewsletter.included,
                  })
                }
                className={`font-display cursor-pointer ${
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
                className={`font-display cursor-pointer ${
                  updating ? "opacity-50 pointer-events-none" : ""
                }`}
                disabled={updating}
              >
                Add Newsletter
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* NEWSLETTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNewsletters.map((n) => (
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
                placeholder="Content"
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
                  onClick={() => setConfirmDelete(n)}
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
                Are you sure you want to delete the following newsletter?
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
                  placeholder="Paste the newsletter title here to confirm"
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
                  Delete Newsletter
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
