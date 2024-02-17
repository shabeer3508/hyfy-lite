import HYAvatar from "@/components/HYComponents/HYAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { HiDatabase } from "react-icons/hi";

const BoardCard = () => {
	return (
		<Card draggable className="cursor-grab">
			<CardContent className="p-3 gap-2 flex flex-col">
				<div className="text-left flex gap-2">
					<img src="/story_icon.svg" alt="Project" />
					Add Drag ‘n’ Drop
				</div>
				<div className="text-left pb-3 truncate max-w-[200px]">
					Drag n drop function in fav screen Drag n drop function in
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<HYAvatar
							className=""
							url=""
							name="Shad D"
							color="bg-purple-400"
						/>
						<HYAvatar
							className="-ml-2 shadow-md"
							url=""
							name="Apple Seed"
							color="bg-amber-500"
						/>
					</div>
					<div className="flex items-center gap-2">
						<HiDatabase /> 100
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BoardCard;
