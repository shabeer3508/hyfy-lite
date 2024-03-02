import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = ({ }) => {
	const navigate = useNavigate()
	return (
		<div className="flex flex-col justify-center w-auto gap-5 h-[calc(100vh-200px)] items-center">
			<h2 className="text-6xl">404</h2>
			<h2 className="">🚀  Look like your're lost </h2>
			<Button className="text-whites" onClick={() => navigate("/board")}>Home</Button>
		</div>
	);
};

export default NotFound;
