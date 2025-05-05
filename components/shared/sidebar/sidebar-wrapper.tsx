import type React from "react";

type Props = React.PropsWithChildren;

const SidebarWrapper = ({ children }: Props) => (
	<div className="h-full w-full overflow-hidden">
		<main className="h-full w-full flex">{children}</main>
	</div>
);

export default SidebarWrapper;
