import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiBookOpen } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { HiDatabase, HiDotsVertical, HiOutlineClock, HiOutlineX } from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import HYEditableDiv from "@/components/hy-components/HYEditableDiv";
import HYAlertDialog from "@/components/hy-components/HYAlertDialog";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import CommentCreation from "@/components/hy-components/forms/comment-creation";
import { deleteAction, getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { CommentsTypes, EpicTypes, IssueStatusTypes, IssueTypes, SprintTypes, UsersTypes } from "@/interfaces";
import { Checkbox } from "@/components/ui/checkbox";

const IssueDetailView = ({ data }: { data: IssueTypes }) => {
	const dispatch = useDispatch();
	const [showUserSelection, setShowUserSelection] = useState(false);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const commentsReducerName = reducerNameFromUrl("comments", "GET");
	const commentsItems = useSelector((state: any) => state?.[commentsReducerName])?.data?.items as CommentsTypes[];

	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicItems = useSelector((state: any) => state?.[epicReducerName])?.data?.items as EpicTypes[];

	// const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	// const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

	const issuesReducerName = reducerNameFromUrl("issues", "GET");
	const issueItems = useSelector((state: any) => state?.[issuesReducerName])?.data?.items as IssueTypes[];

	const sprintReducerName = reducerNameFromUrl("sprints", "GET");
	const sprintListData = useSelector((state: any) => state?.[sprintReducerName])?.data?.items as SprintTypes[];

	const stagesReducerName = reducerNameFromUrl("stagesList", "GET");
	const stagesData = useSelector((state: any) => state?.[stagesReducerName]);
	const stagesItems = stagesData?.data?.data?.stages as IssueStatusTypes[]

	/*  ######################################################################################## */

	const getComments = () => {
		let query = `?expand=created_by&sort=-createdAt&filter=issue_id=${data?._id}`;
		dispatch(getAction({ comments: Urls.comments + query }));
	}

	const getIssues = () => {
		let query = `?perPage=300&expand=epic_id&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const handleIssueEdit = (value, field: string) => {
		let postData = { [field]: value !== "" ? value : null };
		// if (value === "" && field === "sprint_id") { postData = { ...postData, status: issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id } }
		(dispatch(patchAction({ issues: Urls.issues }, postData, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		})
	}

	const handleIssueDelete = () => {
		(dispatch(deleteAction(Urls.issues, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		})
	}

	const handleAssignIssueUser = (userId: string, type: "assign" | "remove") => {
		const opration = type === "assign" ? "/assign" : "/remove";
		(dispatch(patchAction({ issues: Urls.issues + opration }, { user_id: userId }, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		})
		setShowUserSelection(false);
	}


	/*  ######################################################################################## */

	const statusOptions = stagesItems?.map(status => ({ label: status?.name, value: status?._id }));

	const epicOptions =
		epicItems?.map((epic) => ({
			value: epic?._id,
			label: epic?.name,
		})) ?? [];

	const sprintOptions =
		sprintListData?.map((sprnt) => ({
			value: sprnt?._id,
			label: sprnt?.name,
		})) ?? [];

	const issueOptions =
		issueItems
			?.filter((issue) => issue?.type === "story")
			?.map((issue) => ({
				value: issue?._id,
				label: issue?.name,
			})) ?? [];

	const usersOptions =
		usersList?.map((user) => ({
			value: user?._id,
			label: user?.user_name,
		})) ?? [];

	const pointOptions = [
		{ label: "5", value: "5" },
		{ label: "10", value: "10" },
		{ label: "15", value: "15" },
	];

	const estimatedHours = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		getComments()
	}, [data?._id])

	/*  ######################################################################################## */


	return (
		<div className="overflow-auto max-h-[70vh] pr-2">
			<div className="flex gap-2 text-xl items-center ">
				{data?.type === "story" && (
					<HiBookOpen className="w-6 h-6" />
				)}

				{data?.type === "task" && (
					<img src="/task_icon.svg" alt="task" height={25} width={25} />
				)}

				{data?.type === "bug" && (
					<img src="/bug_icon.svg" alt="bug" height={25} width={25} />
				)}
				<div className="flex-1">
					<HYEditableDiv className="text-xl dark:bg-card" defaultText={data?.name} handleChange={(value) => handleIssueEdit(value, "name")} />
				</div>
			</div>
			<div className="grid grid-cols-7 pt-5">
				{/* <div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Epic</div>
						<div className=" flex flex-1 items-center mr-4 ">
							<HYCombobox
								unSelectable={true}
								options={epicOptions}
								buttonClassName="w-full dark:bg-card dark:border-[#FFFFFF1A]"
								onValueChange={(value) => handleIssueEdit(value, "epic_id")}
								defaultValue={typeof data?.epic_id === "string" ? data?.epic_id : data?.epic_id?.[0]?._id}
							/>
						</div>
					</div>
					<Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
				</div> */}
				{/* <div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Sprint</div>
						<div className=" flex flex-1 items-center mr-4">
							<HYCombobox
								unSelectable={true}
								options={sprintOptions}
								buttonClassName="w-full dark:bg-card dark:border-[#FFFFFF1A]"
								defaultValue={data?.sprint_id}
								onValueChange={(value) => handleIssueEdit(value, "sprint_id")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
				</div> */}
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">
							Estimation Points
						</div>
						<div className=" flex flex-1 items-center gap-2">
							<HYCombobox
								label={<HiDatabase />}
								options={pointOptions}
								buttonClassName="w-full mr-4 dark:bg-card dark:border-[#FFFFFF1A]"
								defaultValue={data?.points?.toString()}
								onValueChange={(value) => handleIssueEdit(value, "points")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
				</div>
				{/* <div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Hours</div>
						<div className=" flex flex-1 items-center">
							<HYCombobox
								label={<HiOutlineClock />}
								options={estimatedHours}
								buttonClassName="w-full mr-4 dark:bg-card dark:border-[#FFFFFF1A]"
								defaultValue={data?.estimated_hours?.toString()}
								onValueChange={(value) => handleIssueEdit(value, "estimated_hours")}

							/>
						</div>
					</div>
					<Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
				</div> */}
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Dependency</div>
						<div className=" flex flex-1 items-center">
							<HYCombobox
								unSelectable={true}
								options={issueOptions}
								buttonClassName="w-full mr-4 dark:bg-card dark:border-[#FFFFFF1A]"
								defaultValue={data?.dependency}
								onValueChange={(value) => handleIssueEdit(value, "dependency")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Status</div>
						<div className="flex flex-1 items-center">
							<HYCombobox
								defaultValue={data?.status}
								options={statusOptions}
								buttonClassName="w-full mr-4 dark:bg-card dark:border-[#FFFFFF1A]"
								onValueChange={(value) => handleIssueEdit(value, "status")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5] opacity-0 select-none">Delete</div>
						<div className="flex flex-1 items-center">
							<HYAlertDialog submitAction={handleIssueDelete} >
								<Button
									type="button"
									variant="ghost"
									className="border border-destructive text-destructive hover:text-destructive"
								>
									Delete
								</Button>
							</HYAlertDialog>
						</div>
					</div>
				</div>
			</div>
			<Separator className="mt-5 dark:bg-[#FFFFFF1A]" />
			{/* <ScrollArea className="max-h-[500px] overflow-auto pr-5 "> */}
			<div className="flex justify-between mt-5 items-center">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex justify-between w-full text-xs ">
						<div className="text-[#9499A5]">Assigned To</div>
						<div
							className="text-primary cursor-pointer"
							onClick={() => setShowUserSelection(prevData => !prevData)}
						>
							{showUserSelection ? "Done" : "Add"}
						</div>
					</div>
					<div className="">
						{data?.assign_to?.length > 0 &&
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
								{data?.assign_to?.map(userId => {
									const userInfo = usersList?.find(user => user._id === userId);
									return (
										<div key={`${userId}`} className="flex gap-4 items-center justify-between border dark:border-[#FFFFFF1A] px-3 py-1 rounded w-full group">
											<div className="flex gap-3">
												<HYAvatar name={userInfo?.user_name} />
												<div className="text-xs">
													<div className="truncate w-[50px] md:w-[100px] lg:w-[150px]">{userInfo?.user_name}</div>
													<div className="dark:text-[#FFFFFF66] text-gray-500">{userInfo?.role}</div>
												</div>
											</div>

											<div className="text-xs">
												<Button
													size="icon"
													variant="ghost"
													className="opacity-0 group-hover:opacity-100"
													onClick={() => handleAssignIssueUser(userId, "remove")}
												>
													<HiOutlineX />
												</Button>
											</div>
										</div>
									)
								})}
							</div>
						}

						{data?.assign_to?.length === 0 && <div className="text-xs">Unassigned</div>}


						{showUserSelection &&
							<div className="mt-2 w-full">
								<HYCombobox
									options={usersOptions}
									buttonClassName="mr-4 w-full mr-1 dark:bg-card dark:border-[#FFFFFF1A]"
									optionsClassName="w-[200px]"
									onValueChange={(value: string) => handleAssignIssueUser(value, "assign")}
								/>
							</div>
						}
					</div>
				</div>
			</div>
			<Separator className="my-5 dark:bg-[#FFFFFF1A]" />
			<div className="text-xs space-y-4">
				<div className="space-y-1">
					<div className="text-[#9499A5]">Description</div>
					<div>
						<HYEditableDiv
							type="textarea"
							className="text-xs"
							placeholder="Add description"
							defaultText={data?.description}
							handleChange={(value) => handleIssueEdit(value, "description")}
						/>
					</div>
				</div>
				<div className="space-y-2">
					<div className="text-[#9499A5]">Sub Tasks</div>
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Checkbox /> Sub task 1
						</div>
						<div className="flex items-center gap-2">
							<Checkbox /> Sub task 2
						</div>
					</div>
				</div>
			</div>
			<Separator className="my-5 dark:bg-[#FFFFFF1A]" />
			<div className="space-y-3">
				<div className="space-y-2">
					<div>Comments</div>
					<CommentCreation issueId={data?._id} />
				</div>
				<div className="space-y-3 py-2">
					{commentsItems?.map((comment, i) => <CommentCard key={`${comment?._id}_${i}`} data={comment} />)}
				</div>
			</div>
			{/* </ScrollArea> */}
		</div>
	);
};

export default IssueDetailView;

export const CommentCard = ({ data }: { data: any }) => {
	return (
		<Card className="dark:bg-card dark:border-[#FFFFFF1A]">
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
