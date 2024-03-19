import { useEffect } from "react";
import { HiDatabase } from "react-icons/hi";
import { HiOutlineInbox } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import BoardCard from "./board-card";
import Urls from "@/redux/actions/Urls";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { IssueStatusTypes, IssueTypes, SprintTypes, UsersTypes } from "@/interfaces";
import { getAction, patchAction, reducerNameFromUrl, setBoardData } from "@/redux/actions/AppActions";

const Board = () => {
	const dispatch = useDispatch();

	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const sprintItems = sprintListData?.data?.items as SprintTypes[];

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issuesListData?.data?.items as IssueTypes[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items as UsersTypes[];

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];

	const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

	const authInfo = useSelector((state: any) => state.UserReducer);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const boardInfo = appProfileInfo?.board

	/*  ######################################################################################## */

	const getSprints = () => {
		let query = `?perPage=300&expand=created_by&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	const getUsers = () => {
		let query = `?perPage=300`;
		dispatch(getAction({ users: Urls.users + query }));
	};

	const getEpics = () => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
		dispatch(getAction({ epic: Urls.epic + query }));
	};

	const getIssues = () => {
		let query = `?perPage=300
				&filter=project_id=${appProfileInfo?.project_id}%26%26sprint_id=${boardInfo?.selected_sprint}
				${boardInfo?.type_filter_value !== "all" ? `%26%26type=${boardInfo?.type_filter_value}` : ""}
				${boardInfo?.points_filter_value !== "all" ? `&sort=${boardInfo.points_filter_value}` : ""}`;

		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const findTotalPoints = (data: any[]) => {
		return data?.reduce((accumulator, currentValue) => {
			return accumulator + +currentValue?.points;
		}, 0);
	};

	const getIssuesByTypes = (issueStatus: "Todo" | "Ongoing" | "Pending" | "Done") => {
		return issueListItems?.filter((issue) =>
			issue?.status === issueStatusList?.find(status => status?.name === issueStatus)?._id &&
			boardInfo?.selected_sprint && issue?.sprint_id === boardInfo?.selected_sprint);
	};


	const updateItemStatus = async (id: string, status_name: string) => {
		const resp = (await dispatch(patchAction({ issues: Urls.issues }, { status: issueStatusList?.find(issueStatus => issueStatus?.name === status_name)?._id }, id))) as any;
		const success = resp.payload?.status == 200;
		if (success) { getIssues() }
	};

	/*  ######################################################################################## */

	const sprintOptions =
		sprintItems?.map((sprnt) => ({
			value: sprnt?._id,
			label: sprnt?.name,
		})) ?? [];

	const selectedSprintInfo = sprintItems?.find(
		(sprnt) => sprnt?._id === boardInfo?.selected_sprint
	);

	const taskFilterOptions = userItems?.map(usr => {
		return (authInfo?.user?._id === usr?._id) ? ({ value: usr?._id, label: "My Tasks" }) : ({ value: usr?._id, label: usr.user_name })
	}) || []


	const typeFilterOptions = [
		{ label: "All", value: "all" },
		{ label: "Story", value: "story" },
		{ label: "Task", value: "task" },
		{ label: "Bug", value: "bug" },
	]

	const pointsFilterData = [
		{ label: "All", value: "all" },
		{ label: "Highest", value: "points" },
		{ label: "Lowest", value: "-points" },
	]

	/*  ######################################################################################## */

	useEffect(() => {
		if (appProfileInfo?.project_id) {
			getSprints();
			getUsers();
			getEpics();
		}
	}, [appProfileInfo?.project_id]);

	useEffect(() => {
		if (boardInfo?.selected_sprint && appProfileInfo?.project_id) {
			getIssues();
		}
	}, [boardInfo]);

	useEffect(() => {
		if (!boardInfo?.selected_sprint && sprintOptions?.length > 0) {
			dispatch(setBoardData(sprintOptions?.[0]?.value, "selected_sprint"))
		}
	}, [sprintListData])


	/*  ######################################################################################## */


	if (!appProfileInfo?.project_id) {
		return <NoProjectScreen />
	}

	return (
		<>
			<div className="text-xs">
				<div className="flex justify-between px-6 gap-2 items-center">
					<div className="text-base">
						<HYCombobox
							name="sprint"
							label={"Sprint :"}
							showSearch={false}
							options={sprintOptions}
							buttonClassName="border"
							defaultValue={boardInfo?.selected_sprint}
							onValueChange={(value) => dispatch(setBoardData(value, "selected_sprint"))}
						/>
					</div>
					<div className="flex gap-2">
						<HYCombobox
							label={"Assignee"}
							unSelectable={false}
							options={[{ label: "All", value: "all" }, ...taskFilterOptions]}
							defaultValue={boardInfo?.task_filter_value}
							onValueChange={(value) => dispatch(setBoardData(value, "task_filter_value"))}
						/>
						<HYCombobox
							label={"Type"}
							unSelectable={false}
							options={typeFilterOptions}
							defaultValue={boardInfo?.type_filter_value}
							onValueChange={(value) => dispatch(setBoardData(value, "type_filter_value"))}
						/>
						<HYCombobox
							label={"Points"}
							unSelectable={false}
							options={pointsFilterData}
							defaultValue={boardInfo?.points_filter_value}
							onValueChange={(value) => dispatch(setBoardData(value, "points_filter_value"))}
						/>
						<HYSearch />
					</div>
				</div>
				<div className="px-6 flex my-5">
					<div>
						{selectedSprintInfo?.start_date
							&& `${formatter.format(new Date(selectedSprintInfo?.start_date))}`}

						{selectedSprintInfo?.end_date
							&& ` - ${formatter.format(new Date(selectedSprintInfo?.end_date))}`}
					</div>
				</div>
				<EmptyBoardList show={issueListItems?.length < 0} />
				<div>
					<ResizablePanelGroup
						direction="horizontal"
						className={`rounded-lg`}
					>
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center dark:bg-[#131417] bg-[#F7F8F9] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "Todo");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Todo</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />{" "}
										{findTotalPoints(getIssuesByTypes("Todo"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)] ">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("Todo")?.map((tdInfo) => <BoardCard data={tdInfo} key={tdInfo?._id} />)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						{/* <ResizableHandle /> */}
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center dark:bg-[#131417] bg-[#F7F8F9] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "Ongoing");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Ongoing</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />{" "}
										{findTotalPoints(getIssuesByTypes("Ongoing"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("Ongoing")?.map((tdInfo) => <BoardCard data={tdInfo} key={tdInfo?._id} />)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							<div
								className=" text-center dark:bg-[#131417] bg-[#F7F8F9] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "Pending");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Pending</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										{findTotalPoints(getIssuesByTypes("Pending"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("Pending")?.map((tdInfo) => <BoardCard data={tdInfo} key={tdInfo?._id} />)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center dark:bg-[#131417] bg-[#F7F8F9] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "Done");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Done</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										{findTotalPoints(getIssuesByTypes("Done"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("Done")?.map((tdInfo) => <BoardCard data={tdInfo} key={tdInfo?._id} />)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>

				</div>
			</div>
		</>
	);
};

export default Board;


const EmptyBoardList = ({ show }: { show: boolean }) => {
	if (show) {
		return (
			<div className="dark:text-foreground flex justify-center h-[calc(100vh-100px)] items-center">
				<div className="flex flex-col justify-center items-center text-center gap-3">
					<div>
						<HiOutlineInbox className="text-primary h-20 w-20 " />
					</div>
					<div className="text-primary text-3xl font-semibold">
						Nothing here!
					</div>
					<div className="dark:text-foreground">
						You have not been assigned any tasks
					</div>
				</div>
			</div>
		);
	}
}