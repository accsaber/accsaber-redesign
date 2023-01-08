/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		enableUndici: true,
		runtime: 'edge'
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
