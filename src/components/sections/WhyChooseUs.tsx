"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Globe,
  Handshake,
  LineChart,
  SearchCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Nationwide Service",
    description:
      "We operate in all 6 Australian states to help you find opportunities everywhere.",
    icon: <Globe className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "25+ Years Experience",
    description:
      "Decades of combined experience across residential, commercial, and development projects.",
    icon: <Briefcase className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "Multi-Million Dollar Deals",
    description:
      "We've handled high-value transactions and guided clients through strategic investments.",
    icon: <Building2 className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "Deep Market Insight",
    description:
      "We provide comprehensive market analysis to guide every decision you make.",
    icon: <LineChart className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "National Network",
    description:
      "100+ agents, brokers, and solicitors on-call to support our clients nationwide.",
    icon: <Users className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "Due Diligence Experts",
    description:
      "We research every property thoroughly and negotiate with precision.",
    icon: <SearchCheck className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "Ethical & Transparent",
    description:
      "Authenticity, transparency, and client-first service is our promise.",
    icon: <ShieldCheck className="w-6 h-6 text-[#ede7dd]" />,
  },
  {
    title: "Client Empowerment",
    description:
      "We educate and empower you to make smart decisions — every step of the way.",
    icon: <Handshake className="w-6 h-6 text-[#ede7dd]" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-light via-gray-50/50 to-light dark:from-dark dark:via-zinc-900/50 dark:to-dark relative overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/whychoose.jpg"
        alt="Why Choose Us"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ede7dd]/20 text-white text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4" />
            Our Advantages
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#ede7dd]/70 mb-4">
            Why Choose <span className="text-[#ede7dd]">A&P</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg lg:text-xl font-body text-[#ede7dd] max-w-3xl mx-auto leading-relaxed">
            We bring clarity, strategy, and a nationwide network to every
            property journey — backed by decades of expertise.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div
                className="bg-[#6B6259]/30 border border-amber-900/40 rounded-2xl p-6 h-full shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:bg-[#6B6259]/40 hover:border-amber-900/60"
                style={{ willChange: "transform" }}
              >
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ede7dd]/20 to-[#ede7dd]/10 flex items-center justify-center transition-all duration-300 group-hover:from-[#ede7dd]/30 group-hover:to-[#ede7dd]/20 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-semibold text-white/90 font-display transition-colors duration-300 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[#f5deb3] font-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
