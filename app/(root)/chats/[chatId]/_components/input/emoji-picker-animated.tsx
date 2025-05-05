"use client";

import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker, { type Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { useRef, useEffect } from "react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onEmojiSelect: (emoji: string) => void;
};

const AnimatedEmojiPicker = ({ isOpen, onClose, onEmojiSelect }: Props) => {
	const { theme } = useTheme();
	const pickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={pickerRef}
					className="absolute bottom-16 right-3 z-50"
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ type: "spring", damping: 20, stiffness: 300 }}
				>
					<EmojiPicker
						theme={theme as Theme}
						onEmojiClick={(emojiData) => {
							onEmojiSelect(emojiData.emoji);
							onClose();
						}}
						lazyLoadEmojis
						height={350}
						width={300}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AnimatedEmojiPicker;
