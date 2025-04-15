"use client";
import { useEffect, useState } from "react";

export const useContentTypes = (urls: string[]) => {
	const [types, setTypes] = useState<Record<string, string>>({});

	useEffect(() => {
		const fetchTypes = async () => {
			const entries = await Promise.all(
				urls.map(async (url) => {
					try {
						const res = await fetch(url, { method: "HEAD" });
						const type = res.headers.get("Content-Type") ?? "";
						return [url, type];
					} catch {
						return [url, ""];
					}
				})
			);
			setTypes(Object.fromEntries(entries));
		};

		fetchTypes();
	}, [urls]);

	return types;
};
