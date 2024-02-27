import { HiDatabase } from "react-icons/hi";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import HYDialog from "@/components/HYComponents/HYDialog";
import IssueDetailView from "@/components/HYComponents/DetailViews/Issue-detail-view";

const BoardCard = ({ data }: any) => {


	return (

		<Card
			draggable
			onDragStart={(e) => {
				e.dataTransfer.setData("id", data?.id);
			}}
			className={`cursor-grab dark:bg-[#151619] card-gradient`}
		>
			<CardContent className="p-3 gap-2 flex flex-col ">
				<HYDialog
					className="max-w-6xl"
					content={<IssueDetailView data={data} />}
				>
					<div className="h-[90px] justify-between flex flex-col ">
						<div className="text-left flex gap-2 space-y-2">
							{data?.type === "story" && (
								<img src="/story_icon.svg" alt="Project" />
							)}

							{data?.type === "task" && (
								<img src="/task_icon.svg" alt="Project" />
							)}

							{data?.type === "bug" && (
								<img src="/bug_icon.svg" alt="Project" />
							)}
							{data?.name}
						</div>
						<div className="text-left py-3 truncate max-w-[200px]">
							{data?.description}
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
								<HiDatabase /> {data?.points}
							</div>
						</div>
					</div>
				</HYDialog>
			</CardContent>
		</Card>
	);
};

export default BoardCard;
