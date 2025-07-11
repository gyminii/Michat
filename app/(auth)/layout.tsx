import type React from "react";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
