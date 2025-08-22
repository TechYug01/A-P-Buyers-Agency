"use client";

import { motion, useInView } from "framer-motion";
import { Building2, Clock, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// counter hook
function useCounter(target: number, start: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = target / (duration / 50);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.ceil(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target, start, duration]);

  return count;
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const weeks = useCounter(2, inView, 1500);
  const yieldPercent = useCounter(6, inView, 1500);
  const hotspots = useCounter(35, inView, 1500);
  const offMarket = useCounter(80, inView, 1500);

  const stats = [
    {
      icon: <Clock size={32} />,
      value: weeks,
      suffix: " Weeks",
      label: "Average Acquisition Time",
      accentColor: "text-primary max-md:text-[#ede7dd]",
    },
    {
      icon: <TrendingUp size={32} />,
      value: yieldPercent,
      suffix: "%",
      label: "Average Net Yield",
      accentColor: "text-primary max-md:text-[#ede7dd]",
    },
    {
      icon: <MapPin size={32} />,
      value: hotspots,
      suffix: "+",
      label: "Hotspots Analysed Monthly",
      accentColor: "text-primary max-md:text-[#ede7dd]",
    },
    {
      icon: <Building2 size={32} />,
      value: offMarket,
      suffix: "%",
      label: "Properties Acquired Off-Market",
      accentColor: "text-primary max-md:text-[#ede7dd]",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-zinc-900 dark:via-zinc-800/50 dark:to-zinc-900 flex flex-row min-h-[90vh] overflow-hidden max-md:py-15"
      style={{
        backgroundImage: 'url("/images/stats.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Mobile Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10 md:hidden" />

      {/* Desktop Image Section*/}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-1/2 h-auto max-md:hidden"
        style={{ background: "none" }}
      >
        <div className="relative w-full h-full bg-accent dark:bg-zinc-800">
          <Image
            src="/images/stats.jpg"
            alt="Performance Highlights"
            fill
            className="object-cover rounded-r-2xl"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-primary/10 rounded-r-2xl" />
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center px-8 sm:px-12 lg:px-16 z-20">
        <div className="bg-accent dark:bg-zinc-800 w-full h-full absolute inset-0 -z-10 max-md:hidden" />

        <div className="text-center space-y-12 max-w-2xl py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white md:text-gray-900 md:dark:text-white max-md:text-white">
              Performance
              <span className="block text-primary mt-1 max-md:text-[#ede7dd]">
                Highlights
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 md:text-gray-600 md:dark:text-gray-300 max-md:text-gray-200 max-w-xl mx-auto leading-relaxed">
              Real numbers from real deals. Our track record speaks for itself
              across Australia.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group relative"
              >
                {/* Stat Card */}
                <div
                  className="relative p-8 rounded-3xl bg-amber-900/30 border border-amber-900/40 shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:bg-amber-900/40 hover:border-amber-900/60"
                  style={{ willChange: "transform" }}
                >
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 max-md:from-[#ede7dd]/20 max-md:to-[#ede7dd]/10 flex items-center justify-center mx-auto shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
                      <div className={stat.accentColor}>{stat.icon}</div>
                    </div>
                  </div>

                  {/* Stats Display */}
                  <div className="space-y-3">
                    <div className="relative">
                      <p className="text-4xl sm:text-5xl font-extrabold font-display text-white/90 group-hover:text-white">
                        {stat.value}
                        <span className="text-primary max-md:text-[#ede7dd] text-3xl sm:text-4xl">
                          {stat.suffix}
                        </span>
                      </p>
                    </div>

                    {/* Beige Label Text */}
                    <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                      {stat.label}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
