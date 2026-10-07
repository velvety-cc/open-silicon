import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./marketing.css";
import { businessDescription, pageMetadata } from "@/lib/site";
import Header from "@/components/Header";

const geist = localFont({ src: "./fonts/Geist.woff2", variable: "--font-geist", display: "swap", weight: "100 900" });
const geistMono = localFont({ src: "./fonts/GeistMono.woff2", variable: "--font-geist-mono", display: "swap", weight: "100 900" });

export const metadata: Metadata = pageMetadata("Capital for the Intelligence Economy", businessDescription, "/");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body><Header />{children}</body>
    </html>
  );
}
