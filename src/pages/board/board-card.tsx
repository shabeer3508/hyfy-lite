import { useSelector } from "react-redux";
import { HiBookOpen } from "react-icons/hi2";
import { HiDatabase, HiOutlineUser } from "react-icons/hi";

import { IssueTypes, UsersTypes } from "@/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/hy-components/HYAvatar";
import HYDialog from "@/components/hy-components/HYDialog";
import IssueDetailView from "../issues/issue-detail-view";
import { reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
	data: IssueTypes
}

const BoardCard: React.FC<BoardCardProps> = ({ data }) => {

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items as UsersTypes[]

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
			onDragStart={(e) => { e.dataTransfer.setData("id", data?._id) }}
			className={`cursor-grab dark:bg-[#151619] card-gradient`}
		>
			<CardContent className="p-3 gap-2 flex flex-col ">
				<HYDialog
					className="max-w-6xl dark:bg-card"
					content={<IssueDetailView data={data} />}
				>
					<div className="h-auto justify-between flex flex-col gap-2 ">
						<div className="text-left flex gap-2 items-center min-h-6">
							{data?.type === "story" && (
								<HiBookOpen className="w-4 h-4" />
							)}

							{data?.type === "task" && (
								<img src="/task_icon.svg" alt="Project" />
							)}

							{data?.type === "bug" && (
								<img src="/bug_icon.svg" alt="Project" />
							)}
							{data?.name}
						</div>

						{data?.description &&
							<div className="text-left truncate max-w-[200px] dark:text-[#9499A5]">
								{data?.description}
							</div>
						}

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								{data?.assign_to?.map((usr, i) => {
									const currentUser = userItems?.find((u) => u?._id === usr)
									return <HYAvatar
										key={usr}
										className="cursor-default first:ml-0 -ml-2 border text-white"
										name={currentUser?.user_name}
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


export const BoardCardSkeleton = () => {
	return <div className="flex flex-col border h-24">
		<div className="p-2 h-1/2">
			<Skeleton className="w-full h-full " />

		</div>
		<div className="flex justify-between p-2">
			<Skeleton className="w-8 h-8 rounded-full" />
			<Skeleton className="w-8 h-8" />
		</div>
	</div>
}
