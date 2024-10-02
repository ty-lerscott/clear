import { createId } from "@paralleldrive/cuid2";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

// User Table
export const User = sqliteTable("user", {
	id: text("id").primaryKey().$defaultFn(createId),
});

// Company Table
export const Company = sqliteTable("company", {
	id: text("id").primaryKey().$defaultFn(createId),
	name: text("name").notNull(),
	url: text("url"),
	location: text("location"),
});

// Job Posting Table
export const JobPosting = sqliteTable("posting", {
	id: text("id").primaryKey().$defaultFn(createId),
	companyId: text("companyId")
		.references(() => Company.id, { onDelete: "cascade" })
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
	status: text("status").notNull(),
	lastModified: text("lastModified").notNull(),
	userId: text("userId")
		.references(() => User.id, { onDelete: "cascade" })
		.notNull(),
});

// Status History Table
export const StatusHistory = sqliteTable("statusHistory", {
	id: text("id").primaryKey().$defaultFn(createId),
	postingId: text("postingId")
		.references(() => JobPosting.id, { onDelete: "cascade" })
		.notNull(),
	status: text("status").notNull(),
	date: text("date").notNull(),
	notes: text("notes"),
});
