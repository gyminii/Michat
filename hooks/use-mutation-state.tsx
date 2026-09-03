import { useMutation } from "convex/react";
import type { FunctionArgs, FunctionReference } from "convex/server";
import { useState } from "react";

export const useMutationState = <Mutation extends FunctionReference<"mutation">>(
	mutationToRun: Mutation
) => {
	const [pending, setPending] = useState(false);
	const mutationFn = useMutation(mutationToRun);
	const mutate = async (payload: FunctionArgs<Mutation>) => {
		setPending(true);
		return await mutationFn(payload)
			.then((res) => res)
			.catch((error) => {
				throw error;
			})
			.finally(() => setPending(false));
	};
	return { mutate, pending };
};
