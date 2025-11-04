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
import { Check, Copy, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Testimonial {
  _id?: string;
  name: string;
  category: string;
  description: string;
  rating: string;
  included?: boolean;
}

const CACHE_KEY = "testimonialsCache";

const categoryOptions = [
  "Owner Occupier",
  "Residential Investment Property",
  "SMSF",
  "Commercial Investments",
  "Development Opportunities",
  "Portfolio Management",
];

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([]);
  const [filter, setFilter] = useState<string>("All");

  const [newItem, setNewItem] = useState<Testimonial>({
    name: "",
    category: "",
    description: "",
    rating: "",
    included: true,
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<Testimonial | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilter(filter);
  }, [filter, testimonials]);

  async function fetchData() {
    setLoading(true);
    const cacheTTL = 5 * 60 * 1000;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Array.isArray(data) && Date.now() - ts < cacheTTL) {
          setTestimonials(data);
          setFilteredTestimonials(data);
          setLoading(false);
          return;
        }
      }

      const res = await fetch("/api/testimonials");
      const data = await res.json();
      const arrayData = Array.isArray(data) ? data : [];

      const formatted = arrayData.map((t: Testimonial) => ({
        ...t,
        rating:
          t.rating !== undefined && t.rating !== null
            ? t.rating.toString()
            : "",
        included: t.included ?? true,
      }));

      setTestimonials(formatted);
      setFilteredTestimonials(formatted);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: formatted, ts: Date.now() })
      );
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setTestimonials([]);
      setFilteredTestimonials([]);
    } finally {
      setLoading(false);
    }
  }

  function updateCache(newData: Testimonial[]) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: newData, ts: Date.now() })
    );
    setTestimonials(newData);
  }

  async function handleAdd() {
    if (
      !newItem.name.trim() ||
      !newItem.category.trim() ||
      !newItem.description.trim() ||
      !newItem.rating.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setUpdating(true);
    try {
      const itemToSave = {
        ...newItem,
        included: newItem.included ?? true,
        rating:
          newItem.rating.trim() === "" ? null : parseFloat(newItem.rating),
      };

      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSave),
      });

      if (res.ok) {
        toast.success("Testimonial added!");
        const created = await res.json();
        const newTestimonial = {
          ...created,
          rating:
            created.rating !== undefined && created.rating !== null
              ? created.rating.toString()
              : "",
          included: created.included ?? true,
        };
        const updatedTestimonials = [newTestimonial, ...testimonials];
        updateCache(updatedTestimonials);
        setNewItem({
          name: "",
          category: "",
          description: "",
          rating: "",
          included: true,
        });
        setOpenModal(false);
      } else {
        toast.error("Failed to add testimonial");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDeleteConfirmed(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Deleted successfully!");
        const updatedTestimonials = testimonials.filter((t) => t._id !== id);
        updateCache(updatedTestimonials);
        setConfirmDelete(null);
        setConfirmText("");
        setCopied(false);
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setUpdating(false);
    }
  }

  async function handleEdit(item: Testimonial) {
    if (
      !item.name.trim() ||
      !item.category.trim() ||
      !item.description.trim() ||
      !item.rating.trim()
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setUpdating(true);
    try {
      const itemToSave = {
        ...item,
        included: item.included ?? true,
        rating:
          String(item.rating).trim() === "" ? null : parseFloat(item.rating),
      };

      const res = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSave),
      });

      if (res.ok) {
        toast.success("Updated successfully!");
        const updatedTestimonials = testimonials.map((t) =>
          t._id === item._id ? { ...item } : t
        );
        updateCache(updatedTestimonials);
      } else {
        toast.error("Failed to update");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setUpdating(false);
    }
  }

  function applyFilter(selected: string) {
    setFilter(selected);
    if (selected === "All") setFilteredTestimonials(testimonials);
    else if (selected === "Included")
      setFilteredTestimonials(testimonials.filter((t) => t.included));
    else if (selected === "Excluded")
      setFilteredTestimonials(testimonials.filter((t) => !t.included));
    else
      setFilteredTestimonials(
        testimonials.filter((t) => t.category === selected)
      );
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin inline-block size-8 border-4 border-current border-t-transparent text-blue-500 rounded-full dark:text-blue-400"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-light dark:bg-dark p-6 mt-20 max-w-7xl flex flex-col mx-auto">
      <h1 className="text-3xl font-display font-bold mb-6 text-center">
        Manage Testimonials
      </h1>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["All", "Included", "Excluded", ...categoryOptions].map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={filter === cat ? "default" : "outline"}
            onClick={() => applyFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* ADD NEW TESTIMONIAL BUTTON */}
      <div className="text-center mb-8">
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger asChild>
            <Button className="font-display gap-2 cursor-pointer">
              <PlusCircle className="h-4 w-4" /> Add New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-4">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <Input
                placeholder="Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
              <Input
                placeholder="Category"
                value={newItem.category}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              />
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {categoryOptions
                    .filter((opt) =>
                      opt
                        .toLowerCase()
                        .includes(newItem.category.toLowerCase().trim())
                    )
                    .map((opt) => (
                      <div
                        key={opt}
                        onMouseDown={() => {
                          setNewItem({ ...newItem, category: opt });
                          setShowDropdown(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        {opt}
                      </div>
                    ))}
                </div>
              )}
              <Textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Rating"
                value={newItem.rating}
                onChange={(e) =>
                  setNewItem({ ...newItem, rating: e.target.value })
                }
              />

              <Toggle
                pressed={newItem.included}
                onPressedChange={() =>
                  setNewItem({ ...newItem, included: !newItem.included })
                }
                className={`font-display cursor-pointer w-full ${
                  newItem.included
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
                }`}
              >
                {newItem.included ? (
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
                className="w-full font-display cursor-pointer"
              >
                {updating ? "Adding..." : "Add Testimonial"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* TESTIMONIAL LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((t) => (
          <motion.div
            key={t._id}
            className={`bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow flex flex-col gap-2 transition-opacity ${
              t.included ? "opacity-100" : "opacity-60"
            }`}
          >
            <Input
              className="text-lg font-semibold bg-transparent outline-none"
              value={t.name}
              onChange={(e) =>
                setTestimonials((prev) =>
                  prev.map((p) =>
                    p._id === t._id ? { ...p, name: e.target.value } : p
                  )
                )
              }
            />
            <Input
              placeholder="Category"
              value={t.category}
              onChange={(e) =>
                setTestimonials((prev) =>
                  prev.map((p) =>
                    p._id === t._id ? { ...p, category: e.target.value } : p
                  )
                )
              }
              className="bg-transparent outline-none"
            />
            <Textarea
              value={t.description}
              onChange={(e) =>
                setTestimonials((prev) =>
                  prev.map((p) =>
                    p._id === t._id ? { ...p, description: e.target.value } : p
                  )
                )
              }
            />
            <Input
              className="text-sm bg-transparent outline-none"
              value={t.rating}
              onChange={(e) =>
                setTestimonials((prev) =>
                  prev.map((p) =>
                    p._id === t._id ? { ...p, rating: e.target.value } : p
                  )
                )
              }
            />

            <div className="flex gap-2 mt-2 items-center">
              <Toggle
                pressed={t.included}
                onPressedChange={() =>
                  setTestimonials((prev) =>
                    prev.map((p) =>
                      p._id === t._id ? { ...p, included: !p.included } : p
                    )
                  )
                }
                className={`font-display transition-colors cursor-pointer duration-200 ${
                  t.included
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400"
                }`}
                size="sm"
              >
                {t.included ? (
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
                onClick={() => handleEdit(t)}
                className="cursor-pointer"
                disabled={updating}
              >
                Save
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
                onClick={() => setConfirmDelete(t)}
                disabled={updating}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        ))}
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
                Are you sure you want to delete the following testimonial?
              </div>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 p-2 rounded">
                <span className="font-mono break-words">
                  {confirmDelete.name}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(confirmDelete.name);
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
                  placeholder="Paste the testimonial name here to confirm"
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
                  disabled={confirmText !== confirmDelete.name}
                  onClick={() => handleDeleteConfirmed(confirmDelete._id!)}
                  className="cursor-pointer"
                >
                  Delete Testimonial
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
