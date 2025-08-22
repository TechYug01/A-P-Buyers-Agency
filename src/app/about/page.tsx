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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
            <div className="grid lg:grid-cols-[35%_65%] gap-12 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1"
              >
                <Image
                  src={behindAP.image}
                  alt="Anita & Pratiksha"
                  fill
                  className="object-cover object-top max-lg:object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Anita Button */}
                <motion.button
                  onClick={() =>
                    handleScroll(anitaRef, setShowAnita, showAnita)
                  }
                  className="group absolute bottom-24 left-6 bg-gradient-to-r from-primary/90 to-primary/70 hover:from-primary hover:to-primary/90 text-white font-semibold px-6 py-3 rounded-2xl backdrop-blur-md shadow-2xl border border-white/20 transition-all duration-200 transform hover:scale-105 cursor-pointer dark:text-black"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>
                      {showAnita ? "Hide Anita's Story" : "Meet Anita"}
                    </span>
                    {!showAnita && (
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    )}
                    {showAnita && <X className="w-4 h-4" />}
                  </div>
                </motion.button>

                {/* Pratiksha Button */}
                <motion.button
                  onClick={() =>
                    handleScroll(pratikshaRef, setShowPratiksha, showPratiksha)
                  }
                  className="group absolute top-84 max-[500px]:top-64 max-[600px]:top-55 right-6 bg-gradient-to-r from-white/90 to-white/70 hover:from-white hover:to-white/90 text-gray-800 font-semibold px-6 py-3 rounded-2xl backdrop-blur-md shadow-2xl border border-white/20 transition-all duration-200 transform hover:scale-105 cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>
                      {showPratiksha
                        ? "Hide Pratiksha's Story"
                        : "Meet Pratiksha"}
                    </span>
                    {!showPratiksha && (
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    )}
                    {showPratiksha && <X className="w-4 h-4" />}
                  </div>
                </motion.button>
              </motion.div>

              {/* Translucent Box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-black/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 order-1 lg:order-2"
              >
                <h2 className="text-3xl font-display font-bold text-dark text-[#ede7dd] mb-6">
                  About A&P Buyers Agency
                </h2>
                <p className="text-lg text-[#ede7dd] font-body leading-relaxed whitespace-pre-line text-justify">
                  {aboutIntro}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Anita Section */}
        {showAnita && (
          <section
            ref={anitaRef}
            className="bg-gray-50 dark:bg-zinc-900 transition-colors duration-200"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative mb-6 float-left mr-8 w-full lg:w-[45%] h-[500px]">
                  <Image
                    src={anita.image}
                    alt={anita.name}
                    fill
                    className="object-cover rounded-2xl shadow-lg"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 mt-4 cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
            className="bg-primary/10 dark:bg-zinc-800 transition-colors duration-200"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative mb-6 float-right ml-8 w-full lg:w-[45%] h-[500px]">
                  <Image
                    src={pratiksha.image}
                    alt={pratiksha.name}
                    fill
                    className="object-cover rounded-2xl shadow-lg"
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 mt-4 cursor-pointer dark:text-black"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
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
