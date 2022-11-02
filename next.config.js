/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true, runtime: "experimental-edge" },
  images: {
    domains: ["cdn.scoresaber.com", "cdn.accsaber.com"],
  },
  async redirects() {
    return [{ source: "/leaderboards", destination: "/leaderboards/overall" }];
  },
};

module.exports = nextConfig;
