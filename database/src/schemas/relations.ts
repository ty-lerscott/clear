import { relations } from "drizzle-orm";
import {
	Applications,
	Companies,
	JobPostings,
	StatusHistory,
	Users,
} from "./tables";

export const companiesRelations = relations(Companies, ({ many }) => ({
	jobPostings: many(JobPostings),
}));

export const jobPostingsRelations = relations(JobPostings, ({ one, many }) => ({
	company: one(Companies, {
		fields: [JobPostings.companyId],
		references: [Companies.id],
	}),
	applications: many(Applications),
}));

export const applicationsRelations = relations(
	Applications,
	({ one, many }) => ({
		jobPosting: one(JobPostings, {
			fields: [Applications.postingId],
			references: [JobPostings.id],
		}),
		user: one(Users, {
			fields: [Applications.userId],
			references: [Users.id],
		}),
		statusHistory: many(StatusHistory),
	}),
);

export const statusHistoryRelations = relations(StatusHistory, ({ one }) => ({
	application: one(Applications, {
		fields: [StatusHistory.applicationId],
		references: [Applications.id],
	}),
}));
