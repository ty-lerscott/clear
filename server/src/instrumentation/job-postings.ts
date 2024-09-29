import { eq, desc } from "drizzle-orm";

import omit from "object.omit";
import merge from "lodash.mergewith";
import inArray from "@/utils/drizzle-in-array";
import type { Response } from "@repo/types/api";
import dbClient from "@repo/database/src/client";
import { tables } from "@repo/database/src/schemas";
import type {
	Company,
	JobPosting,
	RequiredJobPosting,
} from "@repo/types/job-posting";
import { SERVER_ERROR, OK } from "@repo/config/src/status-codes";

const jobPostingsOrchestrator = {
	fetchPostings: async (userId: string): Promise<Response<JobPosting[]>> => {
		try {
			const postings = await dbClient
				.select()
				.from(tables.JobPostings)
				.where(eq(tables.JobPostings.userId, userId))
				.execute();

			const [statuses, companies] = await Promise.all([
				dbClient
					.select()
					.from(tables.StatusHistory)
					.where(
						inArray(
							tables.StatusHistory.postingId,
							postings.map(({ id }) => id),
						),
					)
					.orderBy(desc(tables.StatusHistory.date))
					.execute(),
				dbClient
					.select()
					.from(tables.Companies)
					.where(
						inArray(
							tables.Companies.id,
							postings.map(({ companyId }) => companyId),
						),
					)
					.execute(),
			]);

			const jobPostings = postings.map((posting) => {
				return merge({}, omit(posting, ["companyId", "userId"]), {
					company: omit(
						companies.find(
							(company) => company.id === posting.companyId,
						) as Record<string, unknown>,
						["id"],
					),
					...omit(
						statuses.find(
							(status) => status.postingId === posting.id,
						) as Record<string, unknown>,
						["postingId", "notes", "id"],
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
	addPosting: async (
		userId: string,
		posting: JobPosting,
	): Promise<Response<JobPosting>> => {
		try {
			const hostname = posting.jobBoard?.url
				? new URL(posting.jobBoard.url).hostname
						.replace(/^www\./, "")
						.split(".")[0]
				: "";

			const tempPosting = merge({}, omit(posting, ["company", "date"]), {
				jobBoard: {
					name: hostname,
				},
			});

			const newPosting = omit(tempPosting, [
				tempPosting.salary.min === 0 && tempPosting.salary.max === 0
					? "salary"
					: "",
				!tempPosting.description.length ? "description" : "",
			]) as RequiredJobPosting;

			const company = await dbClient
				.select()
				.from(tables.Companies)
				.where(eq(tables.Companies.name, (posting.company as Company).name))
				.execute();

			let companyId = "";

			if (!company.length) {
				console.log("company not found, creating new");
				const [company] = await dbClient
					.insert(tables.Companies)
					.values(posting.company as Company)
					.returning({ id: tables.Companies.id })
					.execute();

				companyId = company.id;
			} else {
				companyId = company[0].id;
			}

			const [addedPosting] = await dbClient
				.insert(tables.JobPostings)
				.values({ ...newPosting, userId, companyId })
				.returning({ id: tables.JobPostings.id })
				.execute();

			const [status] = await dbClient
				.insert(tables.StatusHistory)
				.values({
					status: "ready",
					postingId: addedPosting.id,
					date: posting.date as string,
				})
				.returning();

			return {
				status: OK,
				data: {
					...addedPosting,
					...omit(status, ["id", "postingId"]),
					...newPosting,
				},
			};
		} catch (err) {
			return Promise.resolve({
				error: (err as Error).message,
				status: SERVER_ERROR,
			});
		}
	},
	deletePosting: async (
		userId: string,
		body: { id: string },
	): Promise<Response> => {
		try {
			await dbClient
				.delete(tables.JobPostings)
				.where(eq(tables.JobPostings.id, body.id))
				.execute();

			return {
				status: OK,
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
