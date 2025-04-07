"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChat } from "@/hooks/use-chat";
import { useNavigation } from "@/hooks/use-navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const MobileNav = () => {
	const paths = useNavigation();
	const { isActive } = useChat();
	if (isActive) return null;
	return (
		<Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
			<nav className="w-full">
				<ul className="flex justify-evenly items-center">
					{paths.map(({ href, active, icon, name, count }, index) => (
						<li className="relative" key={index}>
							<Link href={href}>
								<Tooltip>
									<TooltipTrigger>
										<Button
											size="icon"
											variant={active ? "default" : "outline"}
										>
											{icon}
										</Button>
										{count ? (
											<Badge className="absolute left-7 bottom-6">
												{count}
											</Badge>
										) : null}
									</TooltipTrigger>
									<TooltipContent>
										<p>{name}</p>
									</TooltipContent>
								</Tooltip>
							</Link>
						</li>
					))}
					<li>
						<ThemeToggle />
					</li>
					<li>
						<UserButton />
					</li>
				</ul>
			</nav>
		</Card>
	);
};

export default MobileNav;
