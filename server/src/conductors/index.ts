import UserConductor from "./user";
import AuthConductor from "./auth";
import type { NextFunction, Request, Response } from "express";
import type { Conductor, Request as CustomRequest } from "@repo/types/api";

const Conductors = async (req: Request, res: Response, next: NextFunction) => {
	const [basePath, ...extendedPath] = req.originalUrl
		.split("?")[0]
		.replace(/^\//, "")
		.split("/");

	const newReq = req as CustomRequest;
	newReq.extendedPath = extendedPath;

	const props: Conductor = {
		res,
		next,
		req: newReq,
	};

	switch (basePath) {
		case "user":
			await UserConductor(props);
			break;
		case "auth":
			await AuthConductor(props);
			break;
		default:
			res.json({
				data: "HELLO WORLD",
			});
			break;
	}

	next();
};

export default Conductors;
