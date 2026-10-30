import type { NextConfig } from "next";
import { resolve } from "node:path";
const root = resolve(process.cwd(), "../..");
const config: NextConfig = {
  turbopack: { root },
  outputFileTracingRoot: root,
  transpilePackages: ["@opensilicon/brand", "@opensilicon/ui", "@opensilicon/core", "@opensilicon/content"],
  devIndicators: false,
};
export default config;
