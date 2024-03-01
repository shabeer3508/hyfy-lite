import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import HYDialog from "@/components/HYComponents/HYDialog";
import { HiDatabase, HiOutlineUser } from "react-icons/hi";
import { reducerNameFromUrl } from "@/redux/actions/AppActions";
import IssueDetailView from "@/components/HYComponents/DetailViews/Issue-detail-view";

const BoardCard = ({ data }: any) => {

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items

	const logoColors = [
		"bg-[#71A4FF]",
		"bg-[#4C4878]",
		"bg-[#A4599A]",
		"bg-[#E2A766]",
		"bg-[#389C98]",
		"bg-[#FF6481]",
	];

	return (

		<Card
			draggable
			onDragStart={(e) => {
				e.dataTransfer.setData("id", data?._id);
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
								{data?.assign_to?.map((usr, i) => {
									const currentUser = userItems?.find((u) => u?._id === usr)
									return <HYAvatar
										className="cursor-default first:ml-0 -ml-2 border text-white"
										url=""
										name={currentUser?.name}
										color={`${logoColors[i]}`}
									/>
								}
								)}

								{data?.assign_to?.length === 0 &&
									<div
										onClick={(e) => e?.stopPropagation()}
										title="Unassigned"
										className="cursor-default aspect-square border rounded-full flex justify-center items-center size-8 bg-gray-500" >
										<HiOutlineUser className="text-white" />
									</div>
								}
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
