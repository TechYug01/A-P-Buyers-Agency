"use client";

import { Button } from "@/components/ui/button";
import { whatsApp } from "@/lib/contactData";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Mail, MessageCircle, X } from "lucide-react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface NewsletterModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

export default function NewsletterModal({
  title,
  content,
  onClose,
}: NewsletterModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center px-2 sm:px-4"
        style={{ zIndex: 99999 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
          style={{ zIndex: 100000 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Logo */}
          <div className="p-6 pb-4 border-b bg-gradient-to-r from-primary/10 to-primary/5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img
                      src={"/logo-light.png"}
                      loading="lazy"
                      alt="logo"
                      className="w-10 h-8 dark:block hidden"
                    />
                    <img
                      src={"/logo-dark.png"}
                      loading="lazy"
                      alt="logo"
                      className="w-10 h-8 dark:hidden"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>A&P Buyer&apos;s Agency Newsletter</span>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-dark dark:text-white leading-tight pr-8">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-6">
              {/* Newsletter Content */}
              <div className="newsletter-content">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-6 text-primary border-b-2 border-primary/20 pb-3">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold mb-4 mt-8 text-foreground">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mb-3 mt-6 text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 space-y-2 pl-6">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 space-y-2 pl-6 list-decimal">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="relative text-muted-foreground">
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">
                        {children}
                      </strong>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 bg-primary/5 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    hr: () => <hr className="my-8 border-border" />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>

              {/* Divider */}
              <hr className="my-8 border-border" />

              {/* Social Links */}
              <div className="space-y-6">
                <div>
                  <p className="font-semibold flex items-center gap-2 text-foreground">
                    <Facebook className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    Follow us on Off market Property Network Australia - A&P
                    Facebook invite:
                  </p>
                  <a
                    href="https://www.facebook.com/share/g/1FJbGmMWjk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-7 inline-block text-primary underline underline-offset-4 hover:no-underline transition-colors"
                  >
                    Follow Facebook page
                  </a>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2 text-foreground">
                    <Facebook className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    Follow us or send a friend request on Facebook:
                  </p>
                  <div className="ml-7 mt-2 space-y-2">
                    <a
                      href="https://www.facebook.com/anita.kumar.9085"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary underline underline-offset-4 hover:no-underline transition-colors"
                    >
                      Anita Kumar
                    </a>
                    <a
                      href="https://www.facebook.com/pratiksha.singh.581"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary underline underline-offset-4 hover:no-underline transition-colors"
                    >
                      Pratiksha Singh
                    </a>
                  </div>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2 text-foreground">
                    <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    Join our WhatsApp group to get real-time access to exclusive
                    listings, deal breakdowns, and early alerts before they go
                    public:
                  </p>
                  <a
                    href={whatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-7 inline-block text-primary underline underline-offset-4 hover:no-underline transition-colors"
                  >
                    Join WhatsApp Group
                  </a>
                </div>
              </div>

              {/* Footer with branding */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img
                      src={"/logo-light.png"}
                      loading="lazy"
                      alt="logo"
                      className="w-10 h-8 dark:block hidden"
                    />
                    <img
                      src={"/logo-dark.png"}
                      loading="lazy"
                      alt="logo"
                      className="w-10 h-8 dark:hidden"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      A&P Buyer&apos;s Agency
                    </p>
                    <p>Australia&apos;s Trusted Buyers Agents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="p-6 pt-4 border-t bg-gray-50 dark:bg-zinc-800/50 flex-shrink-0">
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                className="cursor-pointer px-8"
                size="lg"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
