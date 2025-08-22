"use client";

import NewsletterModal from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { newsletters, webinars } from "@/lib/eventsData";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, Users, Video } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export default function WebinarsAndNewsletters() {
  const [webinarEmblaRef, webinarEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [newsletterEmblaRef, newsletterEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const webinarIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const newsletterIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startWebinarAutoplay = useCallback(() => {
    if (!webinarEmblaApi) return;
    webinarIntervalRef.current = setInterval(() => {
      webinarEmblaApi.scrollNext();
    }, 5000);
  }, [webinarEmblaApi]);

  const stopWebinarAutoplay = useCallback(() => {
    if (webinarIntervalRef.current) {
      clearInterval(webinarIntervalRef.current);
      webinarIntervalRef.current = null;
    }
  }, []);

  const startNewsletterAutoplay = useCallback(() => {
    if (!newsletterEmblaApi) return;
    newsletterIntervalRef.current = setInterval(() => {
      newsletterEmblaApi.scrollNext();
    }, 10000);
  }, [newsletterEmblaApi]);

  const stopNewsletterAutoplay = useCallback(() => {
    if (newsletterIntervalRef.current) {
      clearInterval(newsletterIntervalRef.current);
      newsletterIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startWebinarAutoplay();
    return stopWebinarAutoplay;
  }, [startWebinarAutoplay, stopWebinarAutoplay]);

  useEffect(() => {
    startNewsletterAutoplay();
    return stopNewsletterAutoplay;
  }, [startNewsletterAutoplay, stopNewsletterAutoplay]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const openNewsletterModal = (title: string, content: string) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <>
      {/* Webinars & Newsletters Section */}
      <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-black dark:via-zinc-900/30 dark:to-black transition-colors duration-300 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Webinars */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col"
              onMouseEnter={stopWebinarAutoplay}
              onMouseLeave={startWebinarAutoplay}
            >
              {/* Webinar Header */}
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4 text-center">
                  Upcoming <span className="text-primary">Webinars</span>
                </h2>
              </div>

              {/* Webinars Carousel */}
              <div className="flex-1">
                <div
                  className="overflow-hidden h-[480px]"
                  ref={webinarEmblaRef}
                >
                  <div className="flex h-full">
                    {webinars.map((webinar, idx) => (
                      <div key={idx} className="flex-[0_0_100%] p-4 h-full">
                        <div
                          className="h-full bg-[#E8DAD1]/30 border border-amber-900/30 rounded-3xl shadow-md transition-all duration-300 ease-out p-8 flex flex-col hover:shadow-lg hover:bg-[#E8DAD1]/40 dark:bg-black"
                          style={{ willChange: "transform" }}
                        >
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
                              <Video className="w-8 h-8 text-primary" />
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-2 text-sm text-primary font-medium mb-1">
                                <Clock className="w-3 h-3" />
                                {webinar.time}
                              </div>
                              <div className="text-xs dark:text-primary text-black/80">
                                {webinar.date}
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-grow space-y-4">
                            <h3 className="text-xl font-bold font-display text-black/90 dark:text-white/90">
                              {webinar.title}
                            </h3>

                            <p className="text-sm text-black/80 dark:text-primary font-body leading-relaxed">
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Newsletters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col"
              onMouseEnter={stopNewsletterAutoplay}
              onMouseLeave={startNewsletterAutoplay}
            >
              {/* Newsletter Header */}
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4 text-center">
                  Newsletters & <span className="text-primary">Insights</span>
                </h2>
              </div>

              {/* Newsletters Carousel */}
              <div className="flex-1">
                <div
                  className="overflow-hidden h-[480px]"
                  ref={newsletterEmblaRef}
                >
                  <div className="flex h-full">
                    {newsletters.map((nl, idx) => (
                      <div key={idx} className="flex-[0_0_100%] p-4 h-full">
                        <div className="bg-[#E8DAD1]/30 border border-amber-900/30 rounded-3xl shadow-md p-8 flex flex-col h-full hover:bg-[#E8DAD1]/40 hover:shadow-lg transition-all duration-300 dark:bg-black">
                          <div className="mb-2">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                              <Mail className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold font-display text-black/90 dark:text-primary mb-4">
                              {nl.title}
                            </h3>
                          </div>

                          <p className="text-sm text-black/90 dark:text-primary font-body leading-relaxed flex-grow mb-6">
                            {nl.summary}
                          </p>

                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer w-full border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                            onClick={() =>
                              openNewsletterModal(nl.title, nl.content)
                            }
                          >
                            Read More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {modalState.isOpen && (
        <NewsletterModal
          title={modalState.title}
          content={modalState.content}
          onClose={closeModal}
        />
      )}
    </>
  );
}
