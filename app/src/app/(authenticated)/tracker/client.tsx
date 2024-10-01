"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { PiWaveSawtoothBold } from "react-icons/pi";
import type { Row, Column } from "@tanstack/react-table";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";

import Search from "./search";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import Separator from "@/ui/separator";
import AddJobForm from "./add-job-form";
import Checkbox from "@/src/ui/checkbox";
import { DataTable } from "./data-table";
import { useApi } from "@/src/providers/api";
import { buttonVariants } from "@/ui/button";
import EditJobForm from "@/ui/forms/edit-job";
import { Badge, type BadgeProps } from "@/ui/badge";
import { statuses } from "./utils/job-post-statuses";
import type { JobPosting, JobBoard } from "@repo/types/job-posting";
import { camelToSentenceCase, cn, kebabToTitleCase } from "@/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogDescription,
} from "@/ui/dialog";
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogDescription,
} from "@/ui/alert-dialog";

const formatSalary = (amount: number, currency: string) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency || "USD",
	});

	return formatter.format(amount);
};

const defaultColumns = {
	title: true,
	jobBoard: true,
	company: true,
	location: true,
	salary: true,
	status: true,
	lastModified: true,
};

const Client = () => {
	const [search, setSearch] = useState("");
	const [addJobDialogOpen, setAddJobDialogOpen] = useState(false);
	const [editJobDialogOpen, setEditJobDialogOpen] = useState(false);
	const [filteredData, setFilteredData] = useState<JobPosting[]>([]);
	const [activeColumns, setActiveColumns] = useState<{ [k: string]: boolean }>(
		defaultColumns,
	);
	const deleteJobMutation = useApi<JobPosting>("/postings/delete", {
		method: "DELETE",
	});

	const {
		isLoading,
		data: postings,
		refetch,
	} = useQuery({
		queryKey: ["fetchPostings"],
		queryFn: useApi<JobPosting[]>("/postings", {
			method: "POST",
		}),
	});

	const deleteMutation = useMutation({
		mutationKey: ["deleteJobPosting"],
		mutationFn: deleteJobMutation,
		onSuccess: async () => {
			toast.success("Successfully deleted job posting");
			refetch();
		},
	});

	const handleToggleColumn = (columnName: string) => (isChecked: boolean) => {
		setActiveColumns((prevState) => ({
			...prevState,
			[columnName]: isChecked,
		}));
	};

	const onJobSuccess = () => {
		setAddJobDialogOpen((prevState) => !prevState);
		refetch();
	};

	const deleteJobPosting = (id: string) => async () => {
		await deleteMutation.mutateAsync({ id });
	};

	const toggleAddJobDialog = () => {
		setAddJobDialogOpen((prevState) => !prevState);
	};
	const toggleEditJobDialog = () => {
		setEditJobDialogOpen((prevState) => !prevState);
	};

	const hasPosts = Array.isArray(postings) && Boolean(postings?.length);

	const columns = [
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

				return value ? (
					<div className="min-w-[7.25rem]">{value}</div>
				) : undefined;
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
					company.url ? (
						<Link
							href={company.url}
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
				const variant = (
					isSpecific ? "default" : value
				) as BadgeProps["variant"];

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
				return (
					<>
						<Popover>
							<PopoverTrigger>
								<SlOptionsVertical className="text-muted size-4 transition-colors hover:text-primary" />
							</PopoverTrigger>
							<PopoverContent>
								<ul className="list-none">
									<li>
										<Button variant="bare" onClick={toggleEditJobDialog}>
											Edit Post
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
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													variant="bare"
													className="text-red-600 hover:text-red-400 pb-0"
												>
													Delete Post
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Delete Job Posting
													</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={deleteJobPosting(
															row.original.id as string,
														)}
													>
														Continue
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</li>
								</ul>
							</PopoverContent>
						</Popover>

						<Dialog open={editJobDialogOpen} onOpenChange={toggleEditJobDialog}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Edit Job</DialogTitle>
									<DialogDescription>
										Edit the details for the job posting. Click "Update" when
										you're done.
									</DialogDescription>
								</DialogHeader>
								<EditJobForm
									id={row.original.id as string}
									onSuccess={() => {
										toggleEditJobDialog();
										refetch();
									}}
									closeDialog={toggleEditJobDialog}
								/>
							</DialogContent>
						</Dialog>
					</>
				);
			},
		},
	].filter((column) => {
		return (
			activeColumns[column.accessorKey] || column.accessorKey === "options"
		);
	});

	useEffect(() => {
		if (!isLoading && Array.isArray(postings)) {
			setFilteredData(postings);
		}
	}, [postings, isLoading]);

	return isLoading ? null : (
		<>
			<div className="grid grid-cols-[repeat(29,_minmax(0,_1fr))] gap-4">
				{hasPosts
					? statuses
							.filter(
								(status) =>
									!["generating", "no-answer", "rejected", "withdrew"].includes(
										status,
									),
							)
							.map((status) => {
								const count = postings.filter(
									(job) => job.status === status,
								).length;

								return (
									<Card
										className={cn(
											"flex flex-col col-span-4 items-center justify-center py-2",
											count
												? "border-primary text-primary"
												: "border-muted text-muted",
										)}
										key={status}
									>
										<span className="font-semibold text-2xl">
											{count || "--"}
										</span>
										<h2 className={cn("-mt-1 font-semibold text-xs uppercase")}>
											{kebabToTitleCase(status)}
										</h2>
									</Card>
								);
							})
					: null}
				{hasPosts ? (
					<div className="col-span-1 h-full flex items-center justify-center relative">
						<PiWaveSawtoothBold className="rotate-90 text-muted absolute top-5" />
						<PiWaveSawtoothBold className="rotate-90 text-muted absolute top-8" />
					</div>
				) : null}

				{hasPosts
					? statuses
							.filter((status) => ["no-answer", "rejected"].includes(status))
							.map((status) => {
								const count = postings.filter(
									(job) => job.status === status,
								).length;

								return (
									<Card
										className={cn(
											"flex flex-col col-span-4 items-center justify-center py-2",
											count
												? "border-primary text-primary"
												: "border-muted text-muted",
										)}
										key={status}
									>
										<span className="font-semibold text-2xl">
											{count || "--"}
										</span>
										<h2 className={cn("-mt-1 font-semibold text-xs uppercase")}>
											{kebabToTitleCase(status)}
										</h2>
									</Card>
								);
							})
					: null}
			</div>

			<div className="my-4 grid gap-4 grid-cols-[repeat(29,_minmax(0,_1fr))]">
				<div
					className={cn(hasPosts ? "col-span-12" : "col-[span_25_/_span_25]")}
				/>
				{hasPosts ? (
					<>
						<Search
							data={postings}
							search={search}
							setSearch={setSearch}
							className="col-span-9"
							setData={setFilteredData}
						/>

						<Popover>
							<PopoverTrigger
								className={cn(
									"col-span-4",
									buttonVariants({ variant: "outlineNeutral" }),
								)}
							>
								Columns
							</PopoverTrigger>

							<PopoverContent>
								<ul>
									{Object.entries(activeColumns).map(([name, isChecked]) => (
										<li
											key={name}
											className="flex gap-4 items-center [&:not(:first-of-type)]:mt-2"
										>
											<Checkbox
												checked={isChecked}
												onCheckedChange={handleToggleColumn(name)}
											/>
											<span>{camelToSentenceCase(name)}</span>
										</li>
									))}
								</ul>
							</PopoverContent>
						</Popover>
					</>
				) : null}

				<AddJobForm
					hasPosts={hasPosts}
					isOpen={addJobDialogOpen}
					onSuccess={onJobSuccess}
					onOpenChange={toggleAddJobDialog}
				/>
			</div>

			<DataTable columns={columns} data={filteredData} />
		</>
	);
};
export default Client;
