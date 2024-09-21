"use client";

import { Badge, type BadgeProps } from "@/ui/badge";
import { Button } from "@/ui/button";
import dayjs from "dayjs";
import type { ColumnDef } from "@tanstack/react-table";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";

export type JobPosting = {
	id: string;
	title: string;
	salary: {
		min: number;
		max: number;
		currency: string;
	};
	company: string;
	description: string;
	jobBoard: "linkedin";
	location: "in-office" | "remote" | "hybrid" | string;
	status:
		| "ready"
		| "pending"
		| "applied"
		| "interviewing"
		| "negotiating"
		| "got-the-job"
		| "no-answer"
		| "rejected"
		| "rejected-myself";
	lastModified: string;
};

const kebabToTitleCase = (str: string) =>
	str
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");

const formatSalary = (amount: number, currency: string) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	});

	return formatter.format(amount);
};

export const columns: ColumnDef<JobPosting>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => {
			const isAscending = column.getIsSorted() === "asc";
			const Icon = isAscending
				? AiOutlineSortAscending
				: AiOutlineSortDescending;

			return (
				<Button
					className="group"
					variant="bare"
					options="noPadding"
					onClick={() => column.toggleSorting(isAscending)}
				>
					Title
					<Icon className="size-5 ml-1 transition-opacity opacity-0 group-hover:opacity-80" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const value = row.original.title;

			return value ? <div className="min-w-[7.25rem]">{value}</div> : null;
		},
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => {
			const handleExpandDialog = () => {
				console.log("expanding the dialog box for this description");
			};
			return (
				<Button variant="outline" size="xs" onClick={handleExpandDialog}>
					Expand
				</Button>
			);
		},
	},
	{
		accessorKey: "jobBoard",
		header: ({ column }) => {
			const isAscending = column.getIsSorted() === "asc";
			const Icon = isAscending
				? AiOutlineSortAscending
				: AiOutlineSortDescending;

			return (
				<Button
					className="group"
					variant="bare"
					options="noPadding"
					onClick={() => column.toggleSorting(isAscending)}
				>
					Job Board
					<Icon className="size-5 ml-1 transition-opacity opacity-0 group-hover:opacity-80" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const value = row.original.jobBoard;

			return value ? <Badge variant={value}>{value}</Badge> : null;
		},
	},
	{
		accessorKey: "company",
		header: ({ column }) => {
			const isAscending = column.getIsSorted() === "asc";
			const Icon = isAscending
				? AiOutlineSortAscending
				: AiOutlineSortDescending;

			return (
				<Button
					className="group"
					variant="bare"
					options="noPadding"
					onClick={() => column.toggleSorting(isAscending)}
				>
					Company
					<Icon className="size-5 ml-1 transition-opacity opacity-0 group-hover:opacity-80" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const value = row.original.company;

			return value ? <div className="min-w-[7.25rem]">{value}</div> : null;
		},
	},
	{
		accessorKey: "location",
		header: ({ column }) => {
			const isAscending = column.getIsSorted() === "asc";
			const Icon = isAscending
				? AiOutlineSortAscending
				: AiOutlineSortDescending;

			return (
				<Button
					className="group"
					variant="bare"
					options="noPadding"
					onClick={() => column.toggleSorting(isAscending)}
				>
					Location
					<Icon className="size-5 ml-1 transition-opacity opacity-0 group-hover:opacity-80" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const value = row.original.location;
			const isSpecific = !["remote", "hybrid", "in-office"].includes(value);
			const variant = (isSpecific ? "default" : value) as BadgeProps["variant"];

			return value ? (
				<div className="min-w-[11rem]">
					<Badge variant={variant}>
						{!isSpecific ? kebabToTitleCase(value) : value}
					</Badge>
				</div>
			) : null;
		},
	},
	{
		accessorKey: "salary",
		header: "Salary",
		cell: ({ row: { original } }) => {
			const { min, max, currency } = original?.salary ?? {};

			const minSalary = min ? formatSalary(min, currency) : null;
			const maxSalary = max ? formatSalary(max, currency) : null;

			return (
				<div className="min-w-[11.5rem]">
					<span>{`${minSalary}${max ? ` - ${maxSalary}` : ""}`}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			const isAscending = column.getIsSorted() === "asc";
			const Icon = isAscending
				? AiOutlineSortAscending
				: AiOutlineSortDescending;

			return (
				<Button
					className="group"
					variant="bare"
					options="noPadding"
					onClick={() => column.toggleSorting(isAscending)}
				>
					Status
					<Icon className="size-5 ml-1 transition-opacity opacity-0 group-hover:opacity-80" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const value = row.original.status;

			return value ? (
				<div className="min-w-[7.25rem]">
					<Badge variant={value}>{kebabToTitleCase(value)}</Badge>
				</div>
			) : null;
		},
	},
	{
		accessorKey: "lastModified",
		header: "Last Modified",
		cell: ({ row }) => {
			return (
				<div className="min-w-[11.25rem]">
					{dayjs(row.original.lastModified).format("ddd MMM DD HH:mm A")}
				</div>
			);
		},
	},
];
