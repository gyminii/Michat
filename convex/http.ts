import { Webhook } from "svix";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";

const validatePayload = async (
	req: Request
): Promise<WebhookEvent | undefined> => {
	const payload = await req.text();
	const svixId = req.headers.get("svix-id");
	const svixTimestamp = req.headers.get("svix-timestamp");
	const svixSignature = req.headers.get("svix-signature");
	if (!svixId || !svixTimestamp || !svixSignature) {
		console.log("Clerk webhook request missing svix headers");
		return;
	}
	const svixHeaders = {
		"svix-id": svixId,
		"svix-timestamp": svixTimestamp,
		"svix-signature": svixSignature,
	};
	const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
	try {
		const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
		return event;
	} catch (error) {
		console.log("Clerk webhook request could not be verified: ", error);
		return;
	}
};

const handlerClerkWebhook = httpAction(async (ctx, req) => {
	const event = await validatePayload(req);
	if (!event)
		return new Response("Could not validate Clerk Payload", {
			status: 400,
		});

	switch (event.type) {
		case "user.created":
		case "user.updated": {
			console.log("Creating/Updating User: ", event.data.id);
			const emailAddress =
				event.data.email_addresses.find(
					(email) => email.id === event.data.primary_email_address_id
				) ?? event.data.email_addresses[0];
			if (!emailAddress) {
				console.log(`No email address found for user ${event.data.id}`);
				return new Response("Missing email address", { status: 400 });
			}
			const fullName = `${event.data.first_name ?? ""} ${
				event.data.last_name ?? ""
			}`.trim();
			const username =
				event.data.username || fullName || emailAddress.email_address.split("@")[0];
			await ctx.runMutation(internal.user.create, {
				username,
				imageUrl: event.data.image_url,
				clerkId: event.data.id,
				email: emailAddress.email_address,
			});
			break;
		}
		default:
			console.log("Clerk webhook event not supported", event.type);
	}
	return new Response(null, { status: 200 });
});

const http = httpRouter();

http.route({
	path: "/clerk-users-webhook",
	method: "POST",
	handler: handlerClerkWebhook,
});

export default http;
