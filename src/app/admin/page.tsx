"use client";

import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { CalendarDays, Database, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    { name: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
    { name: "Events", icon: CalendarDays, href: "/admin/events" },
    { name: "Webinars", icon: FileText, href: "/admin/webinars" },
    { name: "Newsletters", icon: Database, href: "/admin/newsletters" },
  ];

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-40 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 font-display"
      >
        <div className="relative">
          Admin Dashboard
          <div className="absolute right-30 -top-15">
            <UserButton afterSignOutUrl="/admin" />
          </div>
        </div>
      </motion.h1>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="group bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-border flex flex-col items-center justify-center text-center"
          >
            <section.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition" />
            <h2 className="text-xl font-semibold font-display group-hover:text-primary">
              {section.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
