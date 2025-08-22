"use client";

import { Button } from "@/components/ui/button";
import { events, webinars } from "@/lib/eventsData";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SponsorshipsEventsOverview() {
  return (
    <>
      {/* Events Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 dark:from-accent/10 dark:via-accent/20 dark:to-accent/10 transition-colors duration-300 overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/collaborate_bg.jpg"
          alt="Community Events Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#ede7dd]/70 mb-6">
              Sponsorships & <span className="text-[#ede7dd]">Events</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#ede7dd] font-body max-w-3xl mx-auto leading-relaxed">
              Supporting local initiatives and hosting events that connect
              people, ideas, and opportunities within the property community.
            </p>
          </motion.div>

          {/* Intro Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="relative bg-white/90 dark:bg-zinc-900/90 border border-white/30 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="relative w-full lg:w-1/2 h-80 lg:h-96">
                  <Image
                    src="/images/collaborate_bg.jpg"
                    alt="Collaborate"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-lg" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white/30 rounded-full" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center p-8 lg:p-12 w-full lg:w-1/2 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-display font-bold text-dark dark:text-white">
                      Building <span className="text-primary">Community</span>{" "}
                      Together
                    </h3>
                    <p className="text-base lg:text-lg text-muted-foreground dark:text-gray-300 font-body leading-relaxed">
                      From sponsoring community programs to hosting property
                      networking events, we actively contribute to initiatives
                      that inspire growth and collaboration. Our events bring
                      together investors, homebuyers, and industry experts to
                      share knowledge and build valuable connections.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link href="/events" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>View All Events</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    >
                      <Link href="/events#partner-with-us">
                        Partner With Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#ede7dd]/70">
                Upcoming Events &{" "}
                <span className="text-[#ede7dd]">Collaborations</span>
              </h3>
            </div>

            {/* Events Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <motion.div
                  key={index}
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
                  {/* Event Card */}
                  <div
                    className="h-full bg-white/90 dark:bg-zinc-900/90 border border-white/30 dark:border-gray-700/50 rounded-3xl shadow-lg transition-all duration-300 ease-out overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2"
                    style={{ willChange: "transform" }}
                  >
                    {/* Image Section */}
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-lg lg:text-xl font-display font-semibold text-dark dark:text-white transition-colors duration-300 group-hover:text-primary">
                          {event.title}
                        </h4>

                        <div className="flex items-center gap-2 text-sm text-primary dark:text-accent">
                          <Calendar className="w-3 h-3" />
                          <span className="font-medium">{event.date}</span>
                        </div>

                        <p className="text-sm lg:text-base text-muted-foreground dark:text-gray-300 font-body leading-relaxed flex-grow">
                          {event.description}
                        </p>
                      </div>

                      {/* Button */}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="group/btn mt-auto border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                      >
                        <Link
                          href={event.link}
                          target="_blank"
                          className="flex items-center justify-center gap-2"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                      </Button>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-black dark:via-zinc-900/30 dark:to-black transition-colors duration-300 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse delay-1500" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-dark dark:text-white mb-4">
              Upcoming <span className="text-primary">Webinars</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 font-body max-w-2xl mx-auto leading-relaxed">
              Join our expert-led sessions to gain valuable insights into the
              property market.
            </p>
          </motion.div>

          {/* Webinars Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {webinars.map((webinar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Webinar Card */}
                <div
                  className="h-full bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:bg-zinc-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg transition-all duration-300 ease-out p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2"
                  style={{ willChange: "transform" }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
                      <Video className="w-8 h-8 text-primary" />
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                        <Clock className="w-3 h-3" />
                        {webinar.time}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {webinar.date}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow space-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold font-display text-dark dark:text-white transition-colors duration-300 group-hover:text-primary">
                      {webinar.title}
                    </h3>

                    <p className="text-sm lg:text-base text-muted-foreground dark:text-gray-300 font-body leading-relaxed">
                      {webinar.description}
                    </p>
                  </div>

                  {/* Button */}
                  <Button
                    asChild
                    size="lg"
                    className="group/btn mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link
                      href={webinar.url}
                      target="_blank"
                      className="flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>Join Webinar</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
