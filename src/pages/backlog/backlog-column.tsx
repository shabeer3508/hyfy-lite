import Urls from "@/redux/actions/Urls";
import { useEffect, useState } from "react";
import { TbSquareCheck } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import IssueCreationForm from "@/pages/issues/issue-creation";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import IssueCreationCardMini from "@/pages/issues/issue-creation-mini";
import { HiOutlineArrowsUpDown, HiCheck, HiMiniXMark } from "react-icons/hi2";
import HYDropdownMenuCheckbox from "@/components/hy-components/HYCheckboxDropDown";
import { getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HiPlus, HiFilter, HiViewBoards, } from "react-icons/hi";
import { toast } from "sonner";
import { IssueCard } from "../issues/issue-card-1";
import HYModal from "@/components/hy-components/HYModal";
import { BiDirections } from "react-icons/bi";
import { IssueStatusTypes } from "@/interfaces";

const BacklogColumn = () => {
	const dispatch = useDispatch();

	const [issueTransfer, setIssueTransfer] = useState({
		isSelectionOn: false,
		openTranserModal: false,
		selectedIssues: [],
	})

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueItems = issuesListData?.data?.items;

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items;

	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicsListData = useSelector((state: any) => state?.[epicReducerName]);
	const epicItems = epicsListData?.data?.items;

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	/*  ######################################################################################## */

	const getIssues = () => {
		let query = `?perPage=300&expand=epic_id&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getUsers = () => {
		let query = `?perPage=300`;
		dispatch(getAction({ users: Urls.users + query }));
	};

	const getEpics = () => {
		let query = `?perPage=300
			&expand=release_id,project_id
			&filter=project_id=${appProfileInfo.project_id}`;

		dispatch(getAction({ epic: Urls.epic + query }));
	};


	const updateIssueToBacklog = async (issueId: string) => {
		const resp = (await dispatch(
			patchAction({ issues: Urls.issues }, { sprint_id: null, status: issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id }, issueId)
		)) as any;
		const success = resp.payload.status == 200;
		if (success) {
			getIssues();
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
		setIssueTransfer((prevData) => ({ selectedIssues: [], isSelectionOn: false, openTranserModal: false }));
	}


	/*  ######################################################################################## */

	const backlogIssues =
		issueItems?.filter((issue) => issue?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id) ?? [];

	const usersOptions =
		usersList?.data?.items?.map((user) => ({
			value: user?._id,
			label: user?.user_name,
		})) ?? [];

	const epicsOptions = epicItems?.map((epc) => ({
		value: epc?._id,
		label: epc?.name,
	})) ?? []

	/*  ######################################################################################## */

	const sortoptions = [
		{ label: "New", action: () => { } },
		{ label: "Oldest", action: () => { } },
		{ label: "Recently Edited", action: () => { } },
		{ label: "A-Z", action: () => { } },
		{ label: "Z-A", action: () => { } },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		getIssues();
		getEpics();
	}, [appProfileInfo?.project_id]);

	useEffect(() => {
		getUsers();
	}, [])


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
				<div className="flex flex-col 2xl:flex-row border-b gap-2  justify-between py-3">
					<div className="flex justify-between gap-3">
						<div className="flex gap-3">
							<HYDropDown options={sortoptions}>
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
							options={[{ label: "All", value: "all" }, ...usersOptions]}
						/>
						<HYCombobox
							buttonClassName=" 2xl:w-auto"
							defaultValue="all"
							label="Epic"
							options={[{ label: "All", value: "all" }, ...epicsOptions]}
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
					updateIssueToBacklog(e?.dataTransfer?.getData("id"))
				}}>

				{backlogIssues?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-250px)] w-full bg-[#F7F8F9] dark:bg-[#111215]">
						<div className="py-4 px-6 space-y-2">
							{backlogIssues.map((issue, i) => (
								<IssueCard index={i} issue={issue} key={issue?._id} showSelection={issueTransfer?.isSelectionOn} handleSelection={handleIssueSelection} />
							))}
						</div>
					</ScrollArea>
				)}

				{backlogIssues?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-250px)] items-center ">
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


interface IssueTransferModalProps {
	data: any,
	handleClose: () => void
	getIssues: () => void
}


const IssueTransferModal: React.FC<IssueTransferModalProps> = ({ data, handleClose, getIssues }) => {

	const dispatch = useDispatch();
	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicsListData = useSelector((state: any) => state?.[epicReducerName])?.data?.items;
	const sprintListData = useSelector((state: any) => state?.GetSprints)?.data?.items;

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];


	const [search, setSearch] = useState("");
	const [targetId, setTargetId] = useState<any>({ epic_id: null, sprint_id: null });

	const handleApplyTransfer = (type: "epic" | "sprint") => {
		let postData: any = { issue_ids: data?.selectedIssues }

		if (type === "epic") {
			if (!targetId?.epic_id) toast.error("Please select a epic from the  list");
			else { postData = { ...postData, epic_id: targetId?.epic_id } }
		} else {
			if (!targetId?.sprint_id) toast.error("Please select a sprint from the  list");
			else {
				postData = {
					...postData,
					sprint_id: targetId?.sprint_id,
					status_id: issueStatusList?.find(issueStatus => issueStatus?.name === "Todo")?._id
				}
			}
		}

		(dispatch(patchAction({ issues: Urls.issues + `/moveIssues` }, postData, type)) as any).then(res => {
			if (res.payload.status == 200) {
				toast.success("Issue moved successfully");
				getIssues();
				handleClose();
			}
		})

	}

	return (
		<div className="flex flex-col">
			<div className="text-xl mb-3">Move Issues to</div>
			<Tabs defaultValue="epic" className="">
				<TabsList className="rounded">
					<TabsTrigger value="epic" className="flex gap-1 rounded">
						<HiViewBoards className="w-4 h-4" />
						Epic
					</TabsTrigger>
					<TabsTrigger value="sprint" className="flex gap-1 rounded">
						<BiDirections className="w-4 h-4" />
						Sprint
					</TabsTrigger>
				</TabsList>

				<TabsContent value="epic" >
					<div className="flex flex-col gap-3">
						<div className="w-full">
							<HYSearch className="w-full max-w-full" />
						</div>
						<div className="border p-3 rounded  flex flex-col gap-2 max-h-[300px] overflow-auto">
							{epicsListData?.map(epic =>
								<div
									onClick={() => setTargetId({ epic_id: epic?._id })}
									className={`${targetId?.epic_id === epic?._id && "bg-[#2E3035]"} py-1 px-3 border rounded cursor-pointer text-sm`}
								>
									{epic?.name}
								</div>
							)}
						</div>
						<div className="flex gap-3">
							<Button variant="outline" className="w-1/2 text-primary" onClick={() => handleClose()}>Cancel</Button>
							<Button className="w-1/2 text-white" onClick={() => handleApplyTransfer("epic")}>Move</Button>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="sprint" >
					<div className="flex flex-col gap-3">
						<div className="w-full">
							<HYSearch className="w-full max-w-full" />
						</div>
						<div className="border p-3 rounded flex flex-col gap-2 max-h-[300px] overflow-auto">
							{sprintListData?.map(sprint =>
								<div
									onClick={() => setTargetId({ sprint_id: sprint?._id })}
									className={`${targetId?.sprint_id === sprint?._id && "bg-[#2E3035]"} py-1 px-3 border rounded cursor-pointer text-sm`}
								>
									{sprint?.name}
								</div>
							)}
						</div>
						<div className="flex gap-3">
							<Button variant="outline" className="w-1/2 text-primary" onClick={() => handleClose()}>Cancel</Button>
							<Button className="w-1/2 text-white" onClick={() => handleApplyTransfer("sprint")}> Move</Button>
						</div>
					</div>
				</TabsContent>
			</Tabs>

		</div >
	)
}



