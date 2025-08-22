"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Calendar, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const services = [
  "Owner Occupier",
  "Residential Investments",
  "SMSF",
  "Commercial Investments",
  "Development Opportunities",
  "Portfolio Management",
];

export default function BookingForm() {
  const searchParams = useSearchParams();

  const serviceFromUrl = useMemo(() => {
    const s = searchParams.get("service");
    if (!s) return "";
    return (
      services.find(
        (service) =>
          service.toLowerCase().replace(/\s+/g, "-") === s.toLowerCase()
      ) || ""
    );
  }, [searchParams]);

  const [service, setService] = useState(serviceFromUrl);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      service: service,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setService("");
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-light via-gray-50/50 to-white dark:from-dark dark:via-zinc-800/50 dark:to-zinc-900 transition-colors duration-300 min-h-screen flex flex-col lg:flex-row mt-18 overflow-hidden">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full lg:w-1/2 h-64 lg:h-auto group"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/images/book.jpg"
          alt="Consultation"
          fill
          className="object-cover object-top lg:rounded-r-3xl"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent lg:rounded-r-3xl" />
      </motion.div>

      {/* Form Section */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-xl relative"
          style={{ willChange: "transform" }}
        >
          {/* Form Container */}
          <div className="bg-white/95 dark:bg-zinc-900/95 border border-gray-200/60 dark:border-gray-700/50 rounded-3xl shadow-2xl p-8 lg:p-12 relative">
            {/* Form Header */}
            <div className="text-center mb-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-dark dark:text-white mb-3">
                  Book a Free Consultation
                </h1>
                <p className="text-base text-muted-foreground dark:text-gray-300 leading-relaxed max-w-md mx-auto">
                  Fill out the form below and we&apos;ll get back to you to
                  confirm your consultation within 24 hours.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Type */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-semibold text-dark dark:text-white">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Service Type
                </label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="h-12 border-2 rounded-xl hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2">
                    {services.map((s) => (
                      <SelectItem key={s} value={s} className="rounded-lg">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-semibold text-dark dark:text-white">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 pl-12 border-2 rounded-xl hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-semibold text-dark dark:text-white">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 pl-12 border-2 rounded-xl hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-semibold text-dark dark:text-white">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-12 pl-12 border-2 rounded-xl hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm font-semibold text-dark dark:text-white">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Additional Details
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your property goals and requirements..."
                    rows={5}
                    className="pl-12 pt-4 border-2 rounded-xl hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  disabled={loading}
                  type="submit"
                  size="lg"
                  className="group w-full h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-xl text-base font-semibold"
                  style={{ willChange: "transform" }}
                >
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
