/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		enableUndici: true
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
	"output": 'standalone'
};

module.exports = nextConfig;
