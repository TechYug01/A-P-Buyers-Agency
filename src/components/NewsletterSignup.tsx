"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email address.");

    try {
      setLoading(true);
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("🎉 You're subscribed to A&P Buyers insights!");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center py-20 bg-gradient-to-b from-white via-[#f8f5f3] to-white dark:from-black dark:via-zinc-900 dark:to-black transition-colors">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl font-bold text-center text-zinc-900 dark:text-white"
      >
        Join our{" "}
        <span className="bg-gradient-to-r from-[#6e1e24] to-[#6f2328] bg-clip-text text-transparent">
          Newsletter
        </span>
      </motion.h2>

      <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        Get exclusive A&P Buyers insights, off-market property updates, and
        expert strategies.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex w-full max-w-md items-center rounded-2xl bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-700 overflow-hidden"
      >
        <input
          type="email"
          placeholder="Email address"
          className="flex-1 px-4 py-3 text-base text-zinc-800 dark:text-white bg-transparent outline-none placeholder:text-zinc-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 font-semibold text-white transition ${
            loading
              ? "bg-gradient-to-r from-[#6e1e24]/70 to-[#6f2328]/70 cursor-not-allowed"
              : "bg-gradient-to-r from-[#6e1e24] to-[#6f2328] hover:opacity-90 cursor-pointer"
          }`}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </motion.form>
    </section>
  );
}
