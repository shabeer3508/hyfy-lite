import { HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import { HiOutlineInbox } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { StageCard, StageCreation } from "./stage-card";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import IssueCreationForm from "../issues/forms/issue-creation";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { IssueStatusTypes, IssueTypes, UsersTypes } from "@/interfaces";
import { getAction, reducerNameFromUrl, setBoardData } from "@/redux/actions/AppActions";


const Board = () => {
	const dispatch = useDispatch();

	const [showStageCreation, setStageCreation] = useState(false)

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issuesListData?.data?.items as IssueTypes[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items as UsersTypes[];

	const appInfo = useSelector((state: any) => state.AppReducer);
	const sidebar = useSelector((state: any) => state.SidebarReducer);
	const authInfo = useSelector((state: any) => state.UserReducer);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const boardInfo = appProfileInfo?.board;

	const stagesReducerName = reducerNameFromUrl("stagesList", "GET");
	const stagesData = useSelector((state: any) => state?.[stagesReducerName]);
	const stagesItems = stagesData?.data?.data?.stages as IssueStatusTypes[]

	/*  ######################################################################################## */

	const getStages = () => {
		dispatch(getAction({ stagesList: Urls.stages_list + `/${appProfileInfo?.project_id}` }));
	}

	const getIssues = () => {
		let query = `?perPage=300
				&filter=project_id=${appProfileInfo?.project_id}
				${boardInfo?.type_filter_value !== "all" ? `%26%26type=${boardInfo?.type_filter_value}` : ""}
				${boardInfo?.points_filter_value !== "all" ? `&sort=${boardInfo.points_filter_value}` : ""}`;

		dispatch(getAction({ issues: Urls.issues + query }));
	};

	/*  ######################################################################################## */

	const taskFilterOptions = userItems?.map(usr => {
		return (authInfo?.user?._id === usr?._id) ? ({ value: usr?._id, label: "My Tasks" }) : ({ value: usr?._id, label: usr.user_name })
	}) || []

	/*  ######################################################################################## */

	useEffect(() => {
		if (appProfileInfo?.project_id) {
			getStages()
			getIssues();
		}
	}, [boardInfo, appProfileInfo?.project_id]);

	/*  ######################################################################################## */

	// const dummyStages = Array.from({ length: 4 }).map((data, i) => ({ _id: `ID00${i + 1}`, name: `Stage-${i + 1}`, order: i + 1 }));

	if (!appProfileInfo?.project_id) {
		return <NoProjectScreen />
	}

	const boardWidth = sidebar?.minimize ?
		`w-[calc(100vw-30px)] md:w-[calc(100vw-100px)]` :
		`w-[calc(100vw-30px)] md:w-[calc(100vw-240px)]`;


	return (
		<>
			<div className="text-xs">
				<div className="flex justify-between px-6 gap-2 items-center">
					<div className="text-base">

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
						<IssueCreationForm>
							<div className="flex justify-center items-center border py-2 px-4 gap-1 rounded h-10 border-primary text-primary cursor-pointer text-sm whitespace-nowrap">
								Add Task
								<HiPlus className="h-5 w-5 " />
							</div>
						</IssueCreationForm>
					</div>
				</div>
				<div className="px-6 flex my-5">
					<div></div>
				</div>
				<EmptyBoardList show={issueListItems?.length < 0} />
				<div className={cn("flex overflow-auto", boardWidth)}>
					{stagesItems?.map((stage, i) => {

						return (
							<StageCard
								stage={stage}
								getIssues={getIssues}
								getStages={getStages}
								key={`${stage?._id}_${i}`}
							/>
						)
					})}

					<div className="text-center dark:bg-[#131417] rounded mx-1 min-w-[300px]">
						{!showStageCreation &&
							<div className="flex">
								<Button
									variant="outline"
									className="border border-primary"
									title="Add Column"
									onClick={() => setStageCreation(true)}>
									<HiPlus className="text-primary" />
								</Button>
							</div>
						}

						{showStageCreation &&
							(
								<StageCreation setStageCreation={setStageCreation} getStages={getStages} />
							)}
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