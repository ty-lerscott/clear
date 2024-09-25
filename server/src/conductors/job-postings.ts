import type { JobPosting } from "@repo/types/job-posting";
import routeGuard from "@/utils/route-guard";
import type { Conductor } from "@repo/types/api";
import JobPostingsOrchestrator from "@/src/instrumentation/job-postings";

const JobPostingsConductor = async ({ req, res, next }: Conductor) => {
	const {
		extendedPath: [route],
	} = req;

	switch (route) {
		default: {
			const { data, error, status } = await routeGuard<JobPosting>(
				//@ts-ignore - TODO: assign the proper types to the request
				req,
				JobPostingsOrchestrator.fetchPostings,
			);

			res.status(status).json(data || error);
		}
	}

	next();
};

export default JobPostingsConductor;
