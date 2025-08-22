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
  const offMarket = useCounter(60, inView, 1500);

  const stats = [
    {
      icon: <Clock size={32} />,
      value: weeks,
      suffix: " Weeks",
      label: "Average acquisition time",
      gradient: "from-blue-500/20 to-primary/20",
      accentColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: <TrendingUp size={32} />,
      value: yieldPercent,
      suffix: "%",
      label: "Average net yield",
      gradient: "from-emerald-500/20 to-primary/20",
      accentColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: <MapPin size={32} />,
      value: hotspots,
      suffix: "+",
      label: "Hotspots analysed weekly",
      gradient: "from-purple-500/20 to-primary/20",
      accentColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: <Building2 size={32} />,
      value: offMarket,
      suffix: "%",
      label: "Properties acquired off-market",
      gradient: "from-amber-500/20 to-primary/20",
      accentColor: "text-amber-600 dark:text-amber-500",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-zinc-900 dark:via-zinc-800/50 dark:to-zinc-900 flex flex-row min-h-[90vh] overflow-hidden max-md:py-15"
    >
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-1/2 h-auto max-md:hidden"
      >
        <div className="relative w-full h-full">
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
      <div className="relative w-full md:w-1/2 flex items-center justify-center px-8 sm:px-12 lg:px-16">
        <div className="text-center space-y-12 max-w-2xl py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
              Performance
              <span className="block text-primary mt-1">Highlights</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
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
                  className={`relative p-8 rounded-3xl bg-gradient-to-br ${stat.gradient} border border-gray-200/50 dark:border-gray-700/30 shadow-lg transition-all duration-300 ease-out bg-white/80 dark:bg-zinc-800/80 hover:shadow-xl hover:-translate-y-2 hover:border-gray-200 dark:hover:border-gray-600/50`}
                  style={{ willChange: "transform" }}
                >
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 dark:from-zinc-700/90 dark:to-zinc-700/70 flex items-center justify-center mx-auto shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
                      <div className={stat.accentColor}>{stat.icon}</div>
                    </div>
                  </div>

                  {/* Stats Display */}
                  <div className="space-y-3">
                    <div className="relative">
                      <p className="text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white">
                        {stat.value}
                        <span
                          className={`${stat.accentColor} text-3xl sm:text-4xl`}
                        >
                          {stat.suffix}
                        </span>
                      </p>
                    </div>

                    <p className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
                      {stat.label}
                    </p>
                  </div>

                  {/* bottom accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
