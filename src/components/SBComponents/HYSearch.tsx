import { Search } from "lucide-react";
import { Input } from "../ui/input";

const HYSearch = () => {
	return (
		<div className="flex items-center bg-background pr-3 w-72 h-11 max-w-52 rounded border">
			<Input
				className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
				placeholder="Search"
			/>
			<Search />
		</div>
	);
};

export default HYSearch;
