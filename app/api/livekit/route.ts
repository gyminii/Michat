import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Do not cache endpoint result
export const revalidate = 0;

export async function GET(req: NextRequest) {
	const room = req.nextUrl.searchParams.get("room");
	if (!room) {
		return NextResponse.json(
			{ error: 'Missing "room" query parameter' },
			{ status: 400 }
		);
	}

	const { userId, getToken } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	// `api.chat.get` throws unless the caller is a member of the chat.
	try {
		const chat = await fetchQuery(
			api.chat.get,
			{ id: room as Id<"chats"> },
			{ token: (await getToken({ template: "convex" })) ?? undefined }
		);
		if (!chat) throw new Error("Chat not found");
	} catch {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const apiKey = process.env.LIVEKIT_API_KEY;
	const apiSecret = process.env.LIVEKIT_API_SECRET;
	const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
	if (!apiKey || !apiSecret || !wsUrl) {
		return NextResponse.json(
			{ error: "Server misconfigured" },
			{ status: 500 }
		);
	}

	const user = await currentUser();

	const at = new AccessToken(apiKey, apiSecret, {
		identity: userId,
		name: user?.fullName ?? undefined,
	});
	at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

	return NextResponse.json(
		{ token: await at.toJwt() },
		{ headers: { "Cache-Control": "no-store" } }
	);
}
