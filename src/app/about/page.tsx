"use client";

import { aboutIntro, anita, behindAP, pratiksha } from "@/lib/aboutData";
import SEO from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowDown, User, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function AboutUsPage() {
  const [showAnita, setShowAnita] = useState(false);
  const [showPratiksha, setShowPratiksha] = useState(false);

  const anitaRef = useRef<HTMLDivElement>(null);
  const pratikshaRef = useRef<HTMLDivElement>(null);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setter: (value: boolean) => void,
    isVisible: boolean
  ) => {
    if (isVisible) {
      setter(false);
      return;
    }

    setter(true);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <SEO
        title="About Us | A&P Buyers Agency"
        description="Learn more about A&P Buyers Agency - Australia's trusted buyer's agents. Discover our vision, mission, and the stories of Anita and Pratiksha, who bring decades of experience in property investing and development."
        image="https://www.apbuyersagency.com.au/images/about.jpg"
        url="https://www.apbuyersagency.com.au/about"
      />

      <div className="w-full mt-15">
        {/* Background Section */}
        <section
          className="bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/about.jpg')" }}
        >
          <div className="max-w-7xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
            <div className="grid lg:grid-cols-[35%_65%] gap-12 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1 group"
                style={{ willChange: "transform" }}
              >
                <Image
                  src={behindAP.image}
                  alt="Anita & Pratiksha"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Anita Button */}
                <motion.button
                  onClick={() =>
                    handleScroll(anitaRef, setShowAnita, showAnita)
                  }
                  className="group absolute bottom-24 left-6 bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/90 text-white font-semibold px-6 py-3 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer dark:text-black"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>
                      {showAnita ? "Hide Anita's Story" : "Meet Anita"}
                    </span>
                    {!showAnita && (
                      <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    )}
                    {showAnita && <X className="w-4 h-4" />}
                  </div>
                </motion.button>

                {/* Pratiksha Button */}
                <motion.button
                  onClick={() =>
                    handleScroll(pratikshaRef, setShowPratiksha, showPratiksha)
                  }
                  className="group absolute top-84 max-[500px]:top-64 max-[600px]:top-55 right-6 bg-gradient-to-r from-white/90 to-white/70 hover:from-white hover:to-white/90 text-gray-800 font-semibold px-6 py-3 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>
                      {showPratiksha
                        ? "Hide Pratiksha's Story"
                        : "Meet Pratiksha"}
                    </span>
                    {!showPratiksha && (
                      <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    )}
                    {showPratiksha && <X className="w-4 h-4" />}
                  </div>
                </motion.button>
              </motion.div>

              {/* Translucent Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-black/40 border border-white/30 p-8 rounded-2xl shadow-lg order-1 lg:order-2"
              >
                <h2 className="text-3xl max-md:text-xl font-display font-bold text-[#ede7dd] mb-6 max-md:mb-1">
                  About A&P Buyers Agency
                </h2>
                <p className="md:text-lg text-sm text-[#ede7dd] font-body leading-relaxed whitespace-pre-line text-justify">
                  {aboutIntro}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-zinc-900 dark:via-zinc-800/50 dark:to-zinc-900 transition-colors duration-300">
          <div className="max-w-7xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[60%_40%] gap-8 items-start">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
                style={{ willChange: "transform" }}
              >
                <Image
                  src="/images/walking.jpg"
                  alt="A&P Buyers Agency Vision"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              {/*Vision & Mission */}
              <div className="space-y-8">
                {/* Vision */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-[#E8DAD1]/30 border border-amber-900/40 rounded-3xl p-8 shadow-lg transition-all duration-300 ease-out flex flex-col hover:shadow-xl hover:-translate-y-2 hover:bg-[#E8DAD1]/40 hover:border-amber-900/60 dark:bg-black"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-dark dark:text-white">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-base lg:text-lg text-muted-foreground dark:text-gray-300 font-body leading-relaxed italic">
                    To be Australia&apos;s #1 trusted partner in strategic
                    property acquisition while empowering clients to build
                    wealth and financial freedom through every purchase.
                  </p>
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="bg-[#E8DAD1]/30 border border-amber-900/40 rounded-3xl p-8 shadow-lg transition-all duration-300 ease-out flex flex-col hover:shadow-xl hover:-translate-y-2 hover:bg-[#E8DAD1]/40 hover:border-amber-900/60 dark:bg-black"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-dark dark:text-white">
                      Mission Statement
                    </h3>
                  </div>
                  <p className="text-base lg:text-lg text-muted-foreground dark:text-gray-300 font-body leading-relaxed italic">
                    Deliver exceptional property acquisition strategies that
                    empower long-term wealth building through market insight,
                    exclusive access, and personalised support.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Anita Section */}
        {showAnita && (
          <section
            ref={anitaRef}
            className="bg-gray-50 dark:bg-zinc-900 transition-colors duration-300"
          >
            <div className="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative mb-6 float-left mr-8 w-full lg:w-[45%] h-[500px]">
                  <Image
                    src={anita.image}
                    alt={anita.name}
                    fill
                    className="object-cover rounded-2xl shadow-lg transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h2 className="text-3xl font-display font-bold">
                  {anita.name}
                </h2>
                <p className="italic text-primary dark:text-accent font-medium mb-4">
                  {anita.quote}
                </p>
                <p className="text-lg text-muted-foreground dark:text-gray-300 font-body leading-relaxed whitespace-pre-line text-justify">
                  {anita.description}
                </p>

                <motion.button
                  onClick={() => setShowAnita(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 mt-4 cursor-pointer"
                  style={{ willChange: "transform" }}
                >
                  <X className="w-4 h-4" />
                  Close Story
                </motion.button>

                <div className="clear-both"></div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Pratiksha Section */}
        {showPratiksha && (
          <section
            ref={pratikshaRef}
            className="bg-primary/10 dark:bg-zinc-800 transition-colors duration-300"
          >
            <div className="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="relative mb-6 float-right ml-8 w-full lg:w-[45%] h-[500px]">
                  <Image
                    src={pratiksha.image}
                    alt={pratiksha.name}
                    fill
                    className="object-cover rounded-2xl shadow-lg transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h2 className="text-3xl font-display font-bold">
                  {pratiksha.name}
                </h2>
                <p className="italic text-primary dark:text-accent font-medium mb-4">
                  {pratiksha.quote}
                </p>
                <p className="text-lg text-muted-foreground dark:text-gray-300 font-body leading-relaxed whitespace-pre-line text-justify">
                  {pratiksha.description}
                </p>
                <motion.button
                  onClick={() => setShowPratiksha(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 mt-4 cursor-pointer dark:text-black"
                  style={{ willChange: "transform" }}
                >
                  <X className="w-4 h-4" />
                  Close Story
                </motion.button>

                <div className="clear-both"></div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
