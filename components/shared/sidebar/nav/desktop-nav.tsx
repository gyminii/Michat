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
import { useNavigation } from "@/hooks/use-navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const DesktopNav = () => {
	const paths = useNavigation();
	return (
		<Card className="hidden lg:flex lg:flex-col lg:items-center lg:justify-between  lg:w-16 lg:px-2 lg:py-4">
			<nav>
				<ul className="flex flex-col items-center gap-4">
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
											<Badge className="absolute left-6 bottom-7 px-2">
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
				</ul>
			</nav>
			<div className="flex flex-col items-center gap-4">
				<ThemeToggle />
				<UserButton />
			</div>
		</Card>
	);
};

export default DesktopNav;
