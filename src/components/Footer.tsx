"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { contacts, socialLinks } from "@/lib/contactData";
import { motion } from "framer-motion";
import {
  Building2,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-light via-gray-50/50 to-gray-100/50 dark:from-dark dark:via-zinc-800/50 dark:to-zinc-900/50 transition-colors duration-200 py-16 font-body overflow-hidden">
      <div className="relative z-10 max-w-7xl min-[1920px]:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative">
                <img
                  src="/logo-dark.png"
                  alt="A&P Buyers Logo"
                  className="h-12 w-auto dark:hidden transition-transform duration-200 group-hover:scale-105"
                />
                <img
                  src="/logo-light.png"
                  alt="A&P Buyers Logo"
                  className="h-12 w-auto hidden dark:block transition-transform duration-200 group-hover:scale-105"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg -z-10" />
              </div>
            </Link>

            <p className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed font-body mb-4">
              Australia&apos;s trusted property buying experts, delivering
              tailored solutions for owner-occupiers, investors, and developers.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-display font-semibold text-dark dark:text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Expertise", href: "/services" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Find Us", href: "/find-us" },
                { name: "Events", href: "/events" },
                { name: "Book Now", href: "/book" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-muted-foreground dark:text-gray-300 hover:text-primary transition-all duration-200 hover:translate-x-1 font-san"
                  >
                    <div className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary transition-colors" />
                    <span>{link.name}</span>
                    {link.name === "Book Now" && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-display font-semibold text-dark dark:text-white mb-6 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground dark:text-gray-300">
              {contacts.map((contact) => (
                <li key={contact.id} className="group">
                  <Link
                    href={
                      contact.title === "Email"
                        ? `mailto:${contact.value}`
                        : contact.title === "Phone"
                        ? `tel:${contact.value}`
                        : "#"
                    }
                    target="_blank"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200 -m-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      {contact.title === "Email" ? (
                        <Mail size={14} className="text-primary" />
                      ) : contact.title === "Phone" ? (
                        <Phone size={14} className="text-primary" />
                      ) : (
                        <MapPin size={14} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-xs text-primary/70 uppercase tracking-wide mb-1">
                        {contact.name}
                      </div>
                      <div className="break-all">{contact.value}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-display font-semibold text-dark dark:text-white mb-6 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-primary" />
              Follow Us
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                {[
                  {
                    icon: Facebook,
                    url: socialLinks[0].url,
                    name: "Facebook",
                    color: "hover:bg-blue-500",
                  },
                  {
                    icon: Instagram,
                    url: socialLinks[1].url,
                    name: "Instagram",
                    color: "hover:bg-pink-500",
                  },
                  {
                    icon: Linkedin,
                    url: socialLinks[2].url,
                    name: "LinkedIn",
                    color: "hover:bg-blue-600",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    className={`group w-12 h-12 rounded-2xl bg-white/50 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-200 transform hover:scale-110 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Copyright Info */}
            <div className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">
              <p className="font-medium mb-2">
                © {new Date().getFullYear()} A&P Buyers. All Rights Reserved.
              </p>
              <p className="text-[11px] opacity-75">
                Powered by Property Buyers Team - NSW Lic. 10087054, supervised
                by Andrey Vinogradov - Class 1 Lic. 20244222.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              {/* Privacy Policy Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="group text-xs text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 cursor-pointer">
                    <span>Privacy Policy</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-hidden">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      Privacy Policy
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground space-y-4 font-body leading-relaxed text-justify">
                    <p>
                      At A&P Buyers Agency, your privacy is extremely important
                      to us. This Privacy Policy explains how we collect, use,
                      and safeguard your personal information.
                    </p>

                    <h3 className="font-semibold text-dark dark:text-white">
                      1. Information We Collect
                    </h3>
                    <p>
                      We may collect personal information such as your name,
                      email address, phone number, and any other details you
                      provide when contacting us or using our services.
                    </p>

                    <h3 className="font-semibold text-dark dark:text-white">
                      2. How We Use Your Information
                    </h3>
                    <p>Your information is used to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Provide and improve our services</li>
                      <li>Respond to your inquiries and requests</li>
                      <li>Send updates, offers, or newsletters</li>
                      <li>Comply with legal obligations</li>
                    </ul>

                    <h3 className="font-semibold text-dark dark:text-white">
                      3. Sharing Your Information
                    </h3>
                    <p>
                      We do not sell or rent your personal data. However, we may
                      share information with trusted third-party service
                      providers as necessary to deliver our services.
                    </p>

                    <h3 className="font-semibold text-dark dark:text-white">
                      4. Security
                    </h3>
                    <p>
                      We take appropriate technical and organizational measures
                      to safeguard your personal information from unauthorized
                      access, disclosure, alteration, or destruction.
                    </p>

                    <h3 className="font-semibold text-dark dark:text-white">
                      5. Your Rights
                    </h3>
                    <p>
                      You may request access, correction, or deletion of your
                      personal data by contacting us directly at{" "}
                      <a
                        href={`tel:${contacts[0].value}`}
                        className="text-primary hover:underline"
                      >
                        {contacts[0].value}
                      </a>
                      .
                    </p>

                    <p>
                      By using our website and services, you consent to this
                      Privacy Policy.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              {/* T&C Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="group text-xs text-muted-foreground hover:text-primary transition-all duration-200 flex items-center gap-1 cursor-pointer py-2">
                    <span>Terms & Conditions</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      Terms & Conditions
                    </DialogTitle>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground space-y-4 font-body">
                    <p>
                      Disclaimer: A&amp;P Buyers Agency is a trading name only
                      and does not hold a corporate real estate licence.
                    </p>
                    <p>
                      All real estate agency services are provided under the
                      corporate licence of Property Buyers Team (NSW Licence No.
                      10087054) and the supervision of Andrey Vinogradov, Class
                      1 Licence Holder (No. 20244222).
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
