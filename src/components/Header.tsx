"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { Menu, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Expertise", href: "/services" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Events", href: "/events" },
  { name: "Find Us", href: "/find-us" },
];

export default function Header() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-200",
        "bg-accent dark:bg-zinc-900/90 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between min-[1920px]:max-w-[1600px]">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
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
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg -z-10" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 max-lg:space-x-4 font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "relative text-sm font-medium transition-all duration-200 hover:text-primary group px-2 py-1 rounded-lg",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-primary/5"
              )}
            >
              <span className="relative z-10">{link.name}</span>
              {/* Active indicator */}
              {pathname === link.href && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              )}
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          ))}

          {/* Book Now Button */}
          <Button
            asChild
            className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group"
          >
            <Link href="/book" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span>Book Now</span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </Link>
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl group"
            >
              <div className="relative">
                {theme === "dark" ? (
                  <Sun
                    size={18}
                    className="group-hover:rotate-12 transition-transform duration-200"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="group-hover:-rotate-12 transition-transform duration-200"
                  />
                )}
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-md" />
              </div>
            </Button>
          )}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 bg-accent hover:text-primary transition-all duration-200 rounded-xl group"
              >
                <Menu className="group-hover:scale-110 transition-transform duration-200" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] p-0 font-sans bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-l border-gray-200/20 dark:border-gray-700/20"
            >
              <SheetTitle>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetTitle>
              <SheetDescription>
                <VisuallyHidden>
                  This menu allows you to navigate the website
                </VisuallyHidden>
              </SheetDescription>

              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20 bg-accent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      A&P Menu
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Navigate our services
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 space-y-2">
                {/* Nav Links */}
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "relative text-base font-medium transition-all duration-200 p-3 rounded-xl group",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.name}</span>
                      {pathname === link.href && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                ))}

                {/* Book Now */}
                <Button
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 group relative overflow-hidden"
                  onClick={() => setOpen(false)}
                >
                  <Link
                    href="/book"
                    className="flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Book Now</span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  </Link>
                </Button>

                {/* Theme Toggle */}
                {mounted && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="w-full mt-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-center gap-3">
                      {theme === "light" ? (
                        <Moon
                          size={18}
                          className="group-hover:-rotate-12 transition-transform duration-200"
                        />
                      ) : (
                        <Sun
                          size={18}
                          className="group-hover:rotate-12 transition-transform duration-200"
                        />
                      )}
                      <span>
                        {theme === "light" ? "Dark Mode" : "Light Mode"}
                      </span>
                    </div>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
