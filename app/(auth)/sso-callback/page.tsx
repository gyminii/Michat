"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
	return (
		<AuthenticateWithRedirectCallback
			signInUrl="/sign-in"
			signUpUrl="/sign-up"
			continueSignUpUrl="/sign-up"
		/>
	);
}
