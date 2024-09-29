import { relations } from "drizzle-orm";
import { Companies, JobPostings, StatusHistory, Users } from "./tables";

export const companiesRelations = relations(Companies, ({ many }) => ({
	jobPostings: many(JobPostings),
}));

export const usersRelations = relations(Users, ({ many }) => ({
	jobPostings: many(JobPostings),
}));

export const jobPostingsRelations = relations(JobPostings, ({ one, many }) => ({
	company: one(Companies, {
		fields: [JobPostings.companyId],
		references: [Companies.id],
	}),
	user: one(Users, {
		fields: [JobPostings.userId],
		references: [Users.id],
	}),
	statusHistory: many(StatusHistory),
}));

export const statusHistoryRelations = relations(StatusHistory, ({ one }) => ({
	jobPosting: one(JobPostings, {
		fields: [StatusHistory.postingId],
		references: [JobPostings.id],
	}),
}));
