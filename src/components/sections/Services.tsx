"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building,
  Hammer,
  Home,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Owner Occupier",
    description:
      "Helping you find and secure the perfect home that fits your lifestyle, budget, and long-term goals.",
    id: "owner-occupier",
    icon: <Home className="w-8 h-8" />,
  },
  {
    title: "Residential Investments",
    description:
      "Expert guidance to build a high-performing residential property portfolio for long-term growth.",
    id: "residential-investments",
    icon: <Building className="w-8 h-8" />,
  },
  {
    title: "Commercial Investments",
    description:
      "Unlock opportunities in the commercial property market with our tailored acquisition strategies.",
    id: "commercial-investments",
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    title: "Self-Managed Super Fund (SMSF)",
    description:
      "Leverage your superannuation to invest in property and grow your retirement wealth securely.",
    id: "smsf",
    icon: <PiggyBank className="w-8 h-8" />,
  },
  {
    title: "Development Opportunities",
    description:
      "Identify and secure profitable land and development sites with strong capital growth potential.",
    id: "development-opportunities",
    icon: <Hammer className="w-8 h-8" />,
  },
  {
    title: "Portfolio Management",
    description:
      "Ongoing support to optimise, expand, and maintain the value of your property investments.",
    id: "portfolio-management",
    icon: <TrendingUp className="w-8 h-8" />,
  },
];

export default function ServicesOverview() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-zinc-900 dark:via-zinc-800/30 dark:to-zinc-900 transition-colors duration-300 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-dark dark:text-white mb-4">
            Our <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 font-body max-w-3xl mx-auto leading-relaxed">
            Comprehensive property solutions tailored to owner-occupiers,
            investors, and developers across Australia.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Service Card */}
              <div
                className="relative h-full bg-amber-900/30 border border-amber-900/40 rounded-3xl p-8 shadow-lg transition-all duration-300 ease-out flex flex-col hover:shadow-xl hover:-translate-y-2 hover:bg-amber-900/40 hover:border-amber-900/60"
                style={{ willChange: "transform" }}
              >
                {/* Icon Section */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
                    <div className="text-primary">{service.icon}</div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow space-y-4">
                  {/* Transparent White Title */}
                  <h3 className="text-xl lg:text-2xl font-semibold font-display text-white/90 transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  {/* Beige Description Text */}
                  <p className="text-sm lg:text-base text-[#f5deb3] font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Button Section */}
                <div className="flex gap-3 mt-8 font-display">
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="group/btn flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link
                      href={`/services#${service.id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                  >
                    <Link href={`/book?service=${service.id}`}>Book Now</Link>
                  </Button>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
