import omit from "object.omit";
import merge from "lodash.mergewith";
import { eq, desc } from "drizzle-orm";

import type { Response } from "@repo/types/api";
import dbClient from "@repo/database/src/client";
import { tables } from "@repo/database/src/schemas";
import { SERVER_ERROR, OK } from "@repo/config/src/status-codes";
import type {
	Company,
	JobPosting,
	RequiredJobPosting,
} from "@repo/types/job-posting";

const jobPostingsOrchestrator = {
	fetchPostings: async (
		userId: string,
		body: JobPosting,
	): Promise<Response<JobPosting[]>> => {
		try {
			const postings = await dbClient
				.select()
				.from(tables.JobPosting)
				.fullJoin(
					tables.Company,
					eq(tables.JobPosting.companyId, tables.Company.id),
				)
				.where(eq(tables.JobPosting.userId, userId))
				.orderBy(desc(tables.JobPosting.lastModified))
				.execute();

			const newPostings = postings.map(({ posting, company }) => {
				return {
					...posting,
					company,
				};
			}) as JobPosting[];

			return {
				data: newPostings,
				status: 200,
			};
		} catch (err) {
			return Promise.resolve({
				error: (err as Error).message,
				status: SERVER_ERROR,
			});
		}
	},
	fetchPosting: async (
		userId: string,
		body: JobPosting,
	): Promise<Response<JobPosting>> => {
		const id = body.id as string;

		try {
			const [{ posting, company }] = await dbClient
				.select()
				.from(tables.JobPosting)
				.fullJoin(
					tables.Company,
					eq(tables.JobPosting.companyId, tables.Company.id),
				)
				.where(eq(tables.JobPosting.id, id))
				.execute();

			const mergedPosting = merge({}, posting, {
				company: company,
				description: posting?.description || "",
				hasDescription: !!posting?.description,
			}) as JobPosting;

			return {
				data: mergedPosting,
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

			const tempPosting = merge({}, omit(posting, ["company"]), {
				jobBoard: {
					name: hostname,
				},
				status: posting.status || "ready",
			});

			const newPosting = omit(tempPosting, [
				tempPosting.salary.min === 0 && tempPosting.salary.max === 0
					? "salary"
					: "",
				!tempPosting.description.length ? "description" : "",
			]) as RequiredJobPosting;

			const company = await dbClient
				.select()
				.from(tables.Company)
				.where(eq(tables.Company.name, (posting.company as Company).name))
				.execute();

			let companyId = "";

			if (!company.length) {
				console.log("company not found, creating new");
				const [company] = await dbClient
					.insert(tables.Company)
					.values(posting.company as Company)
					.returning({ id: tables.Company.id })
					.execute();

				companyId = company.id;
			} else {
				companyId = company[0].id;
			}

			const updatingValues = {
				...newPosting,
				userId,
				companyId,
			};

			const [addedPosting] = await dbClient
				.insert(tables.JobPosting)
				.values(updatingValues)
				.onConflictDoUpdate({
					target: tables.JobPosting.id,
					set: updatingValues,
				})
				.returning({ id: tables.JobPosting.id })
				.execute();

			await dbClient.insert(tables.StatusHistory).values({
				postingId: addedPosting.id,
				date: posting.lastModified as string,
				status: newPosting.status,
			});

			return {
				status: OK,
				data: {
					...newPosting,
					...addedPosting,
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
		body: JobPosting,
	): Promise<Response> => {
		try {
			await dbClient
				.delete(tables.JobPosting)
				.where(eq(tables.JobPosting.id, body.id as string))
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
