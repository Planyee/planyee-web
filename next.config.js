/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

// module.exports = nextConfig
module.exports = {
  images: {
    domains: ["korean.visitseoul.net"],
  },
};
