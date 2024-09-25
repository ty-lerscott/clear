import { eq, inArray } from "drizzle-orm";

import omit from "object.omit";
import merge from "lodash.mergewith";
import type { Response } from "@repo/types/api";
import dbClient from "@repo/database/src/client";
import { tables } from "@repo/database/src/schemas";
import type { JobPosting } from "@repo/types/job-posting";
import { SERVER_ERROR } from "@repo/config/src/status-codes";

const jobPostingsOrchestrator = {
	fetchPostings: async (userId: string): Promise<Response<JobPosting[]>> => {
		try {
			const postings = await dbClient
				.select()
				.from(tables.JobPostings)
				.where(eq(tables.JobPostings.userId, userId))
				.execute();

			const companies = await dbClient
				.select()
				.from(tables.Companies)
				.where(
					inArray(
						tables.Companies.id,
						postings.map(({ companyId }) => companyId),
					),
				);

			const jobPostings = postings.map((posting) => {
				return merge({}, omit(posting, ["companyId", "userId"]), {
					company: omit(
						companies.find(
							(company) => company.id === posting.companyId,
						) as Record<string, unknown>,
						["id"],
					),
				});
			}) as JobPosting[];

			return {
				data: jobPostings,
				status: 200,
			};
		} catch (err) {
			return Promise.resolve({
				error: (err as Error).message,
				status: SERVER_ERROR,
			});
		}
	},
};

export default jobPostingsOrchestrator;
