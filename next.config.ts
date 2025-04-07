import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	compiler: {
		removeConsole: process.env.NODE_ENV !== "development",
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/chats",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
