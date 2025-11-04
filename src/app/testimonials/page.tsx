"use client";

import SEO from "@/lib/seo";
import { getTestimonials } from "@/lib/testimonialsData";
import { motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

const categories = [
  "All",
  "Owner Occupier",
  "Residential Investment Property",
  "SMSF",
  "Commercial Investments",
  "Development Opportunities",
  "Portfolio Management",
];

interface Testimonial {
  name: string;
  category: string;
  description: string;
  rating: number;
}

const StarRating = ({
  rating,
  size = 18,
}: {
  rating: number;
  size?: number;
}) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    const starValue = i + 1;
    let starType: "full" | "half" | "empty" = "empty";

    if (rating >= starValue) {
      starType = "full";
    } else if (rating >= starValue - 0.5) {
      starType = "half";
    }

    stars.push(<CustomStar key={i} type={starType} size={size} />);
  }

  return (
    <div
      className="flex gap-1 transition-transform duration-200 hover:scale-105"
      role="img"
      aria-label={`${rating} star rating`}
    >
      {stars}
    </div>
  );
};

const CustomStar = ({
  type,
  size,
}: {
  type: "full" | "half" | "empty";
  size: number;
}) => {
  const starId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="text-primary"
    >
      <defs>
        {type === "half" && (
          <linearGradient id={starId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="50%"
              style={{ stopColor: "currentColor", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "transparent", stopOpacity: 0 }}
            />
          </linearGradient>
        )}
      </defs>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          type === "full"
            ? "currentColor"
            : type === "half"
            ? `url(#${starId})`
            : "transparent"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const cacheTTL = 5 * 60 * 1000;

      try {
        const cached = localStorage.getItem("testimonialsCache");
        if (cached) {
          try {
            const { data, ts } = JSON.parse(cached);
            if (Date.now() - ts < cacheTTL) {
              setTestimonials(data);
              setLoading(false);
              return;
            }
          } catch (parseError) {
            console.error("Failed to parse cached data:", parseError);
            localStorage.removeItem("testimonialsCache");
          }
        }

        const data = await getTestimonials();
        if (data) {
          setTestimonials(data);
          try {
            localStorage.setItem(
              "testimonialsCache",
              JSON.stringify({ data, ts: Date.now() })
            );
          } catch (storageError) {
            console.error("Failed to cache testimonials:", storageError);
          }
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredTestimonials =
    selectedCategory === "All"
      ? testimonials
      : testimonials.filter(
          (t: Testimonial) => t.category === selectedCategory
        );

  return (
    <>
      <SEO
        title="Testimonials | A&P Buyer's Agency"
        description="Hear from our clients about their experiences with A&P Buyer's Agency."
        url="https://www.apbuyersagency.com.au/testimonials"
      />

      <section className="bg-light dark:bg-dark transition-colors duration-300 min-h-screen py-20 mt-15">
        <div className="max-w-7xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
                    ? "bg-primary text-white dark:text-black"
                    : "bg-muted/30 dark:bg-zinc-800 hover:bg-primary/20 dark:hover:bg-primary/40 text-dark dark:text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-auto">
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
          ) : (
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
                    <StarRating rating={t.rating} size={18} />

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
          )}
        </div>
      </section>
    </>
  );
}
