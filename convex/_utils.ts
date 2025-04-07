import { MutationCtx, QueryCtx } from "./_generated/server";
type Props = {
	ctx: QueryCtx | MutationCtx;
	clerkId: string;
};
export const getUserByClerkId = async ({ ctx, clerkId }: Props) => {
	return ctx.db
		.query("users")
		.withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
		.unique();
};
