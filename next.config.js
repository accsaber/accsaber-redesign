/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    enableUndici: true,
  },
  images: {
    domains: ["cdn.scoresaber.com", "cdn.accsaber.com"],
  },
  async redirects() {
    return [
      {
        source: "/leaderboards",
        destination: "/leaderboards/overall",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
