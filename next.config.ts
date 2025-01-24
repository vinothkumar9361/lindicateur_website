import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['https://lindicateurcontainer.s3.rbx.io.cloud.ovh.net', 'https://lindicateurcontainer.s3.rbx.io.cloud.ovh.net', 'lindicateurcontainer.s3.rbx.io.cloud.ovh.net'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lindicateurcontainer.s3.rbx.io.cloud.ovh.net',
    },
  ],
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
