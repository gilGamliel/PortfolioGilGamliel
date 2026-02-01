import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header, Footer } from "@/components/layout";
import { AnalyticsInit } from "@/components/AnalyticsInit";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gil Gamliel | Full-Stack & Mobile Developer",
  description:
    "Full-stack and mobile developer building production-grade web and iOS/Android apps. View my projects and get in touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Plausible Analytics - Privacy-friendly, no cookies */}
        <Script
          defer
          data-domain="gilgamlielportfolio.vercel.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-white`}
      >
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <AnalyticsInit />
      </body>
    </html>
  );
}
