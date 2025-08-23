"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Award, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[100vh] max-[430px]:h-[110vh] mt-15 flex items-center justify-center bg-black overflow-hidden">
      {/* Fallback Image */}
      <img
        src="/images/homepage.jpg"
        alt="Buyers Agents"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
      />

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-5"
        src="/videos/homepage.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ willChange: "transform" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Slogan Badge */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10">
              <span className="text-sm sm:text-base font-body font-semibold text-[#ede7dd] tracking-wider">
                SHAPING FUTURES THROUGH SMARTER BUYING
              </span>
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="relative">
              {/* Main Title */}
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-2 leading-tight">
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#ede7dd] via-[#f5e6d3] to-[#ede7dd] bg-clip-text text-transparent">
                    Australia&apos;s Trusted
                  </span>
                  {/* Underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#6e1e24] to-[#6e1e24]/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  />
                </span>
              </span>

              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-tight">
                <span className="relative">
                  <span className="text-[#ede7dd] drop-shadow-lg">
                    Buyers Agents
                  </span>
                </span>
              </span>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 opacity-60" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 opacity-60" />
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="max-w-2xl px-6 py-4 rounded-2xl bg-white/10 border border-white/20 shadow-lg">
              <p className="text-base sm:text-lg lg:text-xl font-body text-gray-200 leading-relaxed">
                At A&P Buyers Agency, we help{" "}
                <span className="text-[#ede7dd] font-semibold">
                  owner-occupiers
                </span>
                ,
                <span className="text-[#ede7dd] font-semibold"> investors</span>
                , and
                <span className="text-[#ede7dd] font-semibold">
                  {" "}
                  developers
                </span>{" "}
                acquire high-performing properties across all 6 Australian
                states.
              </p>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-[#ede7dd]" />
              <span className="text-sm font-medium">All 6 States</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <TrendingUp className="w-4 h-4 text-[#ede7dd]" />
              <span className="text-sm font-medium">6% Average net yield</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Award className="w-4 h-4 text-[#ede7dd]" />
              <span className="text-sm font-medium">Expert Agents</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden font-semibold px-8 py-6 rounded-2xl text-lg bg-gradient-to-r from-[#ede7dd] to-[#ede7dd]/90 hover:from-[#ede7dd]/90 hover:to-[#ede7dd] shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl text-black"
              style={{ willChange: "transform" }}
            >
              <Link href="/book" className="flex items-center gap-2">
                <span>Book A Free Consult Today</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </Button>

            {/* Secondary CTA */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-6 rounded-2xl text-lg bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105"
              style={{ willChange: "transform" }}
            >
              <Link href="/services">Our Expertise</Link>
            </Button>
          </motion.div>
        </motion.div>
        <p className="mt-6 text-center text-xs text-gray-400 max-w-md mx-auto">
          Powered by Property Buyers Team - NSW Lic. 10087054, supervised by
          Andrey Vinogradov - Class 1 Lic. 20244222.
        </p>
      </div>
    </section>
  );
}
