"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 mt-25 mb-15"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display font-bold text-dark dark:text-white">
            Create your account
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 text-sm mt-2">
            Sign up to start managing your admin dashboard.
          </p>
        </div>
        <div className="flex justify-center">
          <SignUp
            forceRedirectUrl="/admin"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-all",
                card: "shadow-none bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "iconButton",
              },
            }}
            routing="path"
            path="/sign-up"
          />
        </div>
      </motion.div>
    </div>
  );
}
