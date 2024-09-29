import type { JobPosting } from "@repo/types/job-posting";
import routeGuard from "@/utils/route-guard";
import type { Conductor } from "@repo/types/api";
import { METHOD_NOT_ALLOWED } from "@repo/config/src/status-codes";
import JobPostingsOrchestrator from "@/src/instrumentation/job-postings";

const JobPostingsConductor = async ({ req, res, next }: Conductor) => {
	const {
		extendedPath: [route],
	} = req;
	switch (route) {
		case "add": {
			const { data, error, status } = await routeGuard<JobPosting>(
				//@ts-ignore - TODO: assign the proper types to the request
				req,
				JobPostingsOrchestrator.addPosting,
			);

			res.status(status).json(data || error);
			break;
		}
		case "delete": {
			if (req.method !== "DELETE") {
				return res
					.status(METHOD_NOT_ALLOWED)
					.json({ error: "Method not allowed" });
			}

			const { data, error, status } = await routeGuard<JobPosting>(
				//@ts-ignore - TODO: assign the proper types to the request
				req,
				JobPostingsOrchestrator.deletePosting,
			);

			res.status(status).json(data || error);
			break;
		}
		default: {
			const { data, error, status } = await routeGuard<JobPosting>(
				//@ts-ignore - TODO: assign the proper types to the request
				req,
				JobPostingsOrchestrator.fetchPostings,
			);

			res.status(status).json(data || error);
			break;
		}
	}

	next();
};

export default JobPostingsConductor;
