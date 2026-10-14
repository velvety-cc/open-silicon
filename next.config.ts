import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
