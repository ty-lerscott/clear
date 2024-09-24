import env from "@/utils/env";
import type { User } from "@repo/types/user";
import routeGuard from "@/utils/route-guard";
import type { Conductor } from "@repo/types/api";
import StatusCodes from "@repo/config/src/status-codes";
import UserOrchestrator from "@/src/orchestrators/user";

/**
 * @description Handles webhooks from clerk authentication service.
 */
const AuthConductor = async ({ req, res, next }: Conductor) => {
	const {
		method,
		extendedPath: [route],
	} = req;

	if (method !== "POST") {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
			error: "Method Not Allowed",
		});
	}

	if (req.headers["x-token"] !== env.CLERK_WEBHOOK_SECRET) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			error: "Unauthorized",
		});
	}

	switch (req.body.type) {
		case "user.created": {
			const { data, error, status } = await UserOrchestrator.createUser(
				req.body.data.id,
			);

			res.status(status).json({ data, error });
			break;
		}
		case "user.deleted": {
			const { data, error, status } = await UserOrchestrator.deleteUser(
				req.body.data.id,
			);

			res.status(status).json({ data, error });
			break;
		}
		default: {
			const { data, error, status } = await Promise.resolve({
				data: "hello",
				error: "world",
				status: 200,
			});

			res.status(status).json({ data, error });
		}
	}

	next();
};

export default AuthConductor;
