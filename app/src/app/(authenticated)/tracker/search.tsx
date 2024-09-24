import Input from "@/ui/input";
import { cn } from "@/utils";
import { IoSearch } from "react-icons/io5";
import { matchSorter } from "match-sorter";
import type { JobPosting } from "./columns";

const Search = ({
	data,
	search,
	setData,
	setSearch,
	className,
}: {
	search: string;
	className?: string;
	data: JobPosting[];
	setSearch: (search: string) => void;
	setData: (search: JobPosting[]) => void;
}) => {
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setData(
			matchSorter(data, e.target.value, {
				keys: ["title", "jobBoard", "company", "location", "status"],
			}),
		);
	};

	return (
		<div className={cn("relative h-10", className)}>
			<Input
				value={search}
				onChange={handleSearch}
				placeholder="Search Jobs..."
				className="absolute border-text-muted pr-9"
			/>
			<IoSearch className="absolute top-3 bg-white pl-2 w-6 right-3 text-muted" />
		</div>
	);
};
export default Search;
