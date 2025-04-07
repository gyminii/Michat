"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { use, useState } from "react";
import RemoveFriendDialog from "../../friends/_components/remove-friend-dialog";
import Body from "./_components/body/body";
import DeleteGroupDialog from "./_components/dialogs/delete-group-dialog";
import LeaveGroupDialog from "./_components/dialogs/leave-group-dialog";
import Header from "./_components/header";
import ChatInput from "./_components/input/chat-input";
const ChatPage = ({ params }: { params: Promise<{ chatId: Id<"chats"> }> }) => {
	const { chatId } = use(params);
	const { isMobile } = useSidebar();
	const chat = useQuery(api.chat.get, {
		id: chatId,
	});
	const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
	const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
	const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
	const [callType, setCallType] = useState<"audio" | "video" | null>(null);

	const header = () => (
		<Header
			imageUrl={chat?.isGroup ? undefined : chat?.otherMember?.imageUrl}
			name={(chat?.isGroup ? chat?.name : chat?.otherMember?.username) || ""}
			options={
				chat?.isGroup
					? [
							{
								label: "Leave group",
								destructive: false,
								onClick: () => setLeaveGroupDialogOpen(true),
							},
							{
								label: "Delete group",
								destructive: true,
								onClick: () => setDeleteGroupDialogOpen(true),
							},
						]
					: [
							{
								label: "Remove friend",
								destructive: true,
								onClick: () => setRemoveFriendDialogOpen(true),
							},
						]
			}
		/>
	);
	const chatBody = () => (
		<>
			<Body
				members={
					chat?.isGroup
						? chat?.otherMembers
							? chat?.otherMembers
							: []
						: chat?.otherMember
							? [chat?.otherMember]
							: []
				}
			/>
			<ChatInput />
		</>
	);
	return isMobile ? (
		<Dialog open={chat && isMobile}>
			<DialogContent className="rounded-none [&>button]:hidden h-screen min-w-full p-0 flex flex-col">
				{header()}
				<Separator orientation="horizontal" />
				{chatBody()}
			</DialogContent>
		</Dialog>
	) : (
		<ResizablePanel
			defaultSize={80}
			className="hidden md:block"
			id="chat-list-panel"
		>
			<RemoveFriendDialog
				chatId={chatId}
				open={removeFriendDialogOpen}
				setOpen={setRemoveFriendDialogOpen}
			/>
			<DeleteGroupDialog
				chatId={chatId}
				open={deleteGroupDialogOpen}
				setOpen={setDeleteGroupDialogOpen}
			/>
			<LeaveGroupDialog
				chatId={chatId}
				open={leaveGroupDialogOpen}
				setOpen={setLeaveGroupDialogOpen}
			/>
			<ResizablePanelGroup direction="vertical" className="flex-0">
				<ResizablePanel className="p-0" id="header-panel">
					{header()}
				</ResizablePanel>
				<ResizablePanel defaultSize={90} className="flex flex-col">
					{chatBody()}
				</ResizablePanel>
			</ResizablePanelGroup>
		</ResizablePanel>
	);
};

export default ChatPage;
