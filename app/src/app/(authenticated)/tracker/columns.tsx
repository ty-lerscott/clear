"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { SlOptionsVertical } from "react-icons/sl";
import type { Row, Column } from "@tanstack/react-table";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";

import { Button } from "@/ui/button";
import Separator from "@/ui/separator";
import { kebabToTitleCase } from "@/utils";
import { Badge, type BadgeProps } from "@/ui/badge";
import type { JobPosting, JobBoard } from "@repo/types/job-posting";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

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

			return value ? <div className="min-w-[7.25rem]">{value}</div> : undefined;
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
			const { name, url } = row.original.jobBoard as JobBoard;

			return name ? (
				<Badge variant={name as BadgeProps["variant"]}>
					{url ? (
						<Link
							href={url}
							target="_blank"
							className="underline hover:no-underline"
						>
							{name}
						</Link>
					) : (
						name
					)}
				</Badge>
			) : undefined;
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
				<>
					<Button
						className="group"
						variant="bare"
						options="noPadding"
						onClick={() => column.toggleSorting(isAscending)}
					>
						Company
						<Icon className="size-5 ml-1 transition-opacity opacity-0 group-hover:opacity-80" />
					</Button>
				</>
			);
		},
		cell: ({ row }: { row: Row<JobPosting> }) => {
			const company = row.original.company as JobPosting["company"];

			return company?.name ? (
				company.website ? (
					<Link
						href={company.website}
						className="underline hover:no-underline"
						target="_blank"
					>
						<span className="min-w-[7.25rem]">{company.name}</span>
					</Link>
				) : (
					<span className="min-w-[7.25rem]">{company.name}</span>
				)
			) : undefined;
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
			const value = row.original.company?.location as string;
			const isSpecific = !["remote", "hybrid", "in-office"].includes(value);
			const variant = (isSpecific ? "default" : value) as BadgeProps["variant"];

			return value ? (
				<div className="min-w-[7.25rem]">
					<Badge variant={variant} centered>
						{!isSpecific ? kebabToTitleCase(value) : value}
					</Badge>
				</div>
			) : undefined;
		},
	},
	{
		accessorKey: "salary",
		header: "Salary",
		cell: ({ row: { original } }: { row: Row<JobPosting> }) => {
			const { min, max, currency } = (original?.salary ?? {}) as {
				min: number;
				max: number;
				currency: string;
			};

			const minSalary = min ? formatSalary(min, currency) : undefined;
			const maxSalary = max ? formatSalary(max, currency) : undefined;

			return (
				<div className="min-w-[11.5rem]">
					<span>{`${min ? minSalary : ""}${max ? ` - ${maxSalary}` : ""}`}</span>
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
			) : undefined;
		},
	},
	{
		accessorKey: "lastModified",
		header: "Last Modified",
		cell: ({ row }: { row: Row<JobPosting> }) => {
			return (
				<div className="min-w-[11.25rem]">
					{dayjs(row.original.date).format("ddd MMM DD hh:mm A")}
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
				<Popover>
					<PopoverTrigger>
						<SlOptionsVertical className="text-muted size-4 transition-colors hover:text-primary" />
					</PopoverTrigger>
					<PopoverContent>
						<ul className="list-none">
							<li>
								<Button variant="bare" disabled>
									Edit Posting
								</Button>
							</li>
							<li>
								<Button variant="bare" disabled>
									Expand Posting
								</Button>
							</li>
							<li>
								<Button variant="bare" disabled>
									View Job Description
								</Button>
							</li>
							<li>
								<Button variant="bare" disabled>
									Generate Cover Letter
								</Button>
							</li>
							<li>
								<Separator />
							</li>
							<li>
								<Button
									variant="bare"
									className="text-red-600 hover:text-red-400 pb-0"
									disabled
								>
									Delete Posting
								</Button>
							</li>
						</ul>
					</PopoverContent>
				</Popover>
			);
		},
	},
];
