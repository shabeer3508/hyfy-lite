import dayjs from "dayjs";
import { useEffect } from "react";
import HYAvatar from "../HYAvatar";
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import HYEditableDiv from "../HYEditableDiv";
import { HiBookOpen } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import CommentCreation from "../forms/comment-creation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { HiDatabase, HiDotsVertical, HiOutlineClock } from "react-icons/hi";
import { getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const IssueDetailView = ({ data }: { data: any }) => {
	const dispatch = useDispatch()

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const commentsReducerName = reducerNameFromUrl("comments", "GET");
	const commentsItems = useSelector((state: any) => state?.[commentsReducerName])?.data?.items;

	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicItems = useSelector((state: any) => state?.[epicReducerName])?.data?.items;

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items;

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueItems = issuesListData?.data?.items;

	const sprintListData = useSelector((state: any) => state?.GetSprints)?.data?.items;

	/*  ######################################################################################## */

	const getComments = () => {
		let query = `?expand=created_by&sort=-createdAt&filter=issue_id=${data?._id}`;
		dispatch(getAction({ comments: Urls.comments + query }));
	}

	const getIssues = () => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const handleIssueEdit = (value, field: string) => {

		let postData = { [field]: value !== "" ? value : null };

		if (value === "" && field === "sprint_id") {
			postData = { ...postData, status: issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id }
		}

		(dispatch(patchAction({ issues: Urls.issues }, postData, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getIssues();
			}
		})
	}

	/*  ######################################################################################## */

	const statusOptions = issueStatusList?.map(status => ({ label: status?.name, value: status?._id }));

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

	console.log("🚀 ~ IssueDetailView ~ data:", data)


	return (
		<div>
			<div className="flex gap-2 text-xl items-center">
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
					<HYEditableDiv className="text-xl" defaultText={data?.name} handleChange={(value) => handleIssueEdit(value, "name")} />
				</div>
			</div>
			<div className="grid grid-cols-6 pt-5">
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Epic</div>
						<div className=" flex flex-1 items-center mr-4 ">
							<HYCombobox
								unSelectable={true}
								options={epicOptions}
								buttonClassName="w-full"
								defaultValue={data?.epic_id}
								onValueChange={(value) => handleIssueEdit(value, "epic_id")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Sprint</div>
						<div className=" flex flex-1 items-center mr-4">
							<HYCombobox
								unSelectable={true}
								options={sprintOptions}
								buttonClassName="w-full"
								defaultValue={data?.sprint_id}
								onValueChange={(value) => handleIssueEdit(value, "sprint_id")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">
							Estimation Points
						</div>
						<div className=" flex flex-1 items-center gap-2">
							<HYCombobox
								label={<HiDatabase />}
								options={pointOptions}
								buttonClassName="w-full mr-4"
								defaultValue={data?.points?.toString()}
								onValueChange={(value) => handleIssueEdit(value, "points")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Hours</div>
						<div className=" flex flex-1 items-center">
							<HYCombobox
								label={<HiOutlineClock />}
								options={estimatedHours}
								buttonClassName="w-full mr-4"
								defaultValue={data?.estimated_hours?.toString()}
								onValueChange={(value) => handleIssueEdit(value, "estimated_hours")}

							/>
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Dependency</div>
						<div className=" flex flex-1 items-center">
							<HYCombobox
								unSelectable={true}
								options={issueOptions}
								buttonClassName="w-full mr-4"
								defaultValue={data?.dependency}
								onValueChange={(value) => handleIssueEdit(value, "dependency")}
							/>
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col w-full gap-3">
						<div className="text-xs text-[#9499A5]">Status</div>
						<HYCombobox
							defaultValue={data?.status}
							options={statusOptions}
							buttonClassName="w-full mr-4"
							onValueChange={(value) => handleIssueEdit(value, "status")}
						/>
					</div>
				</div>
			</div>
			<Separator className="mt-5" />
			<ScrollArea className="max-h-[500px] overflow-auto pr-5 ">
				<div className="flex justify-between mt-5 items-center">
					<div className="flex flex-col gap-2 w-full">
						<div className=" flex justify-between w-full text-xs ">
							<div className="text-[#9499A5]">Assigned To</div>
							<div className="text-primary cursor-pointer">Add</div>
						</div>
						<div className="flex gap-2 ">
							<div className="flex gap-4 items-center border p-3 rounded">
								<HYAvatar name={"Jhon"} />

								<div className="text-xs">
									<div>User Name</div>
									<div className="text-[#FFFFFF66]">Manger</div>
								</div>

								<div className="text-xs">
									<Button className="" size="icon" variant="ghost">
										<HiDotsVertical />
									</Button>
								</div>
							</div>

							<div className="flex gap-4 items-center border p-3 rounded">
								<HYAvatar name={"Jhon"} />

								<div className="text-xs">
									<div>User Name</div>
									<div className="text-[#FFFFFF66]">Manger</div>
								</div>

								<div className="text-xs">
									<Button className="" size="icon" variant="ghost">
										<HiDotsVertical />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-5" />
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
					{/* <div className="space-y-2">
						<div className="text-[#9499A5]">Sub Tasks</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Checkbox /> Kill Bugs 1
							</div>
							<div className="flex items-center gap-2">
								<Checkbox /> Kill Bugs 2
							</div>
						</div>
					</div> */}
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
