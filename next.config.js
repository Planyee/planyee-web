/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};
// Fix
/// module.exports = nextConfig
module.exports = {
  images: {
    domains: ["korean.visitseoul.net"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
