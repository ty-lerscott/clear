"use client";

import { useState } from "react";

import Search from "./search";
import Checkbox from "@/ui/checkbox";
import { Button, buttonVariants } from "@/ui/button";
import { DataTable } from "./data-table";
import { camelToSentenceCase, cn } from "@/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { columns, type JobPosting } from "./columns";

const defaultColumns = {
	title: true,
	jobBoard: true,
	company: true,
	location: true,
	salary: true,
	status: true,
	lastModified: true,
};

const Client = ({ data }: { data: JobPosting[] }) => {
	const [search, setSearch] = useState("");

	const [activeColumns, setActiveColumns] = useState<{ [k: string]: boolean }>(
		defaultColumns,
	);

	const handleToggleColumn = (columnName: string) => (isChecked: boolean) => {
		setActiveColumns((prevState) => ({
			...prevState,
			[columnName]: isChecked,
		}));
	};

	return (
		<>
			<div className="my-4 grid gap-4 grid-cols-[repeat(29,_minmax(0,_1fr))]">
				<div className="col-span-12" />
				<Search className="col-span-9" search={search} setSearch={setSearch} />

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
				data={data}
			/>
		</>
	);
};
export default Client;
