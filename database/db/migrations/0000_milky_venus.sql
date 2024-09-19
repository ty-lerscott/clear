CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`postingId` integer NOT NULL,
	`applicationDate` text,
	`outcome` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`postingId`) REFERENCES `postings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`website` text NOT NULL,
	`location` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `postings` (
	`id` text PRIMARY KEY NOT NULL,
	`companyId` text NOT NULL,
	`title` text NOT NULL,
	`salary` text,
	`mainContact` text,
	`description` text NOT NULL,
	`job_board` text NOT NULL,
	`status` text,
	FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `statusHistory` (
	`id` text PRIMARY KEY NOT NULL,
	`applicationId` integer NOT NULL,
	`status` text NOT NULL,
	`modificationDate` text NOT NULL,
	`notes` text,
	FOREIGN KEY (`applicationId`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`emailAddress` text
);
