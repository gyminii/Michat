"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, Phone, Settings, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

type Props = {
	imageUrl?: string;
	name: string;
	options?: {
		label: string;
		destructive: boolean;
		onClick: () => void;
	}[];
	setCallType: Dispatch<SetStateAction<"audio" | "video" | null>>;
	isGroup?: boolean;
};

const AnimatedHeader = ({ imageUrl, name, options, setCallType }: Props) => {
	const router = useRouter();

	const handleBackClick = () => {
		router.push("/chats");
	};

	return (
		<motion.div
			className="w-full flex items-center justify-between p-4 bg-background border-b"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				type: "spring",
				stiffness: 260,
				damping: 20,
			}}
		>
			<div className="flex items-center gap-3">
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={handleBackClick}
					>
						<ChevronLeft className="h-5 w-5" />
					</Button>
				</motion.div>
				<motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
					<Avatar className="w-10 h-10">
						<AvatarImage src={imageUrl || "/placeholder.svg"} />
						<AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
					</Avatar>
				</motion.div>
				<div className="flex flex-col">
					<motion.h2
						className="font-semibold text-base"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.1 }}
					>
						{name}
					</motion.h2>
					{/* <motion.span
						className="text-xs text-muted-foreground"
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
					>
						{isGroup && "Group"}
					</motion.span> */}
				</div>
			</div>
			<div className="flex gap-2">
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setCallType("audio")}
						className="h-9 w-9"
					>
						<Phone className="h-4 w-4" />
					</Button>
				</motion.div>
				<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setCallType("video")}
						className="h-9 w-9"
					>
						<Video className="h-4 w-4" />
					</Button>
				</motion.div>
				{options ? (
					<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" variant="outline" className="h-9 w-9">
									<Settings className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{options.map((option, id) => (
									<DropdownMenuItem
										key={id}
										onClick={option.onClick}
										className={cn("font-medium", {
											"text-destructive": option.destructive,
										})}
									>
										{option.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</motion.div>
				) : null}
			</div>
		</motion.div>
	);
};

export default AnimatedHeader;
