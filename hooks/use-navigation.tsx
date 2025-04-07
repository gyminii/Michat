import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
	const pathname = usePathname();
	const requestscount = useQuery(api.requests.count);
	const chats = useQuery(api.chats.get);

	const unseenMessagesCount = useMemo(
		() =>
			chats?.reduce((acc, curr) => {
				return acc + curr.unseenCount;
			}, 0),
		[chats]
	);
	const paths = useMemo(
		() => [
			{
				name: "Chat",
				href: "/chats",
				icon: MessageSquare,
				// icon: <MessageSquare className="size-3.5 shrink-0"/>,
				active: pathname.startsWith("/chats"),
				count: unseenMessagesCount,
			},
			{
				name: "Friends",
				href: "/friends",
				icon: Users,
				// icon: <Users className="size-3.5 shrink-0"/>,
				active: pathname === "/friends",
				count: requestscount,
			},
		],
		[pathname, requestscount, unseenMessagesCount]
	);
	return paths;
};
