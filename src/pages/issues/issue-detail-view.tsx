import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { TbSubtask } from "react-icons/tb";
import { useEffect, useState } from "react";
import { FcTemplate } from "react-icons/fc";
import { TiAttachmentOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { HiUser, HiXMark, HiOutlineUserPlus } from "react-icons/hi2";
import { HiDatabase, HiOutlineClock, HiOutlineDotsHorizontal, HiOutlineX } from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import HYEditableDiv from "@/components/hy-components/HYEditableDiv";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import CommentCard from "@/components/hy-components/cards/comment-card";
import ComboboxPopover from "@/components/hy-components/HYComboboxPopover";
import HYAvatar, { getInitials } from "@/components/hy-components/HYAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommentCreation from "@/components/hy-components/forms/comment-creation";
import { deleteAction, getAction, patchAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { CommentsTypes, StagesTypes, IssueTypes, ProjectType, SubTaskTypes, UsersTypes } from "@/interfaces";


const IssueDetailView = ({ data }: { data: IssueTypes }) => {
	const dispatch = useDispatch();
	const [showSubTaskCreation, setShowSubTaskCreation] = useState(false);
	const [showUserSelection, setShowUserSelection] = useState(false);


	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const commentsReducerName = reducerNameFromUrl("comments", "GET");
	const commentsItems = useSelector((state: any) => state?.[commentsReducerName])?.data?.items as CommentsTypes[];

	const subTasksReducerName = reducerNameFromUrl("subTasks", "GET");
	const subTasks = useSelector((state: any) => state?.[subTasksReducerName])?.data?.items as SubTaskTypes[];

	const reducerName = reducerNameFromUrl("project", "GET");
	const projectList = useSelector((state: any) => state?.[reducerName])?.data?.items as ProjectType[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

	const stagesReducerName = reducerNameFromUrl("stagesList", "GET");
	const stagesData = useSelector((state: any) => state?.[stagesReducerName]);
	const stagesItems = stagesData?.data?.data?.stages as StagesTypes[]

	/*  ######################################################################################## */

	const getComments = () => {
		let query = `?expand=created_by&sort=-createdAt&filter=issue_id=${data?._id}`;
		dispatch(getAction({ comments: Urls.comments + query }));
	}

	const getSubTasks = () => {
		let query = `?expand=assign_to&issue_id=${data?._id}`;
		dispatch(getAction({ subTasks: Urls.sub_tasks + query }));
	}

	const getIssues = () => {
		let query = `?perPage=300&expand=epic_id&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getAttachments = () => {
		console.log("🚀 ~ getAttachments ~ data:", data?.file_name);
	}

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




	const handleAddAttachment = async (e) => {
		const file = e.target.files[0];

		const formData = new FormData();
		if (file) {
			formData.append('file', file);
			formData.append('issue_id', data?._id);
		}


		(dispatch(postAction({ issueAttachment: Urls.issue_attachment }, formData)) as any).then((res) => {
			if (res.payload?.status === 200) {
				toast.success("Attachment added successfully");
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

	const taskOptions = [
		{ label: "Delete", action: () => handleIssueDelete(), isAlertDialog: true },
	];

	const subTaskProgress = (subTasks?.filter(task => task?.isCompleted)?.length / subTasks?.length) * 100;

	/*  ######################################################################################## */

	useEffect(() => {
		getComments();
		getSubTasks();

		if (data?.file_name) {
			getAttachments();
		}
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
						<HYDropDown options={taskOptions}>
							<Button size="sm" variant="ghost">
								<div>
									<HiOutlineDotsHorizontal className="text-base stroke-2" />
								</div>
							</Button>
						</HYDropDown>

						<DialogClose className="p-1 hover:bg-[#F1F5F9]">
							<HiXMark className="text-base stroke-2" />
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


						<div className="flex justify-between mt-5 items-center pr-5">
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
													<div key={`${userId}`} className="flex gap-4 items-center justify-between border dark:border-[#FFFFFF1A] pl-3 pr-1 py-1 rounded w-full group">
														<div className="flex gap-3">
															<HYAvatar name={userInfo?.user_name} />
															<div className="text-xs">
																<div className="truncate capitalize">{userInfo?.user_name}</div>
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
										<div className="mt-2 ">
											<HYCombobox
												unSelectable
												name="assignee"
												options={usersOptions}
												buttonClassName="border "
												placeholder="Assignee"
												label={<HiOutlineUserPlus className="size-4" />}
												onValueChange={(value: string) => handleAssignIssueUser(value, "assign")}
											/>
										</div>
									}
								</div>
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


						<div className="space-y-2 text-xs pr-5">
							<div className="text-[#9499A5] text-sm">Sub tasks</div>
							<div className="flex items-center gap-2">
								<Progress className="h-2" value={subTaskProgress} />{!isNaN(subTaskProgress) && `${subTaskProgress?.toFixed(0)}%`}
							</div>
							<div className="space-y-2">

								{subTasks?.map((subtask, i) => {
									return (
										<SubTaskCard key={subtask?._id} idx={i} subtask={subtask} getSubTasks={getSubTasks} />
									)
								})}

							</div>
						</div>

						<div className="pr-5 pl-6">
							<SubTaskCreationCard
								data={data}
								show={showSubTaskCreation}
								close={() => setShowSubTaskCreation(false)}
								getSubTasks={getSubTasks}
							/>
						</div>

						<div className="flex w-full gap-1 mt-3 pr-5">
							<Button
								variant="outline"
								onClick={() => { setShowSubTaskCreation(true) }}
								className={`bg-[#F1F5F9] dark:bg-[#383b42] dark:hover:bg-[#494c53] hover:bg-[#d7d8da]  border-0 flex gap-1 ${showSubTaskCreation && "hidden"}`}
							>
								<TbSubtask />Add a sub task
							</Button>

							<Label htmlFor="attachment" className="flex gap-1 cursor-pointer ">
								<div className="bg-[#F1F5F9] dark:bg-[#383b42] dark:hover:bg-[#494c53] hover:bg-[#d7d8da] border-0 rounded flex gap-1 py-1 px-3 items-center justify-center">
									<TiAttachmentOutline className="" /> Attach
								</div>
							</Label>

							<Input type="file" id="attachment" className="hidden" onChange={handleAddAttachment} />

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
	data: IssueTypes;
	close: () => void;
	getSubTasks: () => void;
}

const SubTaskCreationCard: React.FC<SubTaskCreationCardProps> = ({ show, close, getSubTasks, data }) => {

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersListData = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

	const { register, reset, setValue, handleSubmit } = useForm();
	const dispatch = useDispatch();



	const handleSubTaskCreation = (values) => {
		const postData = {
			...values,
			isCompleted: false,
			issue_id: data?._id
		};

		(dispatch(postAction({ subTasks: Urls.sub_tasks }, postData)) as any).then((res) => {
			if (res?.payload?.status == 200) {
				getSubTasks();
				reset();
				close();
			}
		})

	}

	const usersOptions =
		usersListData?.map((user) => ({
			value: user?._id,
			label: user?.user_name,
		})) ?? [];


	if (!show) {
		return <></>
	}

	return (
		<form onSubmit={handleSubmit(handleSubTaskCreation)}>
			<div className="py-2 flex flex-col gap-2">
				<div>
					<Input {...register("title")} placeholder="Add a subtask" className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-primary dark:bg-card" />
				</div>
				<div className="flex justify-between">
					<div className="flex gap-1">
						<Button size="sm">Add</Button>
						<Button type="button" size="sm" variant="ghost" onClick={() => close()}>Cancel</Button>
					</div>
					<div>
						<HYCombobox
							unSelectable
							name="assignee"
							options={usersOptions}
							buttonClassName="border-0"
							placeholder="Assignee"
							label={<HiOutlineUserPlus className="size-4" />}
							onValueChange={(value: string) => setValue("assign_to", value === "" ? null : value)}
						/>
					</div>
				</div>
			</div>
		</form>
	)
}


const SubTaskCard = ({ subtask, getSubTasks, idx }: { subtask: SubTaskTypes, getSubTasks: () => void, idx?: number }) => {

	const dispatch = useDispatch();

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersListData = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

	/*  ######################################################################################## */

	const handleSubTaskDelete = () => {
		(dispatch(deleteAction(Urls.sub_tasks, subtask?._id)) as any).then((res) => {
			if (res.payload.status === 200) { getSubTasks() }
		});
	}

	const handleTaskUpdate = (key: string, value: string | boolean) => {
		(dispatch(patchAction({ subTasks: Urls.sub_tasks }, { [key]: value }, subtask?._id)) as any).then((res) => {
			if (res.payload.status === 200) { getSubTasks() }
		});
	}

	const handleSubTaskAssignee = () => {
		// TODO:
	}

	/*  ######################################################################################## */

	const usersOptions = usersListData?.map((user) => ({ value: user?._id, label: user?.user_name }));
	const subTaskOptions = [
		{ label: "Delete", action: () => handleSubTaskDelete() },
	];
	const logoColors = [
		"bg-[#71A4FF]",
		"bg-[#FF6481]",
		"bg-[#4C4878]",
		"bg-[#A4599A]",
		"bg-[#E2A766]",
		"bg-[#389C98]",
	];

	/*  ######################################################################################## */


	return (
		<div className="flex items-center gap-2">
			<Checkbox className="rounded" checked={subtask?.isCompleted} onCheckedChange={() => handleTaskUpdate("isCompleted", !subtask?.isCompleted)} />
			<div className="bg-[#F1F5F9] dark:bg-[#26282E] w-full min-h-7 py-1 px-3 rounded flex justify-between items-center group">
				<div className="w-full pr-3">
					<HYEditableDiv className="bg-[#F1F5F9] text-xs w-full" defaultText={subtask?.title} handleChange={(value) => handleTaskUpdate("title", value)} />
				</div>
				<div className="opacity-0 group-hover:opacity-100 flex gap-3 py-1">

					{typeof subtask?.assign_to !== "string" &&
						<ComboboxPopover placeholder="Search user" options={usersOptions} onChange={(data) => handleTaskUpdate("assign_to", data?.value)}>
							{subtask?.assign_to?.length === 0 ?
								<div
									className={`size-5 rounded-full ${logoColors[idx % 6]} hover:opacity-80 text-white flex items-center justify-center cursor-pointer`}
									title="Unassigned"
								>
									<HiUser className="" />
								</div>
								:
								<div
									className={`size-5 capitalize rounded-full ${logoColors[idx % 6]} hover:opacity-80 text-white flex items-center justify-center cursor-pointer`}
									title={subtask?.assign_to?.[0].user_name}
								>
									{getInitials(subtask?.assign_to?.[0].user_name)}
								</div>
							}
						</ComboboxPopover>
					}

					<HYDropDown options={subTaskOptions}>
						<div className="size-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center cursor-pointer">
							<HiOutlineDotsHorizontal className="text-black" />
						</div>
					</HYDropDown>
				</div>
			</div>
		</div>
	)
}

