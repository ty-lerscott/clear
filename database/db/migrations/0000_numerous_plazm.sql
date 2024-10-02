CREATE TABLE `company` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text,
	`location` text
);
--> statement-breakpoint
CREATE TABLE `posting` (
	`id` text PRIMARY KEY NOT NULL,
	`companyId` text NOT NULL,
	`title` text NOT NULL,
	`salary` text,
	`description` text,
	`jobBoard` text,
	`status` text NOT NULL,
	`lastModified` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`companyId`) REFERENCES `company`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `statusHistory` (
	`id` text PRIMARY KEY NOT NULL,
	`postingId` text NOT NULL,
	`status` text NOT NULL,
	`date` text NOT NULL,
	`notes` text,
	FOREIGN KEY (`postingId`) REFERENCES `posting`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL
);
