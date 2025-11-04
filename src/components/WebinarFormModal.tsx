"use client";

import { Button } from "@/components/ui/button";
import { getWebinars } from "@/lib/eventsData";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";

interface WebinarRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  webinarTitle: string;
}

interface Webinar {
  title: string;
  description: string;
  date: string;
  time: string;
  url: string;
}

export default function WebinarRegisterModal({
  isOpen,
  onClose,
  webinarTitle,
}: WebinarRegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("au");
  const [webinars, setWebinars] = useState<Webinar[]>([]);

  useEffect(() => {
    async function detectCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data?.country_code) setCountry(data.country_code.toLowerCase());
      } catch {
        setCountry("au");
      }
    }
    detectCountry();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
  };

  async function fetchWebinars(): Promise<Webinar[]> {
    try {
      const cachedWebinars = localStorage.getItem("webinarsCache");
      if (cachedWebinars) {
        try {
          const parsed = JSON.parse(cachedWebinars);
          if (Array.isArray(parsed)) {
            setWebinars(parsed);
            return parsed;
          } else if (Array.isArray(parsed.data)) {
            setWebinars(parsed.data);
            return parsed.data;
          }
        } catch (parseError) {
          console.error("Failed to parse cached webinars:", parseError);
          localStorage.removeItem("webinarsCache");
        }
      }

      const data = await getWebinars();

      if (data) {
        setWebinars(data);
        try {
          localStorage.setItem("webinarsCache", JSON.stringify(data));
        } catch (storageError) {
          console.error("Failed to cache webinars:", storageError);
        }
        return data;
      }
    } catch (error) {
      console.error("Error fetching webinars:", error);
    }
    return [];
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await fetchWebinars();

      const webinar = data.find((w) => w.title === webinarTitle);

      const res = await fetch("/api/register-webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          webinar,
        }),
      });

      if (res.ok) {
        toast.success(
          "Registration successful! Details sent to your email and WhatsApp."
        );
        setFormData({ name: "", email: "", phone: "" });
        onClose();
      } else {
        toast.error("Failed to register. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-gradient-to-b from-white via-gray-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-primary transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-display font-bold text-center text-dark dark:text-white mb-6">
          Register for <span className="text-primary">{webinarTitle}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary outline-none"
          />

          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary outline-none"
          />

          <div className="relative">
            <PhoneInput
              country={country}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{ required: true, name: "phone" }}
              containerClass="!w-full"
              inputClass="!w-full !pl-14 !pr-4 !py-2 !rounded-xl !bg-white dark:!bg-zinc-900 !text-gray-800 dark:!text-gray-200 !border !border-gray-300 dark:!border-zinc-700 focus:!ring-2 focus:!ring-primary focus:!outline-none"
              buttonClass="!bg-transparent !border-0 !absolute !left-2 !top-1/2 !-translate-y-1/2"
              dropdownClass="!bg-white dark:!bg-zinc-900 !text-gray-800 dark:!text-gray-200"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white dark:text-black/60 font-medium rounded-xl py-2 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Registering..." : "Submit"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
