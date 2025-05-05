"use client";

import { motion } from "framer-motion";

const TypingIndicator = () => {
	return (
		<div className="flex items-end gap-2 mb-4">
			<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
				<span className="text-xs">...</span>
			</div>
			<motion.div
				className="bg-secondary text-secondary-foreground px-4 py-2 rounded-2xl rounded-bl-md shadow-sm max-w-[75%]"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<div className="flex space-x-1 items-center h-6">
					<motion.div
						className="w-2 h-2 rounded-full bg-current opacity-60"
						animate={{ y: [0, -5, 0] }}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 1,
							delay: 0,
						}}
					/>
					<motion.div
						className="w-2 h-2 rounded-full bg-current opacity-60"
						animate={{ y: [0, -5, 0] }}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 1,
							delay: 0.2,
						}}
					/>
					<motion.div
						className="w-2 h-2 rounded-full bg-current opacity-60"
						animate={{ y: [0, -5, 0] }}
						transition={{
							repeat: Number.POSITIVE_INFINITY,
							duration: 1,
							delay: 0.4,
						}}
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default TypingIndicator;
