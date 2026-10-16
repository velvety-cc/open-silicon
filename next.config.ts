import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers() {
    return ["/media/hero/:path*", "/hero-datacenter-v2.mp4", "/approach-intelligence-square-v2.mp4"].map(source => ({ source, headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }));
  },
  redirects() {
    return [
      { source: "/our-approach", destination: "/about", permanent: true },
      { source: "/gpu-financing", destination: "/about", permanent: true },
    ];
  },
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
