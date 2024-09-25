import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

// Users Table
export const Users = sqliteTable("users", {
	id: text("id").primaryKey().$defaultFn(createId),
});

// Companies Table
export const Companies = sqliteTable("companies", {
	id: text("id").primaryKey().$defaultFn(createId),
	name: text("name").notNull(),
	website: text("website"),
	location: text("location"),
});

// JobPostings Table
export const JobPostings = sqliteTable("postings", {
	id: text("id").primaryKey().$defaultFn(createId),
	companyId: text("companyId")
		.references(() => Companies.id, { onDelete: "cascade" })
		.notNull(),
	title: text("title").notNull(),
	salary: text("salary", { mode: "json" }).$type<{
		min: number;
		max: number;
		currency: string;
	}>(),
	description: text("description"),
	jobBoard: text("jobBoard", { mode: "json" }).$type<{
		name: string;
		url?: string;
	}>(),
	status: text("status"),
	userId: text("userId")
		.references(() => Users.id, { onDelete: "cascade" })
		.notNull(),
});

// StatusHistory Table
export const StatusHistory = sqliteTable("statusHistory", {
	id: text("id").primaryKey().$defaultFn(createId),
	postingId: text("postingId")
		.references(() => JobPostings.id, { onDelete: "cascade" })
		.notNull(),
	status: text("status", {
		enum: [
			"ready",
			"applied",
			"interviewing",
			"negotiating",
			"got-the-job",
			"no-answer",
			"rejected",
			"withdrew",
		],
	}).notNull(),
	date: text("date").notNull(),
	notes: text("notes"),
});
