import { toast } from "sonner";
import { useEffect, useState } from "react";
import { TbSquareCheck } from "react-icons/tb";
import { HiPlus, HiFilter, } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowsUpDown, HiMiniXMark } from "react-icons/hi2";

import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { IssueCard } from "../issues/issue-card-1";
import HYModal from "@/components/hy-components/HYModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import IssueTransferModal from "./modals/issue-transfer-modal";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import IssueCreationForm from "@/pages/issues/forms/issue-creation";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import IssueCreationCardMini from "@/pages/issues/forms/issue-creation-mini";
import HYDropdownMenuCheckbox from "@/components/hy-components/HYCheckboxDropDown";
import { EpicTypes, IssueStatusTypes, IssueTypes, UsersTypes } from "@/interfaces";
import { getAction, patchAction, reducerNameFromUrl, setBacklogData } from "@/redux/actions/AppActions";

const BacklogColumn: React.FC = () => {
	const dispatch = useDispatch();

	const [issueTransfer, setIssueTransfer] = useState({
		isSelectionOn: false,
		openTranserModal: false,
		selectedIssues: [],
	})

	const authInfo = useSelector((state: any) => state.UserReducer);

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueItems = issuesListData?.data?.items as IssueTypes[];

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];

	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicsListData = useSelector((state: any) => state?.[epicReducerName]);
	const epicItems = epicsListData?.data?.items as EpicTypes[];

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	/*  ######################################################################################## */

	const getIssues = () => {
		let query = `?perPage=300
				&expand=epic_id
				&sort=${appProfileInfo?.backlog?.backlog_sort_value}
				&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};



	const getEpics = () => {
		let query = `?perPage=300
			&expand=release_id,project_id
			&filter=project_id=${appProfileInfo.project_id}`;

		dispatch(getAction({ epic: Urls.epic + query }));
	};


	const updateIssueToBacklog = async (issueId: string, sprintId: string) => {
		if (sprintId !== "null") {
			const resp = (await dispatch(
				patchAction({ issues: Urls.issues + `/movetobacklog` }, { sprint_id: sprintId, status_id: issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id }, issueId)
			)) as any;
			const success = resp.payload?.status == 200;
			if (success) {
				getIssues();
			}
		}
	}

	const handleIssueSelection = (issueId: string, isChecked: boolean) => {
		let updatedInviteList = issueTransfer?.selectedIssues

		if (isChecked) { updatedInviteList = [...updatedInviteList, issueId] }
		else { updatedInviteList = issueTransfer?.selectedIssues?.filter((issue) => issue !== issueId) }

		setIssueTransfer((prevData) => ({ ...prevData, selectedIssues: updatedInviteList }))
	}

	const handleIssueMovement = () => {
		if (issueTransfer?.selectedIssues?.length === 0) {
			toast.error("Select atleast one issue from the list");
		} else {
			setIssueTransfer((prevData) => ({ ...prevData, openTranserModal: true }));
		}
	}

	const closeTransferModal = () => {
		setIssueTransfer({ selectedIssues: [], isSelectionOn: false, openTranserModal: false });
	}


	const isUserIncludes = (issueInfo: IssueTypes) => {
		if (appProfileInfo?.backlog?.backlog_assignee_value === "all") {
			return true
		} else if (appProfileInfo?.backlog?.backlog_assignee_value === "unassigned") {
			return issueInfo?.assign_to?.length == 0;
		} else {
			return issueInfo?.assign_to?.some(user => user === appProfileInfo?.backlog?.backlog_assignee_value);
		}
	}

	const handleEpicFilter = (issue: IssueTypes) => {
		if (appProfileInfo?.backlog?.backlog_epic_value === "all") {
			return true
		} else if (typeof issue?.epic_id != "string") {
			return issue?.epic_id?.[0]?._id == appProfileInfo?.backlog?.backlog_epic_value
		} else {
			return false
		}
	}


	/*  ######################################################################################## */

	const backlogIssues =
		issueItems?.filter((issue) =>
			issue?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id
			&& isUserIncludes(issue)
			&& handleEpicFilter(issue)
		) ?? [];

	const usersOptions =
		usersList?.map((user) => {
			return (authInfo?.user?._id === user?._id) ? ({ value: user?._id, label: "My Tasks" }) : ({ value: user?._id, label: user.user_name })
		}) ?? [];

	const epicsOptions = epicItems?.map((epc) => ({
		value: epc?._id,
		label: epc?.name,
	})) ?? []

	/*  ######################################################################################## */

	const sortOptions = [
		{ label: "New", action: () => dispatch(setBacklogData("-createdAt", "backlog_sort_value")) },
		{ label: "Oldest", action: () => dispatch(setBacklogData("createdAt", "backlog_sort_value")) },
		{ label: "Recently Edited", action: () => dispatch(setBacklogData("-updatedAt", "backlog_sort_value")) },
		{ label: "A-Z", action: () => dispatch(setBacklogData("name", "backlog_sort_value")) },
		{ label: "Z-A", action: () => dispatch(setBacklogData("-name", "backlog_sort_value")) },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		getEpics();
	}, [appProfileInfo?.project_id]);

	useEffect(() => {
		getIssues();
	}, [appProfileInfo?.project_id, appProfileInfo?.backlog?.backlog_sort_value]);


	/*  ######################################################################################## */

	return (
		<div className="flex flex-col h-full border-r">
			<div className="flex items-center justify-between w-full px-6">
				<div className="mr-3 text-xl">Backlog</div>
				<div className="flex gap-3">
					<HYSearch />
					<IssueCreationForm>
						<div className="flex justify-center items-center border py-2 px-4 gap-1 rounded h-10 border-primary text-primary cursor-pointer text-sm whitespace-nowrap">
							Add Issue
							<HiPlus className="h-5 w-5 " />
						</div>
					</IssueCreationForm>
				</div>
			</div>
			<div className="px-6 w-full">
				<div className="flex flex-col 2xl:flex-row border-b gap-2 justify-between py-3">
					<div className="flex justify-between gap-3">
						<div className="flex gap-3">
							<HYDropDown options={sortOptions}>
								<Button
									variant="ghost"
									size="icon"
									className="border aspect-square h-10 w-10"
								>
									<HiOutlineArrowsUpDown className="h-5 w-5 text-[#707173]" />
								</Button>
							</HYDropDown>
							<HYDropdownMenuCheckbox>
								<Button
									variant="ghost"
									size="icon"
									className="border aspect-square h-10 w-10"
								>
									<HiFilter className="h-5 w-5 text-[#707173]" />
								</Button>
							</HYDropdownMenuCheckbox>
						</div>

						<div className="flex gap-2">
							{issueTransfer?.isSelectionOn && <Button className="h-10 text-xs text-white select-none" onClick={handleIssueMovement}>Move to</Button>}

							<div
								className="border-border rounded-md border h-10 w-10 aspect-square flex justify-center items-center cursor-pointer"
								onClick={() => setIssueTransfer((prevData) => ({ ...prevData, isSelectionOn: !prevData?.isSelectionOn, selectedIssues: [] }))}>

								{!issueTransfer?.isSelectionOn && <TbSquareCheck className="h-5 w-5 text-[#707173]" title="Select issues" />}
								{issueTransfer?.isSelectionOn && <HiMiniXMark className="h-5 w-5 text-[#707173]" title="Un Select issues" />}
							</div>
						</div>
					</div>

					<div className="flex gap-2 justify-between">
						<HYCombobox
							buttonClassName=" 2xl:w-auto min-w-28"
							defaultValue="all"
							label="Assigned to"
							options={[
								{ label: "All", value: "all" },
								...usersOptions,
								{ label: "Unassigned", value: "unassigned" }
							]}
							onValueChange={(value) => dispatch(setBacklogData(value, "backlog_assignee_value"))}
						/>
						<HYCombobox
							buttonClassName=" 2xl:w-auto"
							defaultValue="all"
							label="Epic"
							options={[{ label: "All", value: "all" }, ...epicsOptions]}
							onValueChange={(value) => dispatch(setBacklogData(value, "backlog_epic_value"))}
						/>
					</div>
				</div>
			</div>
			<div className=" w-full px-6">
				<div className="flex items-center border-b h-14">
					<IssueCreationCardMini />
				</div>
			</div>

			<div className=""
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					e.preventDefault();
					updateIssueToBacklog(e?.dataTransfer?.getData("id"), e?.dataTransfer?.getData("sprint_id"))
				}}>

				{backlogIssues?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-300px)] 2xl:h-[calc(100vh-250px)] w-full bg-[#F7F8F9] dark:bg-[#111215]">
						<div className="py-4 px-6 space-y-2">
							{backlogIssues.map((issue, i) => (
								<IssueCard index={i} issue={issue} key={issue?._id} showSelection={issueTransfer?.isSelectionOn} handleSelection={handleIssueSelection} />
							))}
						</div>
					</ScrollArea>
				)}

				{backlogIssues?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-350px)] 2xl:h-[calc(100vh-250px)] items-center ">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								1
							</div>
							<div className="text-primary font-bold text-xl">
								Add your stories here
							</div>
							<div className="w-2/3 text-center dark:text-[#F8F8F8]">
								You can add stories here and then drag ‘n’ drop
								them to stories.
							</div>
							<IssueCreationForm>
								<Button
									variant="outline"
									className="flex gap-3 border-primary text-primary hover:text-primary"
								>
									<HiPlus />
									Add
								</Button>
							</IssueCreationForm>
						</div>
					</div>
				)}

				<HYModal
					showCloseButton
					handleClose={closeTransferModal}
					open={issueTransfer.openTranserModal}
					content={<IssueTransferModal data={issueTransfer} getIssues={getIssues} handleClose={closeTransferModal} />}
				/>

			</div>
		</div>
	);
};

export default BacklogColumn;






