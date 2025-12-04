import withPWA from "./lib/next-pwa-wrapper.cjs";

const nextConfig = {
	i18n: undefined,
	compiler: {
		removeConsole: process.env.NODE_ENV !== "development",
	},
	turbopack: {},
	outputFileTracingRoot: import.meta.dirname,
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "**.ufs.sh",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.lighting.philips.com.tr",
				pathname: "/**",
			},
		],
	},
	// async redirects() {
	// 	return [
	// 		{
	// 			source: "/",
	// 			destination: "/chats",
	// 			permanent: true,
	// 		},
	// 	];
	// },
};
export default withPWA({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	register: true,
	skipWaiting: true,
})(nextConfig);
