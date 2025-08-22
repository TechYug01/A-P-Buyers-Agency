"use client";

import { ContactModal } from "@/components/FloatingContacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contacts, socialLinks, whatsApp } from "@/lib/contactData";
import SEO from "@/lib/seo";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function FindUsPage() {
  const [loading, setLoading] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/send-contact-email", {
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
        title="Find Us - A&P Buyer's Agency"
        description="Contact A&P Buyer's Agency. Let's talk property! Use our form or connect with us on social media."
        url="https://www.apbuyersagency.com.au/find-us"
      />

      <section className="bg-light dark:bg-dark transition-colors duration-300 mt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden group"
              style={{ willChange: "transform" }}
            >
              <Image
                src="/images/contact.jpg"
                alt="Contact A&P Buyers"
                fill
                loading="lazy"
                className="object-cover object-top rounded-2xl transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            <div className="space-y-8">
              {/* Page Header */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center lg:text-left space-y-6"
              >
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark dark:text-white mb-4">
                    Find <span className="text-primary">Us</span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 font-body max-w-2xl leading-relaxed">
                    Let&apos;s Talk Property! Reach out to us via the form below
                    or connect through our social channels.
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
                <div className="bg-white/90 dark:bg-zinc-900/90 border border-gray-200/60 dark:border-gray-700/50 rounded-3xl shadow-2xl p-8 lg:p-10">
                  {/* Form Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-dark dark:text-white">
                        Send us a message
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll get back to you within 24 hours
                      </p>
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-dark dark:text-white mb-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Name
                      </label>
                      <Input
                        placeholder="Your full name"
                        name="name"
                        className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30 h-12"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-dark dark:text-white mb-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30 h-12"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-dark dark:text-white mb-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        Message
                      </label>
                      <Textarea
                        rows={5}
                        name="message"
                        placeholder="Tell us about your property needs..."
                        className="focus:ring-2 focus:ring-primary transition-all duration-300 border-2 hover:border-primary/30"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="group w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-12"
                      style={{ willChange: "transform" }}
                    >
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <span>{loading ? "Sending..." : "Send Message"}</span>
                      </div>
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-14 flex flex-col items-center space-y-6 text-center"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark dark:text-white mb-4">
                Connect <span className="text-primary">With Us</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 font-body max-w-2xl mx-auto leading-relaxed">
                We&apos;re active on all major platforms. Follow us for updates,
                tips, and off-market opportunities.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              {[
                { icon: Facebook, url: socialLinks[0].url, name: "Facebook" },
                { icon: Instagram, url: socialLinks[1].url, name: "Instagram" },
                { icon: Linkedin, url: socialLinks[2].url, name: "LinkedIn" },
                { icon: MessageCircle, url: whatsApp, name: "WhatsApp" },
              ].map((social) => (
                <Link key={social.name} href={social.url} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                    style={{ willChange: "transform" }}
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                </Link>
              ))}
              <Button
                variant="outline"
                onClick={() => setPhoneModalOpen(true)}
                size="icon"
                className="transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
                style={{ willChange: "transform" }}
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        type="phone"
      />
    </>
  );
}
