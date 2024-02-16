import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";

const HYSearch = () => {
	return (
		<div className="flex items-center bg-background pr-3 max-w-52 rounded border">
			<Input
				className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
				placeholder="Search"
			/>
			<IoIosSearch />
		</div>
	);
};

export default HYSearch;
