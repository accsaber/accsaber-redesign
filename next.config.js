/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  images: {
    domains: ["cdn.scoresaber.com", "cdn.accsaber.com"],
  },
};

module.exports = nextConfig;
