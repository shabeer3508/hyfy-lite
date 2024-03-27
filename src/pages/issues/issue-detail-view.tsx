import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiBookOpen, HiUser, HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { HiDatabase, HiDotsVertical, HiOutlineClock, HiOutlineDotsHorizontal, HiOutlineDotsVertical, HiOutlineX } from "react-icons/hi";

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
import { CommentsTypes, EpicTypes, IssueStatusTypes, IssueTypes, ProjectType, SprintTypes, UsersTypes } from "@/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { SliderProps } from "@radix-ui/react-slider";
import { DialogClose } from "@/components/ui/dialog";
import { FcDisplay, FcTemplate } from "react-icons/fc";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { TiAttachmentOutline } from "react-icons/ti";
import { TbSubtask } from "react-icons/tb";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { Input } from "@/components/ui/input";


const IssueDetailView = ({ data }: { data: IssueTypes }) => {
	const dispatch = useDispatch();
	const [showUserSelection, setShowUserSelection] = useState(false);
	const [showSubTaskCreation, setShowSubTaskCreation] = useState(false);

	// const [progress, setProgress] = useState<SliderProps["defaultValue"]>([data?.progress]);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const commentsReducerName = reducerNameFromUrl("comments", "GET");
	const commentsItems = useSelector((state: any) => state?.[commentsReducerName])?.data?.items as CommentsTypes[];

	const reducerName = reducerNameFromUrl("project", "GET");
	const projectList = useSelector((state: any) => state?.[reducerName])?.data?.items as ProjectType[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

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
				toast.success("Task deleted successfully")
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

	const handleAssignSingleUser = (userId: string) => {
		data?.assign_to.length > 0 && dispatch(patchAction({ issues: Urls.issues + "/remove" }, { user_id: data?.assign_to[0] }, data?._id));
		(dispatch(patchAction({ issues: Urls.issues + "/assign" }, { user_id: userId }, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		});
	}


	/*  ######################################################################################## */

	const currentProjectName = projectList?.find((prjct) => prjct._id === appProfileInfo?.project_id)?.title;

	const statusOptions = stagesItems?.map(status => ({ label: status?.name, value: status?._id }));


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

	const priorityOptions = [
		{ label: "Low", value: "low" },
		{ label: "Medium", value: "medium" },
		{ label: "High", value: "high" },
		{ label: "Critical", value: "critical" },
	];


	const estimatedHours = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
	];

	const issueOptions = [
		{ label: "Delete", action: () => handleIssueDelete(), isAlertDialog: true },
	];

	const dummySubTasks = Array.from({ length: 2 }).map((data, i) => ({ _id: `ID00${i + 1}`, title: `Task-${i + 1}`, isCompleted: i % 2 === 0, issue_id: "", is_deleted: false }));


	const subTaskProgress = (dummySubTasks?.filter(task => task?.isCompleted)?.length / dummySubTasks?.length) * 100;


	/*  ######################################################################################## */

	useEffect(() => {
		getComments()
	}, [data?._id])

	/*  ######################################################################################## */


	return (
		<div className="overflow-auto max-h-[70vh] pr-2">
			<div className="w-full">

				<div className="w-full flex justify-between items-center pl-1">
					<div className="flex items-center gap-2 text-xs select-none">
						<FcTemplate className="size-5" />
						{currentProjectName}
					</div>
					<div className="flex">
						<HYDropDown options={issueOptions}>
							<Button size="sm" variant="ghost">
								<HiOutlineDotsHorizontal className="text-base stroke-2" />
							</Button>
						</HYDropDown>

						<DialogClose>
							<Button size="sm" variant="ghost">
								<HiXMark className="text-base stroke-2" />
							</Button>
						</DialogClose>
					</div>
				</div>

				<div className="flex pl-1">
					<div className="w-2/3">
						<div className="flex gap-2 text-xl items-center pr-5">

							{data?.type === "task" && (
								<img src="/task_icon.svg" alt="task" height={20} width={20} />
							)}

							<div className="flex-1">
								<HYEditableDiv className="text-xl dark:bg-card" defaultText={data?.name} handleChange={(value) => handleIssueEdit(value, "name")} />
							</div>
						</div>



						<div className="space-y-1 pr-5 py-3 text-xs">
							<div className="text-[#9499A5] text-sm ">Description</div>
							<div>
								<HYEditableDiv
									type="textarea"
									className="text-xs border p-1 "
									placeholder="Add description"
									defaultText={data?.description}
									handleChange={(value) => handleIssueEdit(value, "description")}
								/>
							</div>
						</div>



						{/* <div className=" flex-col gap-3 pr-5 text-xs hidden">
							<div className="flex gap-1">
								<Slider
									defaultValue={[data?.progress]}
									onValueChange={setProgress}
									value={progress}
									max={100}
									step={1}
									className={cn("w-[100%]",)}
								/>
								<div className="">
									<Button
										className={`border border-primary text-primary ${data?.progress === progress[0] && "opacity-0"}`}
										variant="outline"
										onClick={() => handleIssueEdit(progress[0], "progress")}
									>
										Apply
									</Button>

								</div>
							</div>
						</div> */}


						<div className="space-y-2 text-xs pr-5">
							<div className="text-[#9499A5] text-sm">Sub tasks</div>
							<div className="flex items-center gap-2">
								<Progress className="h-2" value={subTaskProgress} />{!isNaN(subTaskProgress) && `${subTaskProgress}%`}
							</div>
							<div className="space-y-2">

								{dummySubTasks?.map((subtask, i) => {
									return (
										<SubTaskCard key={subtask?._id} subtask={subtask} />
									)
								})}

							</div>
						</div>

						<div className="pr-5 pl-6">
							<SubTaskCreationCard show={showSubTaskCreation} close={() => setShowSubTaskCreation(false)} />
						</div>

						<div className="flex w-full gap-1 mt-3 pr-5">
							<Button
								onClick={() => {
									setShowSubTaskCreation(true)
								}}
								variant="outline"
								className="bg-[#F1F5F9] dark:bg-[#383b42] dark:hover:bg-[#494c53] hover:bg-[#d7d8da]  border-0 flex gap-1"
							>
								<TbSubtask />Add a sub task
							</Button>
							<Button variant="outline" className="bg-[#F1F5F9] dark:bg-[#383b42] dark:hover:bg-[#494c53] hover:bg-[#d7d8da]  border-0 flex gap-1">
								<TiAttachmentOutline className="" /> Attach
							</Button>
						</div>

					</div>

					<div className="w-1/3 rounded py-1">
						<div className="border rounded p-4 dark:bg-[#26282e]">
							<div>Details</div>
							<div className="grid grid-cols-2 items-center gap-1">
								<div className="text-xs text-[#9499A5]">Status</div>
								<div className="flex flex-1 items-center">
									<HYCombobox
										defaultValue={data?.status}
										options={statusOptions}
										buttonClassName="w-full dark:bg-card bg-[#F1F5F9] dark:border-[#FFFFFF1A] border-0"
										onValueChange={(value) => handleIssueEdit(value, "status")}
									/>
								</div>
								<div className="text-xs text-[#9499A5]">Assignee</div>
								<div className="flex flex-1 items-center">

									<HYCombobox
										defaultValue={data?.assign_to[0]}
										options={usersOptions}
										buttonClassName="w-full dark:bg-card bg-[#F1F5F9] dark:border-[#FFFFFF1A] border-0"
										optionsClassName="w-[200px]"
										onValueChange={(value: string) => {
											handleAssignSingleUser(value);
										}}
									/>
								</div>
								<div className="text-xs text-[#9499A5]">Priority</div>
								<div className=" flex flex-1 items-center">
									<HYCombobox
										unSelectable={true}
										options={priorityOptions}
										buttonClassName="w-full dark:bg-card bg-[#F1F5F9] dark:border-[#FFFFFF1A] border-0"
										defaultValue={data?.priority}
										onValueChange={(value) => handleIssueEdit(value, "priority")}
									/>
								</div>
								<div className="text-xs text-[#9499A5]">
									Estimation Points
								</div>
								<div className=" flex flex-1 items-center gap-2">
									<HYCombobox
										label={<HiDatabase />}
										options={pointOptions}
										buttonClassName="w-full  dark:bg-card bg-[#F1F5F9] dark:border-[#FFFFFF1A] border-0"
										defaultValue={data?.points?.toString()}
										onValueChange={(value) => handleIssueEdit(value, "points")}
									/>
								</div>
								<div className="text-xs text-[#9499A5]">Hours</div>
								<div className=" flex flex-1 items-center">
									<HYCombobox
										label={<HiOutlineClock />}
										options={estimatedHours}
										buttonClassName="w-full  dark:bg-card bg-[#F1F5F9] dark:border-[#FFFFFF1A] border-0"
										defaultValue={data?.estimated_hours?.toString()}
										onValueChange={(value) => handleIssueEdit(value, "estimated_hours")}

									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Separator className="my-5 dark:bg-[#FFFFFF1A]" />
			<Tabs defaultValue="comments" className="">
				<TabsList className="rounded">
					<TabsTrigger value="comments" className="flex gap-1 rounded">
						Comments
					</TabsTrigger>
					<TabsTrigger value="history" className="flex gap-1 rounded">
						History
					</TabsTrigger>
				</TabsList>

				<TabsContent value={"comments"}>
					<div className="space-y-3">
						<div className="space-y-2">
							<CommentCreation issueId={data?._id} />
						</div>
						<div className="space-y-3 py-1">
							{commentsItems?.map((comment, i) => <CommentCard key={`${comment?._id}_${i}`} data={comment} />)}
						</div>
					</div>
				</TabsContent>

				<TabsContent value={"history"}>
					<div className="space-y-3 text-xs text-center">
						History is currently not available
					</div>
				</TabsContent>
			</Tabs>
		</div >
	);
};

export default IssueDetailView;

interface SubTaskCreationCardProps {
	show: boolean;
	close: () => void;
}

const SubTaskCreationCard: React.FC<SubTaskCreationCardProps> = ({ show, close }) => {

	if (!show) {
		return <></>
	}

	return (
		<form>
			<div className="py-2 flex flex-col gap-2">
				<div>
					<Input placeholder="Add a subtask" className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-primary dark:bg-card" />
				</div>
				<div className="flex justify-between">
					<div className="flex gap-1">
						<Button size="sm">Add</Button>
						<Button size="sm" variant="ghost" onClick={() => close()}>Cancel</Button>
					</div>
					<div>
						<Button size="sm" variant="ghost" className="flex gap-1">
							<HiOutlineUserPlus />
							Assign
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}


const SubTaskCard = ({ subtask }: any) => {

	const handleSubTaskDelete = () => {
		// TODO:
	}

	const handleSubTaskAssignee = () => {
		// TODO:
	}

	return <div key={subtask?._id} className="flex items-center gap-2">
		<Checkbox className="rounded" checked={subtask?.isCompleted} />
		<div className="bg-[#F1F5F9] w-full min-h-7 py-1 px-3 rounded flex justify-between items-center group">
			<div className="w-full pr-3">
				<HYEditableDiv className="bg-[#F1F5F9] text-xs w-full" defaultText={subtask?.title} handleChange={() => { }} />
			</div>
			<div className="opacity-0 group-hover:opacity-100 flex gap-3 py-1">
				<div className="size-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center cursor-pointer">
					<HiUser />
				</div>
				<div className="size-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center cursor-pointer">
					<HiOutlineDotsHorizontal className="cursor-pointer" />
				</div>
			</div>
		</div>
	</div>
}

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
