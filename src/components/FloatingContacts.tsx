"use client";

import { Mail, MessageCircle, Phone, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingContacts() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      label: "Call Now: +0423 512 669",
      sublabel: "Available 9AM - 6PM",
      href: "tel:+0423512669",
      gradient: "from-red-500 via-red-600 to-red-700",
      hoverGradient: "from-red-400 via-red-500 to-red-600",
      glowColor: "shadow-red-500/25",
      iconBg: "bg-red-500/20",
    },
    {
      id: "mail",
      icon: <Mail size={20} />,
      label: "Email Us",
      sublabel: "anita@apbuyersagency.com.au",
      href: "mailto:anita@apbuyersagency.com.au",
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      hoverGradient: "from-blue-400 via-blue-500 to-blue-600",
      glowColor: "shadow-blue-500/25",
      iconBg: "bg-blue-500/20",
    },
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      label: "Join WhatsApp Group",
      sublabel: "Get exclusive property alerts",
      href: "https://chat.whatsapp.com/G5cbBBSLohV4zeNVwD2LbR",
      gradient: "from-green-500 via-green-600 to-green-700",
      hoverGradient: "from-green-400 via-green-500 to-green-600",
      glowColor: "shadow-green-500/25",
      iconBg: "bg-green-500/20",
      badge: <Users className="w-3 h-3" />,
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

          return (
            <div key={contact.id} className="relative flex justify-end">
              {/* Contact Button */}
              <Link
                href={contact.href}
                target="_blank"
                onClick={() => setHovered(null)}
                onMouseEnter={() => !isMobile && setHovered(contact.id)}
                onMouseLeave={() => !isMobile && setHovered(null)}
                className={`group relative flex items-center rounded-2xl shadow-xl transition-all duration-200 ease-out overflow-hidden backdrop-blur-sm border border-white/20 ${
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
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                {/* Icon Container */}
                <div className="relative flex items-center justify-center min-w-[3.5rem] h-14">
                  <div
                    className={`w-10 h-10 rounded-xl ${contact.iconBg} backdrop-blur-sm flex items-center justify-center transition-all duration-200 group-hover:scale-110`}
                  >
                    <div className="text-white relative">
                      {contact.icon}
                      {/* Pulse ring for WhatsApp */}
                      {contact.id === "whatsapp" && (
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Badge for WhatsApp */}
                  {contact.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-white animate-bounce">
                      {contact.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex flex-col transition-all duration-200 ${
                    isHovered && !isMobile
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                >
                  <span className="text-white text-sm font-semibold whitespace-nowrap">
                    {contact.label}
                  </span>
                  <span className="text-white/80 text-xs whitespace-nowrap">
                    {contact.sublabel}
                  </span>
                </div>

                {/* Arrow indicator */}
                <div
                  className={`ml-auto transition-all duration-200 ${
                    isHovered && !isMobile
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2"
                  }`}
                >
                  <div className="w-2 h-2 border-r-2 border-b-2 border-white/60 rotate-[-45deg]" />
                </div>

                {/* Floating dots animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                      style={{
                        top: `${20 + i * 15}%`,
                        right: `${10 + i * 5}%`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
