import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Circuit — Compute Credit, Onchain",
  description:
    "Institutional credit infrastructure connecting global crypto liquidity with AI data center operators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
