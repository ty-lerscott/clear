"use client";

import { Badge, type BadgeProps } from "@/ui/badge";
import { Button } from "@/ui/button";
import dayjs from "dayjs";
import { kebabToTitleCase } from "@/utils";
import type { Row, Column } from "@tanstack/react-table";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";

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
		| "generating"
		| "applied"
		| "interviewing"
		| "negotiating"
		| "got-the-job"
		| "no-answer"
		| "rejected"
		| "withdrew";
	lastModified: string;
};

const formatSalary = (amount: number, currency: string) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	});

	return formatter.format(amount);
};

export const columns = [
	{
		accessorKey: "title",
		header: ({ column }: { column: Column<JobPosting, unknown> }) => {
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
		cell: ({ row }: { row: Row<JobPosting> }) => {
			const value = row.original.title;

			return value ? <div className="min-w-[7.25rem]">{value}</div> : null;
		},
	},
	{
		accessorKey: "jobBoard",
		header: ({ column }: { column: Column<JobPosting, unknown> }) => {
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
		cell: ({ row }: { row: Row<JobPosting> }) => {
			const value = row.original.jobBoard;

			return value ? <Badge variant={value}>{value}</Badge> : null;
		},
	},
	{
		accessorKey: "company",
		header: ({ column }: { column: Column<JobPosting, unknown> }) => {
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
		cell: ({ row }: { row: Row<JobPosting> }) => {
			const value = row.original.company;

			return value ? <div className="min-w-[7.25rem]">{value}</div> : null;
		},
	},
	{
		accessorKey: "location",
		header: ({ column }: { column: Column<JobPosting, unknown> }) => {
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
		cell: ({ row }: { row: Row<JobPosting> }) => {
			const value = row.original.location;
			const isSpecific = !["remote", "hybrid", "in-office"].includes(value);
			const variant = (isSpecific ? "default" : value) as BadgeProps["variant"];

			return value ? (
				<div className="min-w-[7.25rem]">
					<Badge variant={variant} centered>
						{!isSpecific ? kebabToTitleCase(value) : value}
					</Badge>
				</div>
			) : null;
		},
	},
	{
		accessorKey: "salary",
		header: "Salary",
		cell: ({ row: { original } }: { row: Row<JobPosting> }) => {
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
		header: ({ column }: { column: Column<JobPosting, unknown> }) => {
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
		cell: ({ row: { original } }: { row: Row<JobPosting> }) => {
			const value = original.status;

			/**
			 * TODO: Add Flow from Ready -> Generate -> Generating -> Generated
			 * With alert dialogs to confirm cover letter generation
			 */
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
		cell: ({ row }: { row: Row<JobPosting> }) => {
			return (
				<div className="min-w-[11.25rem]">
					{dayjs(row.original.lastModified).format("ddd MMM DD HH:mm A")}
				</div>
			);
		},
	},
	{
		accessorKey: "options",
		header: "",
		cell: ({ row }: { row: Row<JobPosting> }) => {
			/**
			 * TODO: Generate a cover letter
			 * TODO: View the job description
			 * TODO: Edit the job posting
			 * TODO: Delete the job posting
			 * TODO: View the job posting
			 */
			return (
				<Button variant="bare">
					<SlOptionsVertical className="text-muted size-4 transition-colors hover:text-primary" />
				</Button>
			);
		},
	},
];
