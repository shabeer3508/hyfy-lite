import { useEffect } from "react";
import { HiDatabase, HiOutlineDotsHorizontal, HiOutlineDotsVertical, HiPlus } from "react-icons/hi";
import { HiOutlineInbox } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import BoardCard, { BoardCardSkeleton } from "./board-card";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { IssueStatusTypes, IssueTypes, SprintTypes, UsersTypes } from "@/interfaces";
import { getAction, patchAction, reducerNameFromUrl, setBoardData } from "@/redux/actions/AppActions";
import IssueCreationForm from "../issues/forms/issue-creation";
import IssueCreationCardMini from "../issues/forms/issue-creation-mini";
import { Button } from "@/components/ui/button";
import HYEditableDiv from "@/components/hy-components/HYEditableDiv";

const Board = () => {
	const dispatch = useDispatch();

	// const sprintListData = useSelector((state: any) => state?.GetSprints);
	// const sprintItems = sprintListData?.data?.items as SprintTypes[];

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issuesListData?.data?.items as IssueTypes[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items as UsersTypes[];

	// const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	// const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];

	// const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

	const authInfo = useSelector((state: any) => state.UserReducer);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const boardInfo = appProfileInfo?.board;


	const stagesReducerName = reducerNameFromUrl("stagesList", "GET");
	const stagesData = useSelector((state: any) => state?.[stagesReducerName]);
	const stagesItems = stagesData?.data?.data?.stages as IssueStatusTypes[]

	// const userItems = usersList?.data?.items as UsersTypes[];

	/*  ######################################################################################## */

	// const getSprints = () => {
	// 	let query = `?perPage=300&expand=created_by&filter=project_id=${appProfileInfo?.project_id}`;
	// 	dispatch(getAction({ sprints: Urls.sprints + query }));
	// };

	const getStages = () => {
		dispatch(getAction({ stagesList: Urls.stages_list + `/${appProfileInfo?.project_id}` }));
	}



	// const getEpics = () => {
	// 	let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
	// 	dispatch(getAction({ epic: Urls.epic + query }));
	// };

	const getIssues = () => {
		let query = `?perPage=300
				&filter=project_id=${appProfileInfo?.project_id}
				${boardInfo?.type_filter_value !== "all" ? `%26%26type=${boardInfo?.type_filter_value}` : ""}
				${boardInfo?.points_filter_value !== "all" ? `&sort=${boardInfo.points_filter_value}` : ""}`;

		dispatch(getAction({ issues: Urls.issues + query }));
	};

	// const findTotalPoints = (data: any[]) => {
	// 	return data?.reduce((accumulator, currentValue) => {
	// 		return accumulator + +currentValue?.points;
	// 	}, 0);
	// };

	const getIssuesByStageId = (stageId: string) => {
		return issueListItems?.filter((issue) =>
			issue?.status === stagesItems?.find(stage => stage?._id === stageId)?._id && isUserIncludes(issue));
	};


	const isUserIncludes = (issueInfo: IssueTypes) => {
		if (boardInfo?.task_filter_value === "all") {
			return true
		} else if (boardInfo?.task_filter_value === "unassigned") {
			return issueInfo?.assign_to?.length == 0;
		} else {
			return issueInfo?.assign_to?.some(user => user === boardInfo?.task_filter_value);
		}
	}


	const updateItemStatus = async (id: string, stageId: string) => {
		const resp = (await dispatch(patchAction({ issues: Urls.issues }, { status: stageId }, id))) as any;
		const success = resp.payload?.status == 200;
		if (success) { getIssues() }
	};

	const updateStageInfo = async (id: string, key: string, value: string) => {
		const resp = (await dispatch(patchAction({ stages: Urls.stages }, { [key]: value }, id))) as any;
		const success = resp.payload?.status == 200;
		if (success) {
			getStages()
		}

	}

	/*  ######################################################################################## */

	// const sprintOptions =
	// 	sprintItems?.map((sprnt) => ({
	// 		value: sprnt?._id,
	// 		label: sprnt?.name,
	// 	})) ?? [];

	// const selectedSprintInfo = sprintItems?.find(
	// 	(sprnt) => sprnt?._id === boardInfo?.selected_sprint
	// );

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
		{ label: "Highest", value: "-points" },
		{ label: "Lowest", value: "points" },
	]

	/*  ######################################################################################## */

	// useEffect(() => {
	// 	if (appProfileInfo?.project_id) {
	// 		// getSprints();
	// 		getEpics();
	// 	}
	// }, [appProfileInfo?.project_id]);

	useEffect(() => {
		if (appProfileInfo?.project_id) {
			getStages()
			getIssues();
		}
	}, [boardInfo]);

	// useEffect(() => {
	// 	if (!boardInfo?.selected_sprint && sprintOptions?.length > 0) {
	// 		dispatch(setBoardData(sprintOptions?.[0]?.value, "selected_sprint"))
	// 	}
	// }, [sprintListData])


	const dummyStages = Array.from({ length: 4 }).map((data, i) => ({ _id: `ID00${i + 1}`, name: `Stage-${i + 1}`, order: i + 1 }))

	console.log("🚀 ~ Board ~ dummyStages:", dummyStages)
	/*  ######################################################################################## */


	if (!appProfileInfo?.project_id) {
		return <NoProjectScreen />
	}

	return (
		<>
			<div className="text-xs">
				<div className="flex justify-between px-6 gap-2 items-center">
					<div className="text-base">
						{/* <HYCombobox
							name="sprint"
							label={"Sprint :"}
							showSearch={false}
							options={sprintOptions}
							buttonClassName="border"
							defaultValue={boardInfo?.selected_sprint}
							onValueChange={(value) => dispatch(setBoardData(value, "selected_sprint"))}
						/> */}
					</div>
					<div className="flex gap-2">
						<HYCombobox
							label={"Assignee"}
							unSelectable={false}
							options={[
								{ label: "All", value: "all" },
								...taskFilterOptions,
								{ label: "Unassigned", value: "unassigned" }
							]}
							defaultValue={boardInfo?.task_filter_value}
							onValueChange={(value) => dispatch(setBoardData(value, "task_filter_value"))}
						/>
						{/* <HYCombobox
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
						/> */}
						{/* <HYSearch /> */}
						<IssueCreationForm>
							<div className="flex justify-center items-center border py-2 px-4 gap-1 rounded h-10 border-primary text-primary cursor-pointer text-sm whitespace-nowrap">
								Add Task
								<HiPlus className="h-5 w-5 " />
							</div>
						</IssueCreationForm>
					</div>
				</div>
				<div className="px-6 flex my-5">
					<div>
						{/* {selectedSprintInfo?.start_date
							&& `${formatter.format(new Date(selectedSprintInfo?.start_date))}`}

						{selectedSprintInfo?.end_date
							&& ` - ${formatter.format(new Date(selectedSprintInfo?.end_date))}`} */}
					</div>
				</div>
				<EmptyBoardList show={issueListItems?.length < 0} />
				<div className="flex overflow-auto w-[calc(100vw-30px)] md:w-[calc(100vw-240px)]">
					{stagesItems?.map((stage, i) => {
						return <div
							key={i}
							className="text-center dark:bg-[#131417] bg-[#F7F8F9] rounded mx-1 min-w-[300px] mb-3"
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								e.preventDefault();
								updateItemStatus(e?.dataTransfer?.getData("id"), stage?._id);
							}}
						>
							<div className="flex justify-between items-center px-3 py-2">
								<div className="p-1 px-2">
									<HYEditableDiv
										placeholder="Column name"
										className="bg-[#F7F8F9] pr-2"
										defaultText={stage?.name}
										handleChange={(value) => updateStageInfo(stage?._id, "name", value)} />
								</div>
								<div className="flex items-center">
									<Button className="" size="icon" variant="ghost">
										<HiOutlineDotsHorizontal />
									</Button>
								</div>
							</div>
							<ScrollArea className="h-[calc(100vh-240px)] ">
								<div className="flex flex-col px-5 py-2 gap-3">
									<div className=" w-full  bg-[#F7F8F9] dark:bg-[#111215] ">
										<div className="flex items-center">
											<IssueCreationCardMini statusId={stage?._id} />
										</div>
									</div>
									{getIssuesByStageId(stage?._id)?.map((tdInfo) => <BoardCard data={tdInfo} key={tdInfo?._id} />)}
									{issuesListData?.loading && <BoardCardSkeleton />}
								</div>
							</ScrollArea>
						</div>
					})}

					<div className="text-center dark:bg-[#131417] rounded mx-1">
						<Button variant="outline" className="border border-primary" title="Add Column">
							<HiPlus className="text-primary" />
						</Button>
					</div>


				</div>
			</div >
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