import type { Conductor, Request } from "@repo/types/api";
import type { NextFunction, Response } from "express";

const Conductors = async (req: Request, res: Response, next: NextFunction) => {
	const [basePath, ...extendedPath] = req.originalUrl
		.split("?")[0]
		.replace(/^\//, "")
		.split("/");

	const newReq = req;
	newReq.extendedPath = extendedPath;

	const props: Conductor = {
		res,
		next,
		req: newReq,
	};

	switch (basePath) {
		// case "download":
		// 	await DownloadConductor(props);
		// 	break;
		// case "image":
		// 	await ImageConductor(props);
		// 	break;
		// case "github":
		// 	await GithubConductor(props);
		// 	break;
		// case "resume":
		// 	await ResumeConductor(props);
		// 	break;
		// case "resumes":
		// 	await ResumesConductor(props);
		// 	break;
		default:
			res.send("HELLO WORLD");
			break;
	}

	next();
};

export default Conductors;
