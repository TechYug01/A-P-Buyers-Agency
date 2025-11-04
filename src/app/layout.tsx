import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import FloatingContacts from "@/components/FloatingContacts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Lora, Playfair_Display, Quicksand } from "next/font/google";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-san",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A&P Buyer's Agency",
  description:
    "Shaping Futures Through Smarter Buying. Trusted property acquisition and investment services across Australia.",
  openGraph: {
    images: [
      {
        url: "https://www.apbuyersagency.com.au/images/homepage.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${quicksand.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <ClerkProvider>
        <body className="font-body antialiased transition-colors duration-200">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <FloatingContacts />
            <Footer />
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
