"use client";

import { Button } from "@/components/ui/button";
import SEO from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle,
  Hammer,
  Home,
  PiggyBank,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "owner-occupier",
    title: "Owner Occupier",
    description:
      "We work with you to identify, negotiate, and secure your dream home while maximising value and minimising stress. Our personalised approach ensures every purchase aligns with your lifestyle, budget, and long-term plans.",
    icon: <Home className="w-8 h-8" />,
    features: [
      "Dream Home Finder",
      "Value Maximisation",
      "Stress-Free Process",
    ],
  },
  {
    id: "residential-investments",
    title: "Residential Investments",
    description:
      "We help you build a high-performing property portfolio, providing insights on capital growth, rental yield, and market timing to achieve long-term wealth creation.",
    icon: <Building className="w-8 h-8" />,
    features: ["Portfolio Building", "Capital Growth", "Rental Yield Analysis"],
  },
  {
    id: "commercial-investments",
    title: "Commercial Investments",
    description:
      "Our experts guide you through the commercial property market, from retail and office spaces to industrial opportunities, ensuring sustainable returns and strategic growth.",
    icon: <Briefcase className="w-8 h-8" />,
    features: ["Retail & Office", "Industrial Sites", "Strategic Growth"],
  },
  {
    id: "smsf",
    title: "Self-Managed Super Fund (SMSF)",
    description:
      "Leverage your superannuation to purchase property within your SMSF, with tailored advice to ensure compliance, tax efficiency, and strong investment returns.",
    icon: <PiggyBank className="w-8 h-8" />,
    features: ["SMSF Compliance", "Tax Efficiency", "Retirement Wealth"],
  },
  {
    id: "development-opportunities",
    title: "Development Opportunities",
    description:
      "We identify profitable land and development sites, assessing zoning, feasibility, and potential returns to deliver high-value projects with strong growth potential.",
    icon: <Hammer className="w-8 h-8" />,
    features: [
      "Land Acquisition",
      "Feasibility Studies",
      "High-Value Projects",
    ],
  },
  {
    id: "portfolio-management",
    title: "Portfolio Management",
    description:
      "Ongoing support to optimise and grow your property holdings, including asset reviews, refinancing strategies, and market re-positioning.",
    icon: <TrendingUp className="w-8 h-8" />,
    features: ["Asset Reviews", "Refinancing", "Market Positioning"],
  },
];

export default function OurServicesPage() {
  return (
    <>
      <SEO
        title="Our Services | A&P Buyer's Agency"
        description="Explore A&P Buyer's Agency's full range of property services for owner-occupiers, investors, and developers. From residential to commercial investments, SMSF, and portfolio management."
        url="https://www.apbuyersagency.com.au/services"
      />

      <section className="bg-gradient-to-b from-light via-gray-50/30 to-light dark:from-dark dark:via-zinc-800/30 dark:to-dark transition-colors duration-300 mt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark dark:text-white mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 font-body max-w-4xl mx-auto leading-relaxed">
              Whether you&apos;re a first-time buyer, seasoned investor, or
              property developer, our tailored services help you secure the
              right property at the right price.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                id={service.id}
                className="group relative"
              >
                {/* Service Card */}
                <div
                  className="relative h-full bg-amber-900/30 border border-amber-900/40 rounded-3xl p-8 shadow-lg transition-all duration-300 ease-out flex flex-col hover:shadow-xl hover:-translate-y-2 hover:bg-amber-900/40 hover:border-amber-900/60"
                  style={{ willChange: "transform" }}
                >
                  {/* Icon Section */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <div className="text-primary">{service.icon}</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-grow space-y-6">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold font-display text-white/90 transition-colors duration-300 group-hover:text-white mb-3">
                        {service.title}
                      </h2>
                      {/* Description */}
                      <p className="text-sm lg:text-base text-[#f5deb3] font-body leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-[#f5deb3]">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
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
                        href={`/book?service=${service.id}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    >
                      <Link href="/find-us">Contact Us</Link>
                    </Button>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="text-center mt-20"
          >
            <div className="bg-amber-900/30 border border-amber-900/40 rounded-3xl p-8 shadow-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white/90">
                    Not sure which service is right for you?
                  </h3>
                  <p className="text-[#f5deb3] max-w-2xl">
                    Our experts will help you choose the perfect solution for
                    your property goals.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/book" className="flex items-center gap-2">
                    <span>Get Expert Advice</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
