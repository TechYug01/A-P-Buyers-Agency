"use client";

import { testimonials } from "@/lib/testimonialsData";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const StarRating = ({
  rating,
  size = 16,
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
    <div className="flex" role="img" aria-label={`${rating} star rating`}>
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
  const starId = `star-${Math.random().toString(36).substr(2, 9)}`;

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

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(
    new Set()
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    intervalRef.current = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    }, 60000);
  }, [emblaApi]);

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isHovered) startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, isHovered]);

  const toggleReadMore = useCallback((index: number) => {
    setExpandedIndexes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const getTruncatedText = useCallback(
    (text: string, index: number) => {
      if (!text) return { visibleText: "", needsTruncation: false };

      const words = text.trim().split(/\s+/);
      const wordLimit = 50;
      const isExpanded = expandedIndexes.has(index);
      const needsTruncation = words.length > wordLimit;

      let visibleText = text;

      if (isMobile && !isExpanded && needsTruncation) {
        visibleText = words.slice(0, wordLimit).join(" ") + "...";
      }

      return { visibleText, needsTruncation };
    },
    [expandedIndexes, isMobile]
  );

  return (
    <section className="flex flex-row h-auto overflow-hidden bg-light dark:bg-dark transition-colors duration-200">
      {/* CONTENT */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-display font-bold text-dark dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted dark:text-muted-foreground text-lg max-w-lg mx-auto font-body">
              Real stories from people we&apos;ve helped along the way.
            </p>
            <a
              href="/testimonials"
              className="inline-block mt-4 text-primary font-semibold hover:underline font-display transition-colors"
            >
              View All Testimonials →
            </a>
          </motion.div>

          {/* CAROUSEL */}
          <div
            className="overflow-hidden"
            ref={emblaRef}
            onMouseEnter={() => {
              setIsHovered(true);
              stopAutoplay();
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => {
                const { visibleText, needsTruncation } = getTruncatedText(
                  testimonial.description,
                  index
                );
                const isExpanded = expandedIndexes.has(index);

                return (
                  <div
                    key={`testimonial-${index}-${testimonial.name}`}
                    className="min-w-115 max-sm:min-w-0 flex-[0_0_100%] py-6 px-2"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={clsx(
                        "bg-[#E8DAD1]/30 border border-amber-900/30 dark:bg-zinc-900 p-8 rounded-2xl shadow-lg text-left h-full flex flex-col justify-between max-[1050px]:w-md max-[970px]:w-sm max-[870px]:w-[350px] max-[767px]:w-full",
                        "transition-colors duration-200 cursor-pointer text-justify"
                      )}
                    >
                      {/* Description */}
                      <div className="mb-4 space-y-3">
                        <div className="text-base font-body text-muted-foreground dark:text-zinc-300 leading-relaxed text-justify">
                          {visibleText}
                        </div>

                        {/* Read More/Less Button */}
                        {isMobile && needsTruncation && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleReadMore(index);
                            }}
                            className="inline-flex items-center gap-1 mt-3 px-3 py-1.5 text-sm text-primary dark:text-accent font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all duration-200 hover:bg-primary/5"
                            aria-expanded={isExpanded}
                            aria-label={
                              isExpanded
                                ? "Show less content"
                                : "Show more content"
                            }
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                            <span className="text-xs">
                              {isExpanded ? "↑" : "↓"}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="mt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-primary font-san">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {testimonial.category}
                            </div>
                          </div>

                          <StarRating rating={testimonial.rating} size={16} />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-1/2 h-auto max-md:hidden"
      >
        <Image
          src="/images/testimonials.jpg"
          alt="Happy Clients"
          fill
          className="object-cover rounded-l-2xl"
          priority
        />
      </motion.div>
    </section>
  );
}
