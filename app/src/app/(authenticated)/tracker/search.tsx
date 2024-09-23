import Input from "@/ui/input";
import { cn } from "@/utils";
import debounce from "lodash.debounce";
import { IoSearch } from "react-icons/io5";

const Search = ({
	search,
	setSearch,
	className,
}: {
	search: string;
	setSearch: (search: string) => void;
	className?: string;
}) => {
	const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, 250);

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
