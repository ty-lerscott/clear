import env from "@/utils/env";
import type { Request } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import StatusCodes from "@repo/config/src/status-codes";
import type { Request as CustomRequest, Response } from "@repo/types/api";

const IS_LOCAL = env.NODE_ENV !== "production";

// TODO: This guard should take methods into account.
const guardRoute = async <
	T extends Record<string, unknown> | Record<string, unknown>[],
>(
	req: CustomRequest,
	cb: (
		userId: string,
		body: Record<string, unknown>,
	) => Promise<Response<T> | Response>,
): Promise<Response<T> | Response> => {
	const userId = req.headers["x-user-id"] as string | undefined;
	const token = req.headers.authorization as string | undefined;

	if (!userId || !token) {
		return Promise.resolve({
			error: !token ? "No token provided." : "No userId provided.",
			status: StatusCodes.UNAUTHORIZED,
		});
	}

	const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
	req.url = fullUrl;

	try {
		//@ts-ignore - assign the proper types to the request
		const decodedToken = await clerkClient.authenticateRequest(req as Request, {
			domain: `https://clear.lerscott.${IS_LOCAL ? "local" : "com"}`,
			secretKey: env.CLERK_SECRET_KEY,
			publishableKey: env.CLERK_PUBLISHABLE_KEY,
		});

		if (decodedToken?.status !== "signed-in") {
			return Promise.resolve({
				error: "No user found.",
				status: StatusCodes.BAD_REQUEST,
			});
		}

		return await cb(userId, req?.body);
	} catch (err) {
		return {
			error: (err as Error).message,
			status: StatusCodes.SERVER_ERROR,
		};
	}
};

export default guardRoute;
