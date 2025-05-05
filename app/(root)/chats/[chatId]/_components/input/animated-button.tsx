"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

type Props = {
	disabled: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

const AnimatedButton = ({ disabled, onClick, type = "submit" }: Props) => {
	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<Button
				disabled={disabled}
				size="icon"
				type={type}
				onClick={onClick}
				className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-all"
			>
				<motion.div
					animate={disabled ? { rotate: 0 } : { rotate: [0, 15, 0] }}
					transition={{
						duration: 0.5,
						repeat: Number.POSITIVE_INFINITY,
						repeatDelay: 5,
					}}
				>
					<SendHorizonal className="h-5 w-5 text-primary-foreground" />
				</motion.div>
			</Button>
		</motion.div>
	);
};

export default AnimatedButton;
