"use client";

import SEO from "@/lib/seo";
import { testimonials } from "@/lib/testimonialsData";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

const categories = [
  "All",
  "Owner Occupier",
  "Residential Investment Property",
  "SMSF",
  "Commercial Investments",
  "Development Opportunities",
  "Portfolio Management",
];

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTestimonials =
    selectedCategory === "All"
      ? testimonials
      : testimonials.filter((t) => t.category === selectedCategory);

  return (
    <>
      <SEO
        title="Testimonials | A&P Buyer's Agency"
        description="Hear from our clients about their experiences with A&P Buyer's Agency."
        url="https://www.apbuyersagency.com.au/testimonials"
      />
      <section className="bg-light dark:bg-dark transition-colors duration-300 min-h-screen py-20 mt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-display font-bold text-dark dark:text-white mb-4">
              Client Testimonials
            </h1>
            <p className="text-lg text-muted-foreground dark:text-gray-300 font-body max-w-3xl mx-auto">
              Hear from clients who trusted us with their property journeys.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted/30 dark:bg-zinc-800 hover:bg-primary/20 dark:hover:bg-primary/40 text-dark dark:text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-zinc-900 border border-border rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex gap-1 text-primary dark:text-accent">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={18} fill="currentColor" />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground dark:text-gray-300 font-body leading-relaxed whitespace-pre-line text-sm">
                    {t.description}
                  </p>
                </div>

                {/* Name + Category */}
                <div className="mt-6">
                  <p className="font-display font-semibold text-dark dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {t.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
