"use client";

import NewsletterModal from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks, whatsApp } from "@/lib/contactData";
import { events, newsletters, webinars } from "@/lib/eventsData";
import SEO from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function EventsCommunityPage() {
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      organisation: formData.get("organisation"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/send-sponsor-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
      console.error("Error sending form data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Events & Community - A&P Buyer's Agency"
        description="Our community involvement, webinars, and newsletters. Partner with us to make a difference."
        url="https://www.apbuyersagency.com.au/events"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-light via-primary/5 to-light dark:from-dark dark:via-primary/10 dark:to-dark transition-colors duration-300 mt-15 overflow-hidden">
        <div className="relative z-10 max-w-5xl min-[1920px]:max-w-[1600px] mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark dark:text-white mb-6"
          >
            Events & <span className="text-primary">Community</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 font-body max-w-3xl min-[1920px]:max-w-[1000px] mx-auto leading-relaxed mb-8"
          >
            From sponsoring local teams to hosting property workshops and
            webinars, we&apos;re committed to strengthening our community and
            creating lasting impact.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="#partner-with-us" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section
        id="events"
        className="relative py-20 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-zinc-800/50 dark:via-zinc-900 dark:to-zinc-800/50 transition-colors duration-300 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4">
              Sponsorships & <span className="text-primary">Events</span>
            </h2>
          </motion.div>

          {/* Events Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
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
                  className="h-full bg-white/90 dark:bg-zinc-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg transition-all duration-300 ease-out overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2"
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
                      <h3 className="text-xl font-semibold font-display text-dark dark:text-white transition-colors duration-300 group-hover:text-primary">
                        {event.title}
                      </h3>

                      <p className="text-sm font-medium text-primary/80 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </p>

                      <p className="text-sm text-muted-foreground dark:text-gray-300 font-body leading-relaxed flex-grow">
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
                        <span>Learn More</span>
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
        </div>
      </section>

      {/* Webinars */}
      <section className="relative py-20 bg-gradient-to-b from-light via-primary/5 to-light dark:from-dark dark:via-primary/10 dark:to-dark transition-colors duration-300 overflow-hidden">
        <div className="relative z-10 max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4">
              Upcoming <span className="text-primary">Webinars</span>
            </h2>
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
                  className="h-full bg-white/90 dark:bg-zinc-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg transition-all duration-300 ease-out p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2"
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
                    <h3 className="text-xl font-bold font-display text-dark dark:text-white transition-colors duration-300 group-hover:text-primary">
                      {webinar.title}
                    </h3>

                    <p className="text-sm text-muted-foreground dark:text-gray-300 font-body leading-relaxed">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletters */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800 transition-colors duration-200">
        <div className="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4">
              Newsletters & <span className="text-primary">Insights</span>
            </h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {newsletters.map((nl, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 border border-border rounded-2xl shadow-lg p-6 flex flex-col"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-display text-dark dark:text-white group-hover:text-primary transition-colors duration-200">
                    {nl.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-300 font-body leading-relaxed flex-grow mb-6">
                  {nl.summary}
                </p>
                <Button
                  variant="outline"
                  onClick={() => openNewsletterModal(nl.title, nl.content)}
                  size="sm"
                  className="mt-6 cursor-pointer w-full"
                >
                  Read More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {modalState.isOpen && (
          <NewsletterModal
            title={modalState.title}
            content={modalState.content}
            onClose={closeModal}
          />
        )}
      </section>

      {/* Partner Form Section */}
      <section
        id="partner-with-us"
        className="relative py-20 bg-gradient-to-b from-light via-primary/5 to-light dark:from-dark dark:via-primary/10 dark:to-dark transition-colors duration-300 overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl min-[1920px]:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-6">
              Partner <span className="text-primary">With Us</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 font-body max-w-2xl mx-auto leading-relaxed">
              Brokers, solicitors, and event coordinators — collaborate with us
              to create value in the property market.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white/90 dark:bg-zinc-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl p-8 lg:p-12"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 text-sm font-medium text-dark dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Name
                  </label>
                  <Input
                    placeholder="Your full name"
                    name="name"
                    className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30"
                  />
                </div>

                <div>
                  <label className="mb-3 text-sm font-medium text-dark dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30"
                  />
                </div>

                <div>
                  <label className="mb-3 text-sm font-medium text-dark dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="(123) 456-7890"
                    className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30"
                  />
                </div>

                <div>
                  <label className="mb-3 text-sm font-medium text-dark dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Organisation
                  </label>
                  <Input
                    name="organisation"
                    placeholder="Company or group name"
                    className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 text-sm font-medium text-dark dark:text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Message
                </label>
                <Textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your partnership idea..."
                  className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30"
                />
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="group bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span>Submit Proposal</span>
                  </div>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-zinc-800/50 dark:via-zinc-900 dark:to-zinc-800/50 transition-colors duration-300">
        <div className="relative z-10 max-w-5xl min-[1920px]:max-w-[1500px] mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4">
              Connect <span className="text-primary">With Us</span>
            </h2>
          </motion.div>

          {/* Social Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Facebook",
                icon: Facebook,
                desc: "Buyer tips, reels, event updates",
                url: socialLinks[0].url,
                color: "hover:bg-blue-500",
                bgColor: "from-blue-500/10 to-blue-600/10",
              },
              {
                name: "LinkedIn",
                icon: Linkedin,
                desc: "Service insights, case studies",
                url: socialLinks[2].url,
                color: "hover:bg-blue-600",
                bgColor: "from-blue-600/10 to-blue-700/10",
              },
              {
                name: "Instagram",
                icon: Instagram,
                desc: "Reels, events, client moments",
                url: socialLinks[1].url,
                color: "hover:bg-pink-500",
                bgColor: "from-pink-500/10 to-pink-600/10",
              },
              {
                name: "WhatsApp",
                icon: MessageCircle,
                desc: "Off-market alerts",
                url: whatsApp,
                color: "hover:bg-green-500",
                bgColor: "from-green-500/10 to-green-600/10",
              },
            ].map((sm, idx) => (
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
                className="group"
              >
                <Link
                  href={sm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-8 text-center bg-gradient-to-br ${sm.bgColor} border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-2`}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 ${sm.color}`}
                  >
                    <sm.icon className="w-8 h-8 transition-all duration-300" />
                  </div>

                  <h3 className="text-lg font-semibold font-display text-dark dark:text-white mb-2 transition-colors group-hover:text-primary">
                    {sm.name}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed">
                    {sm.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
