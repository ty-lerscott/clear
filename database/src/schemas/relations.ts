import { relations } from "drizzle-orm";
import { Company, JobPosting, StatusHistory, User } from "./tables";

export const companyRelations = relations(Company, ({ many }) => ({
	jobPostings: many(JobPosting),
}));

export const usersRelations = relations(User, ({ many }) => ({
	jobPostings: many(JobPosting),
}));

export const jobPostingRelations = relations(JobPosting, ({ one, many }) => ({
	company: one(Company, {
		fields: [JobPosting.companyId],
		references: [Company.id],
	}),
	user: one(User, {
		fields: [JobPosting.userId],
		references: [User.id],
	}),
	statusHistory: many(StatusHistory),
}));

export const statusHistoryRelations = relations(StatusHistory, ({ one }) => ({
	jobPosting: one(JobPosting, {
		fields: [StatusHistory.postingId],
		references: [JobPosting.id],
	}),
}));
