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
    icon: <Globe className="w-6 h-6 text-primary" />,
    gradient: "from-blue-500/10 to-primary/10",
  },
  {
    title: "25+ Years Experience",
    description:
      "Decades of combined experience across residential, commercial, and development projects.",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    gradient: "from-emerald-500/10 to-primary/10",
  },
  {
    title: "Multi-Million Dollar Deals",
    description:
      "We've handled high-value transactions and guided clients through strategic investments.",
    icon: <Building2 className="w-6 h-6 text-primary" />,
    gradient: "from-amber-500/10 to-primary/10",
  },
  {
    title: "Deep Market Insight",
    description:
      "We provide comprehensive market analysis to guide every decision you make.",
    icon: <LineChart className="w-6 h-6 text-primary" />,
    gradient: "from-purple-500/10 to-primary/10",
  },
  {
    title: "National Network",
    description:
      "100+ agents, brokers, and solicitors on-call to support our clients nationwide.",
    icon: <Users className="w-6 h-6 text-primary" />,
    gradient: "from-rose-500/10 to-primary/10",
  },
  {
    title: "Due Diligence Experts",
    description:
      "We research every property thoroughly and negotiate with precision.",
    icon: <SearchCheck className="w-6 h-6 text-primary" />,
    gradient: "from-teal-500/10 to-primary/10",
  },
  {
    title: "Ethical & Transparent",
    description:
      "Authenticity, transparency, and client-first service is our promise.",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    gradient: "from-indigo-500/10 to-primary/10",
  },
  {
    title: "Client Empowerment",
    description:
      "We educate and empower you to make smart decisions — every step of the way.",
    icon: <Handshake className="w-6 h-6 text-primary" />,
    gradient: "from-orange-500/10 to-primary/10",
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
              {/* Card */}
              <div
                className={`bg-gradient-to-br ${feature.gradient} border border-white/30 dark:border-gray-700/50 rounded-2xl p-6 h-full shadow-lg transition-all duration-300 ease-out bg-white/90 dark:bg-zinc-900/90 hover:shadow-xl hover:-translate-y-2 hover:border-white/50`}
                style={{ willChange: "transform" }}
              >
                {/* Icon Container */}
                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg lg:text-xl font-semibold text-dark dark:text-white font-display transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-sm lg:text-base text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* bottom accent */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
