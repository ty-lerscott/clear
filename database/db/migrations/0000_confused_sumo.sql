CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text,
	`location` text
);
--> statement-breakpoint
CREATE TABLE `postings` (
	`id` text PRIMARY KEY NOT NULL,
	`companyId` text NOT NULL,
	`title` text NOT NULL,
	`salary` text,
	`description` text,
	`jobBoard` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `statusHistory` (
	`id` text PRIMARY KEY NOT NULL,
	`postingId` text NOT NULL,
	`status` text NOT NULL,
	`date` text NOT NULL,
	`notes` text,
	FOREIGN KEY (`postingId`) REFERENCES `postings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL
);
