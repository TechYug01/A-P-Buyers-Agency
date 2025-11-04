"use client";

import NewsletterModal from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import WebinarRegisterModal from "@/components/WebinarFormModal";
import { getNewsletters, getWebinars } from "@/lib/eventsData";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, Users, Video } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Webinar {
  title: string;
  description: string;
  date: string;
  time: string;
  url: string;
  included?: boolean;
}

interface Newsletter {
  title: string;
  summary: string;
  content: string;
  included?: boolean;
}

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

  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [webLoading, setWebLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  const cacheTTL = 5 * 60 * 1000;

  useEffect(() => {
    async function fetchWebinars() {
      setWebLoading(true);

      try {
        const cachedWebinars = localStorage.getItem("webinarsCache");
        if (cachedWebinars) {
          try {
            const { data, ts } = JSON.parse(cachedWebinars);
            if (Date.now() - ts < cacheTTL) {
              setWebinars(data);
              setWebLoading(false);
              return;
            }
          } catch (parseError) {
            console.error("Failed to parse cached webinars:", parseError);
            localStorage.removeItem("webinarsCache");
          }
        }

        const data = await getWebinars();
        if (data) {
          setWebinars(data);
          try {
            localStorage.setItem(
              "webinarsCache",
              JSON.stringify({ data, ts: Date.now() })
            );
          } catch (storageError) {
            console.error("Failed to cache webinars:", storageError);
          }
        }
      } catch (error) {
        console.error("Error fetching webinars:", error);
      } finally {
        setWebLoading(false);
      }
    }

    async function fetchNewsletters() {
      setNewsLoading(true);

      try {
        const cachedNewsletters = localStorage.getItem("newslettersCache");
        if (cachedNewsletters) {
          try {
            const { data, ts } = JSON.parse(cachedNewsletters);
            if (Date.now() - ts < cacheTTL) {
              setNewsletters(data);
              setNewsLoading(false);
              return;
            }
          } catch (parseError) {
            console.error("Failed to parse cached newsletters:", parseError);
            localStorage.removeItem("newslettersCache");
          }
        }

        const data = await getNewsletters();
        if (data) {
          setNewsletters(data);
          try {
            localStorage.setItem(
              "newslettersCache",
              JSON.stringify({ data, ts: Date.now() })
            );
          } catch (storageError) {
            console.error("Failed to cache newsletters:", storageError);
          }
        }
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      } finally {
        setNewsLoading(false);
      }
    }

    fetchWebinars();
    fetchNewsletters();
  }, []);

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
  const [registerModal, setRegisterModal] = useState({
    isOpen: false,
    webinarTitle: "",
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
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-black dark:via-zinc-900/30 dark:to-black transition-colors duration-300 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl min-[1920px]:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Webinars */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col w-full"
              onMouseEnter={stopWebinarAutoplay}
              onMouseLeave={startWebinarAutoplay}
            >
              {/* Webinar Header */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-dark dark:text-white mb-4 text-center">
                  Upcoming <span className="text-primary">Webinars</span>
                </h2>
              </div>

              {/* Webinars Carousel */}
              {webLoading ? (
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
                <div className="flex-1 w-full">
                  <div
                    className="overflow-hidden h-[400px] sm:h-[450px] md:h-[480px] w-full"
                    ref={webinarEmblaRef}
                  >
                    <div className="flex h-full">
                      {webinars.map((webinar, idx) => (
                        <div
                          key={idx}
                          className="flex-[0_0_100%] p-2 sm:px-3 md:px-4 h-full"
                        >
                          <div
                            className="h-full bg-[#E8DAD1]/30 border border-amber-900/30 rounded-2xl sm:rounded-3xl shadow-md transition-all duration-300 ease-out p-4 sm:p-6 md:p-8 flex flex-col hover:shadow-lg hover:bg-[#E8DAD1]/40 dark:bg-black w-full"
                            style={{ willChange: "transform" }}
                          >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4 sm:mb-6">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <Video className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                              </div>

                              <div className="text-right ml-2">
                                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-primary font-medium mb-1">
                                  <Clock className="w-3 h-3" />
                                  <span className="truncate">
                                    {webinar.time}
                                  </span>
                                </div>
                                <div className="text-xs dark:text-primary text-black/80">
                                  {webinar.date}
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-grow space-y-3 sm:space-y-4">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold font-display text-black/90 dark:text-white/90 leading-tight">
                                {webinar.title}
                              </h3>

                              <p className="text-xs sm:text-sm text-black/80 dark:text-primary font-body leading-relaxed">
                                {webinar.description}
                              </p>
                            </div>

                            {/* Button */}
                            <Button
                              size="sm"
                              className="group/btn mt-4 sm:mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 w-full cursor-pointer"
                              onClick={() =>
                                setRegisterModal({
                                  isOpen: true,
                                  webinarTitle: webinar.title,
                                })
                              }
                            >
                              <div className="flex items-center justify-center gap-2 text-sm">
                                <Users className="w-4 h-4 flex-shrink-0" />
                                <span>Register Now</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 flex-shrink-0" />
                              </div>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Newsletters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col w-full"
              onMouseEnter={stopNewsletterAutoplay}
              onMouseLeave={startNewsletterAutoplay}
            >
              {/* Newsletter Header */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-dark dark:text-white mb-4 text-center">
                  Newsletters & <span className="text-primary">Insights</span>
                </h2>
              </div>

              {/* Newsletters Carousel */}
              {newsLoading ? (
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
                <div className="flex-1 w-full">
                  <div
                    className="overflow-hidden h-[400px] sm:h-[450px] md:h-[480px] w-full"
                    ref={newsletterEmblaRef}
                  >
                    <div className="flex h-full">
                      {newsletters.map((nl, idx) => (
                        <div
                          key={idx}
                          className="flex-[0_0_100%] p-2 sm:px-3 md:px-4 h-full"
                        >
                          <div className="bg-[#E8DAD1]/30 border border-amber-900/30 rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-6 md:p-8 flex flex-col h-full hover:bg-[#E8DAD1]/40 hover:shadow-lg transition-all duration-300 dark:bg-black w-full">
                            <div className="mb-2">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4">
                                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                              </div>
                              <h3 className="text-base sm:text-lg md:text-xl font-semibold font-display text-black/90 dark:text-primary mb-3 sm:mb-4 leading-tight">
                                {nl.title}
                              </h3>
                            </div>

                            <p className="text-xs sm:text-sm text-black/90 dark:text-primary font-body leading-relaxed flex-grow mb-4 sm:mb-6">
                              {nl.summary}
                            </p>

                            <Button
                              variant="outline"
                              size="sm"
                              className="cursor-pointer w-full border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 text-sm"
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
              )}
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

      {registerModal.isOpen && (
        <WebinarRegisterModal
          isOpen={registerModal.isOpen}
          webinarTitle={registerModal.webinarTitle}
          onClose={() => setRegisterModal({ isOpen: false, webinarTitle: "" })}
        />
      )}
    </>
  );
}
