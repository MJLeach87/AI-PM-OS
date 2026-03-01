import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    // [CUSTOMIZE]: Update script-src, img-src, connect-src for your domains
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https://*.vercel-storage.com",
      "font-src 'self'",
      "connect-src 'self' https://*.turso.io https://api.anthropic.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
  images: {
    // [CUSTOMIZE]: Add your image domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // [CUSTOMIZE]: Add your deployment domain
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
