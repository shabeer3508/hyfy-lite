import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";

const HYSearch = ({ className, inputClassName }: { className?: string, inputClassName?: string }) => {
	return (
		<div className={`flex items-center dark:bg-[#111215] pr-3 max-w-52 rounded border ${className} h-10`}>
			<Input
				className={`placeholder:text-xs outine-0 ring-0 dark:bg-[#111215] focus-visible:ring-0 focus-visible:ring-offset-0 border-0 h-0 ${inputClassName}`}
				placeholder="Search"
			/>
			<IoIosSearch className="h-5" />
		</div>
	);
};

export default HYSearch;
