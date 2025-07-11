"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { MessageCircle } from "lucide-react";

export default function SignUpPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
			<SignUp.Root>
				<SignUp.Step
					name="start"
					className="w-full max-w-sm mx-auto bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 space-y-6"
				>
					<header className="text-center">
						<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
							<MessageCircle className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-2xl font-bold text-white tracking-tight">
							Sign up for Michat
						</h1>
						<p className="text-gray-400 text-sm mt-2">
							Create your account to get started
						</p>
					</header>

					<Clerk.GlobalError className="block text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800" />

					<div className="space-y-4">
						<Clerk.Connection
							name="google"
							className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-[0.98]"
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Continue with Google
						</Clerk.Connection>
					</div>

					<p className="text-center text-sm text-gray-400">
						Already have an account?{" "}
						<Clerk.Link
							navigate="sign-in"
							className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none focus:underline transition-colors"
						>
							Sign in
						</Clerk.Link>
					</p>
				</SignUp.Step>

				<SignUp.Step
					name="continue"
					className="w-full max-w-sm mx-auto bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8 space-y-6"
				>
					<header className="text-center">
						<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
							<MessageCircle className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-2xl font-bold text-white tracking-tight">
							Complete your profile
						</h1>
						<p className="text-gray-400 text-sm mt-2">
							Tell us a bit about yourself
						</p>
					</header>

					<Clerk.GlobalError className="block text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800" />

					<div className="space-y-4">
						<Clerk.Field name="username" className="space-y-2">
							<Clerk.Label className="text-sm font-medium text-gray-300">
								Username
							</Clerk.Label>
							<Clerk.Input
								type="text"
								required
								className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
								placeholder="Choose a username"
							/>
							<Clerk.FieldError className="text-xs text-red-400" />
						</Clerk.Field>

						<SignUp.Action
							submit
							className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-[0.98] text-sm"
						>
							Complete Profile
						</SignUp.Action>
					</div>
				</SignUp.Step>
			</SignUp.Root>
		</div>
	);
}
