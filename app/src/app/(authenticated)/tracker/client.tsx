"use client";

import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PiWaveSawtoothBold } from "react-icons/pi";

import Search from "./search";
import { Card } from "@/ui/card";
import { columns } from "./columns";
import Checkbox from "@/ui/checkbox";
import { DataTable } from "./data-table";
import { useApi } from "@/src/providers/api";
import { Button, buttonVariants } from "@/ui/button";
import type { JobPosting } from "@repo/types/job-posting";
import { camelToSentenceCase, cn, kebabToTitleCase } from "@/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

const statuses = [
	"ready",
	"generating",
	"applied",
	"interviewing",
	"negotiating",
	"got-the-job",
	"no-answer",
	"rejected",
	"withdrew",
];

const randomStatus = () => faker.helpers.arrayElement(statuses);

const randomLocation = () =>
	faker.helpers.arrayElement([
		"in-office",
		"remote",
		"hybrid",
		`${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
	]);

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
	const [filteredData, setFilteredData] = useState<JobPosting[]>([]);
	const [activeColumns, setActiveColumns] = useState<{ [k: string]: boolean }>(
		defaultColumns,
	);

	const { isLoading, data: postings } = useQuery({
		queryKey: ["fetchPostings"],
		queryFn: useApi<JobPosting[]>("/postings", {
			method: "POST",
		}),
	});

	console.log(postings);

	useEffect(() => {
		if (!isLoading && Array.isArray(postings)) {
			setFilteredData(postings);
		}
	}, [postings, isLoading]);

	const handleToggleColumn = (columnName: string) => (isChecked: boolean) => {
		setActiveColumns((prevState) => ({
			...prevState,
			[columnName]: isChecked,
		}));
	};

	return isLoading || !postings ? null : (
		<>
			<div className="grid grid-cols-[repeat(29,_minmax(0,_1fr))] gap-4">
				{statuses
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
								<span className="font-semibold text-2xl">{count || "--"}</span>
								<h2 className={cn("-mt-1 font-semibold text-xs uppercase")}>
									{kebabToTitleCase(status)}
								</h2>
							</Card>
						);
					})}
				<div className="col-span-1 h-full flex items-center justify-center relative">
					<PiWaveSawtoothBold className="rotate-90 text-muted absolute top-5" />
					<PiWaveSawtoothBold className="rotate-90 text-muted absolute top-8" />
				</div>
				{statuses
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
								<span className="font-semibold text-2xl">{count || "--"}</span>
								<h2 className={cn("-mt-1 font-semibold text-xs uppercase")}>
									{kebabToTitleCase(status)}
								</h2>
							</Card>
						);
					})}
			</div>

			<div className="my-4 grid gap-4 grid-cols-[repeat(29,_minmax(0,_1fr))]">
				<div className="col-span-12" />
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

				<Button className="col-span-4">Add Job</Button>
			</div>
			<DataTable
				columns={columns.filter((column) => {
					return (
						activeColumns[column.accessorKey] ||
						column.accessorKey === "options"
					);
				})}
				data={filteredData}
			/>
		</>
	);
};
export default Client;
