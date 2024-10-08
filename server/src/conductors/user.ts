import type { User } from "@repo/types/user";
import routeGuard from "@/utils/route-guard";
import type { Conductor } from "@repo/types/api";
import UserOrchestrator from "@/src/instrumentation/user";

const UserConductor = async ({ req, res, next }: Conductor) => {
	const {
		extendedPath: [route],
	} = req;

	switch (route) {
		case "update": {
			const { error, status } = await routeGuard<User>(
				req,
				UserOrchestrator.updateUser,
			);
			res.status(status).json(error);
			break;
		}
		default: {
			const { data, error, status } = await routeGuard<User>(
				req,
				UserOrchestrator.fetchUser,
			);

			res.status(status).json(data || error);
		}
	}

	next();
};

export default UserConductor;
