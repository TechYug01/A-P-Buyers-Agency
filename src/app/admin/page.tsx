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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="relative">
          <h1 className="text-4xl font-bold text-center font-display tracking-tight">
            Admin Dashboard
          </h1>
          <div className="absolute right-0 top-0">
            <UserButton afterSignOutUrl="/admin" />
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-10">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="group bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition border border-border flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="mb-6 flex items-center justify-center">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 w-16 h-16 transition group-hover:bg-primary/20">
                <section.icon className="w-10 h-10 text-primary group-hover:scale-110 transition" />
              </span>
            </div>
            <h2 className="text-xl font-semibold font-display group-hover:text-primary mb-2 transition">
              {section.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
