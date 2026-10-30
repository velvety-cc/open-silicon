import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const geist = localFont({ src: "../../../packages/brand/fonts/Geist.woff2", variable: "--font-geist", display: "swap", weight: "100 900" });
const geistMono = localFont({ src: "../../../packages/brand/fonts/GeistMono.woff2", variable: "--font-geist-mono", display: "swap", weight: "100 900" });
export const metadata: Metadata = { title: "OpenSilicon presentations", robots: { index: false, follow: false, nocache: true } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
