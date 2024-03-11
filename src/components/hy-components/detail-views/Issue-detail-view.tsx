import dayjs from "dayjs";
import HYAvatar from "../HYAvatar";
import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import { HiDatabase } from "react-icons/hi";
import { HiDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import CommentCreation from "../forms/comment-creation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const IssueDetailView = ({ data }: { data: any }) => {
	const dispatch = useDispatch()

	const commentsReducerName = reducerNameFromUrl("comments", "GET");
	const commentsList = useSelector((state: any) => state?.[commentsReducerName]);
	const commentsItems = commentsList?.data?.items

	/*  ######################################################################################## */

	const getComments = () => {
		let query = `?expand=created_by&sort=-createdAt&filter=issue_id=${data?._id}`;
		dispatch(getAction({ comments: Urls.comments + query }));
	}

	/*  ######################################################################################## */

	const statusOptions = [
		{ value: "todo", label: "Todo" },
		{ value: "ongoing", label: "Ongoing" },
		{ value: "pending", label: "Pending" },
		{ value: "done", label: "Done" },
		{ value: "backlog", label: "Backlog" }]

	/*  ######################################################################################## */

	useEffect(() => {
		getComments()
	}, [data?._id])

	/*  ######################################################################################## */

	return (
		<div>
			<div className="flex gap-2 text-xl">
				{data?.type === "story" && (
					<img src="/story_icon.svg" alt="Project" height={25} width={25} />
				)}

				{data?.type === "task" && (
					<img src="/task_icon.svg" alt="Project" height={25} width={25} />
				)}

				{data?.type === "bug" && (
					<img src="/bug_icon.svg" alt="Project" height={25} width={25} />
				)}

				{data?.name}
			</div>
			<div className="grid grid-cols-6 pt-5">
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Epic</div>
						<div className=" flex flex-1 items-center">Epic 1</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Sprint</div>
						<div className=" flex flex-1 items-center">
							Sprint 1
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">
							Estimation Points
						</div>
						<div className=" flex flex-1 items-center gap-2">
							<HiDatabase />
							{data?.points}
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Hours</div>
						<div className=" flex flex-1 items-center">5 </div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Dependency</div>
						<div className=" flex flex-1 items-center">Story 5</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Status</div>
						<HYCombobox defaultValue={data?.status} options={statusOptions} buttonClassName="w-[150px] my-2" unSelectable={false} />
					</div>
				</div>
			</div>
			<Separator className="mt-5" />
			<ScrollArea className="max-h-[500px] overflow-auto pr-5 ">
				<div className="flex justify-between mt-5 items-center">
					<div className="flex flex-col gap-2">
						<div className="text-xs text-[#9499A5]">
							Assigned to
						</div>
						<div className="flex gap-2 ">
							<div className="flex gap-2 items-center">
								<HYAvatar
									url="https://github.com/shadcn.png"
									name={"Jhon"}
								/>
								<a className="text-xs">{"Jhon"}</a>
							</div>
						</div>
					</div>
					<div>
						<Button
							className="border-primary text-primary"
							variant="outline"
							type="button"
						>
							Manage
						</Button>
					</div>
				</div>
				<Separator className="my-5" />
				<div className="text-xs space-y-4">
					<div className="space-y-1">
						<div className="text-[#9499A5]">Description</div>
						<div>{data?.description}</div>
					</div>
					<div className="space-y-2">
						<div className="text-[#9499A5]">Sub Tasks</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Checkbox /> Kill Bugs 1
							</div>
							<div className="flex items-center gap-2">
								<Checkbox /> Kill Bugs 2
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-5" />
				<div className="space-y-3">
					<div className="space-y-2">
						<div>Comments</div>
						<CommentCreation issueId={data?._id} />
					</div>
					<div className="space-y-3 py-2">
						{commentsItems?.map((comment, i) => <CommentCard key={`${comment?._id}_${i}`} data={comment} />)}
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default IssueDetailView;

export const CommentCard = ({ data }: { data: any }) => {
	return (
		<Card className="dark:bg-[#151619]">
			<CardContent className="p-3 text-xs">
				<div className="flex justify-between items-center mb-3">
					<div className="flex gap-2">
						<HYAvatar
							url="https://github.com/shadcn.png"
							name={data?.created_by?.[0]?.user_name}
						/>
						<div className="flex flex-col capitalize">
							<a className="text-xs">{data?.created_by?.[0]?.user_name}</a>
							<a className="text-xs text-[#9499A5]">
								{data?.created_by?.[0]?.role}
							</a>
						</div>
					</div>
					<div>
						<HiDotsVertical />
					</div>
				</div>
				<div className="my-1">{data?.message}</div>
				<div className="text-[#9499A5]">On  {dayjs(data?.createdAt).format("DD/MM/YYYY")}</div>
			</CardContent>
		</Card>
	);
};
