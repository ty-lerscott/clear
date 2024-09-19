import type { User } from "@repo/types/user";
import routeGuard from "@/utils/route-guard";
import type { Conductor } from "@repo/types/api";
import StatusCodes from "@repo/config/src/status-codes";
import UserOrchestrator from "@/src/orchestrators/user";

const AuthConductor = async ({ req, res, next }: Conductor) => {
	const {
		method,
		extendedPath: [route],
	} = req;

	console.log("auth conductor");
	console.log(req.body);

	if (method !== "POST") {
		res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
			error: "Method Not Allowed",
		});
	}

	switch (route) {
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
