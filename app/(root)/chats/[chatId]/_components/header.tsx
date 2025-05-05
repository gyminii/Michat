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
};

const Header = ({ imageUrl, name, options, setCallType }: Props) => {
	const router = useRouter();

	const handleBackClick = () => {
		router.push("/chats");
	};

	return (
		<div className="w-full flex items-center justify-between p-4 bg-background border-b">
			<div className="flex items-center gap-3">
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={handleBackClick}
				>
					<ChevronLeft className="h-5 w-5" />
				</Button>
				<Avatar className="w-10 h-10">
					<AvatarImage src={imageUrl || "/placeholder.svg"} />
					<AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<h2 className="font-semibold text-base">{name}</h2>
					{/* <span className="text-xs text-muted-foreground">
					</span> */}
				</div>
			</div>
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCallType("audio")}
					className="h-9 w-9"
				>
					<Phone className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setCallType("video")}
					className="h-9 w-9"
				>
					<Video className="h-4 w-4" />
				</Button>
				{options ? (
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
				) : null}
			</div>
		</div>
	);
};

export default Header;
