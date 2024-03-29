import { HiBookOpen } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { HiDatabase, HiOutlineUser } from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueTypes, UsersTypes } from "@/interfaces";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/hy-components/HYAvatar";
import HYDialog from "@/components/hy-components/HYDialog";
import IssueDetailView from "../issues/issue-detail-view";
import ComboboxPopover from "@/components/hy-components/HYComboboxPopover";
import { patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

interface BoardCardProps {
	data: IssueTypes;
	getIssues: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ data, getIssues }) => {

	const dispatch = useDispatch()

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items as UsersTypes[]


	const usersOptions = userItems?.map((user) => ({ value: user?._id, label: user?.user_name }));

	const handleAssignSingleUser = (userId: string) => {
		data?.assign_to.length > 0 && dispatch(patchAction({ issues: Urls.issues + "/remove" }, { user_id: data?.assign_to[0] }, data?._id));
		(dispatch(patchAction({ issues: Urls.issues + "/assign" }, { user_id: userId }, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		});
	}

	const handleAssignIssueUser = (userId: string, type: "assign" | "remove") => {
		const opration = type === "assign" ? "/assign" : "/remove";
		(dispatch(patchAction({ issues: Urls.issues + opration }, { user_id: userId }, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		})
	}


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
					className="max-w-7xl dark:bg-card"
					content={<IssueDetailView data={data} />}
				>
					<div className="h-auto justify-between flex flex-col gap-2 ">
						<div className="text-left flex gap-2 items-center min-h-6 justify-between">
							<div className="flex gap-2 ">
								{data?.type === "story" && (
									<HiBookOpen className="w-4 h-4" />
								)}

								{data?.type === "task" && (
									<img src="/task_icon.svg" alt="Project" />
								)}

								{data?.type === "bug" && (
									<img src="/bug_icon.svg" alt="Project" />
								)}
								<div className="line-clamp-2">{data?.name}</div>
							</div>
							<div className="flex justify-end">
								<CircularProgress progress={data?.progress} />
							</div>
						</div>

						{data?.description &&
							<div className="text-left truncate h-5 max-w-[200px] dark:text-[#9499A5]">
								{data?.description}
							</div>
						}


						<div className="flex items-center justify-between">

							<div className="flex items-center" onClick={(e) => e?.stopPropagation()}>
								<ComboboxPopover placeholder="Search user" options={usersOptions} onChange={(data) => handleAssignIssueUser(data?.value, "assign")}>
									<div className="flex">
										{data?.assign_to?.map((usr, i) => {
											const currentUser = userItems?.find((u) => u?._id === usr)
											return <HYAvatar
												key={usr}
												className="cursor-default first:ml-0 -ml-2 border text-white"
												name={currentUser?.user_name}
												color={`${logoColors[i]}`}
											/>
										})}

										{data?.assign_to?.length === 0 &&
											<div
												title="Unassigned"
												className="cursor-default aspect-square border rounded-full flex justify-center items-center size-8 bg-gray-500" >
												<HiOutlineUser className="text-white" />
											</div>
										}
									</div>
								</ComboboxPopover>
							</div>
							<div className="flex items-center gap-2 pr-2">
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



const CircularProgress = ({ progress }) => {

	const circumference = 8 * 2 * Math.PI;
	const offset = circumference - (progress / 100) * circumference;

	return (
		<div className="relative inline-block" title={`Progress : ${progress}%`}>
			<svg className="size-10">
				<circle
					className="stroke-current text-gray-300"
					stroke="#ddd"
					strokeWidth="3"
					fill="transparent"
					r="8"
					cx="20"
					cy="20"
				/>
				<circle
					className="stroke-current text-primary"
					stroke="#3b82f6"
					strokeWidth="3"
					fill="transparent"
					r="8"
					cx="20"
					cy="20"
					strokeDasharray={circumference}
					strokeDashoffset={isNaN(offset) ? 0 : offset}
					strokeLinecap="round"
					transform="rotate(-90 20 20)"
				/>
			</svg>
		</div>
	);
}


