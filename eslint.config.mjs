import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
	...nextCoreWebVitals,
	...nextTypescript,
	{
		ignores: ["convex/_generated/**", "cloudflare-env.d.ts", ".open-next/**", "bundled/**"],
	},
];

export default eslintConfig;
