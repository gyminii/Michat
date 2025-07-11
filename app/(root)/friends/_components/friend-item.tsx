"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircle, MoreHorizontal, User } from "lucide-react";
import Link from "next/link";

type Props = {
	id: string;
	imageUrl: string;
	username: string;
	email: string;
};

const FriendItem = ({ id, imageUrl, username, email }: Props) => {
	// const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<div className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 cursor-pointer">
				<div className="flex items-center gap-3">
					<Avatar className="h-10 w-10">
						<AvatarImage src={imageUrl || "/placeholder.svg"} />
						<AvatarFallback className="bg-blue-600 text-white">
							{username?.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<p className="text-sm font-medium text-gray-900 dark:text-gray-100">
							{username}
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem asChild>
							<Link href={`/friends/${id}`} className="flex items-center gap-2">
								<User className="h-4 w-4" />
								View Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-2">
							<MessageCircle className="h-4 w-4" />
							Send Message
						</DropdownMenuItem>
						{/* <DropdownMenuItem
							className="flex items-center gap-2 text-red-600 dark:text-red-400"
							onClick={() => setDialogOpen(true)}
						>
							<UserMinus className="h-4 w-4" />
							Remove Friend
						</DropdownMenuItem> */}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{/* <RemoveFriendDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				friendId={id}
				friendUsername={username}
			/> */}
		</>
	);
};

export default FriendItem;
