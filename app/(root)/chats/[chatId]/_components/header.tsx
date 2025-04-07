import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";

type Props = {
	imageUrl?: string;
	name: string;
	options?: {
		label: string;
		destructive: boolean;
		onClick: () => void;
	}[];
};

const Header = ({ imageUrl, name, options }: Props) => (
	<div className="w-full flex items-center justify-between p-4 border-b-1">
		<div className="flex items-center gap-2">
			<Link className="block lg:hidden" href="/chats">
				<ChevronLeft />
			</Link>
			<Avatar className="w-8 h-8">
				<AvatarImage src={imageUrl} />
				<AvatarFallback>{name?.substring(0, 1)}</AvatarFallback>
			</Avatar>
			<h2 className="font-semibold">{name}</h2>
		</div>
		<div className="flex gap-2">
			{options ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button size="icon" variant="secondary">
							<Settings />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{options.map((option, id) => (
							<DropdownMenuItem
								key={id}
								onClick={option.onClick}
								className={cn("font-semibold", {
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

export default Header;
