"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Phone, User, Users, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Contact information
const contactInfo = [
  {
    name: "Anita",
    phone: "61 423 512 669",
    email: "anita@apbuyersagency.com.au",
  },
  {
    name: "Pratiksha",
    phone: "0412 078 039",
    email: "pratiksha@apbuyersagency.com.au",
  },
];

export function ContactModal({
  isOpen,
  onClose,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  type: "phone" | "email";
}) {
  const isPhone = type === "phone";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white/95 dark:bg-zinc-900/95 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                {isPhone ? (
                  <Phone className="w-8 h-8 text-primary" />
                ) : (
                  <Mail className="w-8 h-8 text-primary" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-dark dark:text-white mb-2">
                {isPhone ? "Call Us" : "Email Us"}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Choose who you&apos;d like to {isPhone ? "call" : "email"}
              </p>
            </div>

            {/* Contact Options */}
            <div className="space-y-4">
              {contactInfo.map((person, index) => (
                <div key={person.name}>
                  <a
                    href={
                      isPhone ? `tel:${person.phone}` : `mailto:${person.email}`
                    }
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#6B6259] hover:bg-[#6B6259]/90 border border-[#6B6259]/30 hover:border-[#6B6259]/50 transition-all duration-200 group w-full break-all"
                    onClick={onClose}
                  >
                    {/* Avatar */}
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 text-white" />
                    </div>

                    {/* Contact Info */}
                    <div className="flex-grow">
                      <h4 className="font-semibold text-white/90 group-hover:text-white mb-1">
                        {person.name}
                      </h4>
                      <p className="text-sm font-medium text-white">
                        {isPhone ? person.phone : person.email}
                      </p>
                    </div>

                    {/* Action Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isPhone
                            ? "bg-[#f5f1e9] group-hover:bg-[#f5f1e9]/30"
                            : "bg-[#f5f1e9] group-hover:bg-[#f5f1e9]/30"
                        }`}
                      >
                        {isPhone ? (
                          <Phone className="w-5 h-5 text-primary dark:text-black" />
                        ) : (
                          <Mail className="w-5 h-5 text-primary dark:text-black" />
                        )}
                      </div>
                    </div>
                  </a>

                  {index < contactInfo.length - 1 && (
                    <div className="h-px bg-amber-900/20 my-3" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function FloatingContacts() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contacts = [
    {
      id: "phone",
      icon: <Phone size={20} />,
      label: "Call Us",
      sublabel: "Available 9AM - 6PM",
      onClick: () => setPhoneModalOpen(true),
      gradient: "from-[#6e1e24]/90 via-[#6e1e24]/95 to-[#6e1e24]",
      hoverGradient: "from-[#6e1e24]/90 via-[#6e1e24]/95 to-[#6e1e24]",
      glowColor: "shadow-[#6e1e24]/25",
      iconBg: "bg-[#6e1e24]/20",
    },
    {
      id: "mail",
      icon: <Mail size={20} />,
      label: "Email Us",
      sublabel: "Reach out to us through Email",
      onClick: () => setEmailModalOpen(true),
      gradient: "from-[#6e1e24]/90 via-[#6e1e24]/95 to-[#6e1e24]",
      hoverGradient: "from-[#6e1e24]/90 via-[#6e1e24]/95 to-[#6e1e24]",
      glowColor: "shadow-[#6e1e24]/25",
      iconBg: "bg-[#6e1e24]/20",
    },
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      label: "Join WhatsApp Group",
      sublabel: "Get exclusive property alerts",
      href: "https://chat.whatsapp.com/G5cbBBSLohV4zeNVwD2LbR",
      gradient: "from-[#6e1e24]/90 via-[#6e1e24]/95 to-[#6e1e24]",
      hoverGradient: "from-[#6e1e24]/90 via-[#6e1e24]/95 to-[#6e1e24]",
      glowColor: "shadow-[#6e1e24]/25",
      iconBg: "bg-[#6e1e24]/20",
    },
  ];

  return (
    <>
      <div
        className={`fixed right-4 bottom-20 flex flex-col gap-4 z-50 transition-all duration-200 "opacity-70 translate-x-2"
        `}
      >
        {contacts.map((contact) => {
          const isHovered = hovered === contact.id;
          const isWhatsApp = contact.id === "whatsapp";

          return (
            <div key={contact.id} className="relative flex justify-end">
              {/* Contact Button */}
              {isWhatsApp ? (
                <Link
                  href={contact.href!}
                  target="_blank"
                  onClick={() => setHovered(null)}
                  onMouseEnter={() => !isMobile && setHovered(contact.id)}
                  onMouseLeave={() => !isMobile && setHovered(null)}
                  className={`group relative flex items-center rounded-2xl shadow-xl transition-all duration-200 ease-out overflow-hidden backdrop-blur-sm ${
                    contact.glowColor
                  } ${
                    isHovered && !isMobile
                      ? `bg-gradient-to-r ${contact.hoverGradient} w-80 pl-4 pr-6 shadow-2xl`
                      : `bg-gradient-to-r ${contact.gradient} w-14 hover:shadow-xl`
                  } h-14`}
                  style={{
                    transform:
                      isHovered && !isMobile
                        ? "scale(1.02)"
                        : "translateX(0) scale(1)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                  <div className="relative flex items-center justify-center min-w-[3.5rem] h-14">
                    <div
                      className={`w-10 h-10 rounded-xl ${contact.iconBg}  flex items-center justify-center transition-all duration-200 group-hover:scale-110`}
                    >
                      <div className="text-white relative">
                        {contact.icon}
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col transition-all duration-200 ${
                      isHovered && !isMobile
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <span className="text-white text-sm font-semibold whitespace-nowrap font-display">
                      {contact.label}
                    </span>
                    <span className="text-white/80 text-xs whitespace-nowrap font-san">
                      {contact.sublabel}
                    </span>
                  </div>

                  <div
                    className={`ml-auto transition-all duration-200 ${
                      isHovered && !isMobile
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2"
                    }`}
                  >
                    <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 rotate-[-45deg]" />
                  </div>
                </Link>
              ) : (
                <button
                  onClick={contact.onClick}
                  onMouseEnter={() => !isMobile && setHovered(contact.id)}
                  onMouseLeave={() => !isMobile && setHovered(null)}
                  className={`group relative flex items-center rounded-2xl shadow-xl transition-all duration-200 ease-out overflow-hidden ${
                    contact.glowColor
                  } ${
                    isHovered && !isMobile
                      ? `bg-gradient-to-r ${contact.hoverGradient} w-80 pl-4 pr-6 shadow-2xl`
                      : `bg-gradient-to-r ${contact.gradient} w-14 hover:shadow-xl`
                  } h-14`}
                  style={{
                    transform:
                      isHovered && !isMobile
                        ? "scale(1.02)"
                        : "translateX(0) scale(1)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                  <div className="relative flex items-center justify-center min-w-[3.5rem] h-14">
                    <div
                      className={`w-10 h-10 rounded-xl ${contact.iconBg} backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-hover:scale-110`}
                    >
                      <div className="text-white relative">{contact.icon}</div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col transition-all duration-200 ${
                      isHovered && !isMobile
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <span className="text-white text-sm font-semibold whitespace-nowrap font-display">
                      {contact.label}
                    </span>
                    <span className="text-white/80 text-xs whitespace-nowrap font-san">
                      {contact.sublabel}
                    </span>
                  </div>

                  <div
                    className={`ml-auto transition-all duration-200 ${
                      isHovered && !isMobile
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2"
                    }`}
                  >
                    <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 rotate-[-45deg]" />
                  </div>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Modals */}
      <ContactModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        type="phone"
      />

      <ContactModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        type="email"
      />
    </>
  );
}
