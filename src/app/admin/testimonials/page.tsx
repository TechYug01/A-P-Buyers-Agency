"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
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
          setTestimonials(parsed);
          setLoading(false);
          return;
        }
      }

      const res = await fetch("/api/testimonials");
      const data = await res.json();
      const arrayData = Array.isArray(data) ? data : [];

      const formatted = arrayData.map((t: any) => ({
        ...t,
        rating:
          t.rating !== undefined && t.rating !== null
            ? t.rating.toString()
            : "",
        included: t.included ?? true,
      }));

      setTestimonials(formatted);
      localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }

  function updateCache(newData: Testimonial[]) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
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
        const updatedTestimonials = [...testimonials, newTestimonial];
        updateCache(updatedTestimonials);
        setNewItem({
          name: "",
          category: "",
          description: "",
          rating: "",
          included: true,
        });
      } else {
        toast.error("Failed to add testimonial");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete(id: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Deleted successfully!");
        const updatedTestimonials = testimonials.filter((t) => t._id !== id);
        updateCache(updatedTestimonials);
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
        Manage Testimonials
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {/* ADD NEW TESTIMONIAL */}
        <div className="bg-white dark:bg-zinc-900 border border-border p-6 rounded-xl shadow mt-10">
          <h3 className="text-lg font-bold mb-4">Add New Testimonial</h3>
          <Input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="mb-2"
          />

          <div className="relative mb-2">
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
          </div>

          <Textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Rating"
            value={newItem.rating}
            onChange={(e) => setNewItem({ ...newItem, rating: e.target.value })}
            className="mb-4"
          />

          <Toggle
            pressed={newItem.included}
            onPressedChange={() =>
              setNewItem({ ...newItem, included: !newItem.included })
            }
            variant={newItem.included ? "default" : "outline"}
            className={`font-display mb-4 cursor-pointer ${
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
            className={`font-display cursor-pointer ml-2 ${
              updating ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={updating}
          >
            Add Testimonial
          </Button>
        </div>

        {/* EXISTING TESTIMONIALS */}
        {testimonials.map((t) => (
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

            <div className="relative">
              <Input
                placeholder="Category"
                value={t.category}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onChange={(e) => {
                  const value = e.target.value;
                  setTestimonials((prev) =>
                    prev.map((p) =>
                      p._id === t._id ? { ...p, category: value } : p
                    )
                  );
                }}
                className="bg-transparent outline-none"
              />
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {categoryOptions
                    .filter((opt) =>
                      opt
                        .toLowerCase()
                        .includes(t.category.toLowerCase().trim())
                    )
                    .map((opt) => (
                      <div
                        key={opt}
                        onMouseDown={() => {
                          setTestimonials((prev) =>
                            prev.map((p) =>
                              p._id === t._id ? { ...p, category: opt } : p
                            )
                          );
                          setShowDropdown(false);
                        }}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        {opt}
                      </div>
                    ))}
                </div>
              )}
            </div>

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
                onClick={() => handleDelete(t._id!)}
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
  );
}
