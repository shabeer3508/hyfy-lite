import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYDialog from "@/components/hy-components/HYDialog";
import HYSearch from "@/components/hy-components/HYSearch";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import IssueCreationForm from "@/pages/issues/issue-creation";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HiOutlineArrowsUpDown, HiCheck } from "react-icons/hi2";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import IssueCreationCardMini from "@/pages/issues/issue-creation-mini";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HYDropdownMenuCheckbox from "@/components/hy-components/HYCheckboxDropDown";
import IssueDetailView from "@/components/hy-components/detail-views/Issue-detail-view";
import { getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import {
	HiPlus,
	HiFilter,
	HiOutlineArrowNarrowUp,
	HiDatabase,
} from "react-icons/hi";

const BacklogColumn = () => {
	const dispatch = useDispatch();

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
		let query = "?perPage=300";
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
		label: epc?.title,
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
						<div className="flex justify-center items-center border py-2 px-4 gap-1 rounded h-10 border-primary text-primary cursor-pointer text-sm">
							Add Issue
							<HiPlus className="h-5 w-5 " />
						</div>
					</IssueCreationForm>
				</div>
			</div>
			<div className="px-6 w-full">
				<div className="flex border-b  justify-between py-3">
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
						<HYCombobox
							defaultValue="all"
							label="Assigned to"
							options={[{ label: "All", value: "all" }, ...usersOptions]}
						/>
						<HYCombobox
							defaultValue="all"
							label="Epic"
							options={[{ label: "All", value: "all" }, ...epicsOptions]}
						/>

						<div className="border-border rounded-md border h-10 w-10 aspect-square flex justify-center items-center cursor-pointer" >
							<HiCheck className="h-5 w-5 text-[#707173]" />
						</div>
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
					<ScrollArea className="h-[calc(100vh-250px)] w-full">
						<div className="py-4 px-6 space-y-2">
							{backlogIssues.map((issue, i) => (
								<IssueCard index={i} issue={issue} key={issue?._id} />
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
							<div className="w-2/3 text-center text-[#F8F8F8]">
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
			</div>
		</div>
	);
};

export default BacklogColumn;

export const IssueCard = ({ issue, index }: { issue: any; index: number }) => {
	return (
		<Card
			draggable
			key={issue.id}
			onDragStart={(e) => e.dataTransfer.setData("id", issue?._id)}
			className=" border rounded card-gradient cursor-pointer dark:bg-[#151619]"
		>
			<HYDialog
				className="max-w-6xl"
				content={<IssueDetailView data={issue} />}
			>
				<div className="flex gap-3 justify-between items-center text-sm px-3 py-3">
					<div className="flex gap-1 items-center">
						{issue.type === "story" && (
							<img src="/story_icon.svg" alt="Project" />
						)}

						{issue.type === "task" && (
							<img src="/task_icon.svg" alt="Project" />
						)}

						{issue.type === "bug" && (
							<img src="/bug_icon.svg" alt="Project" />
						)}

						<div className="text-[#737377]">{issue.name}</div>
					</div>
					<div className="flex gap-4 items-center text-[#737377]">
						<div className="">
							<Avatar className="h-5 w-5">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>user</AvatarFallback>
							</Avatar>
						</div>
						{index % 2 === 0 && (
							<HiOutlineArrowNarrowUp className="text-red-500" />
						)}
						<PiLinkSimpleHorizontalBold />
						<div className="flex gap-1 items-center">
							<HiDatabase className="" /> {issue?.points}
						</div>
					</div>
				</div>
			</HYDialog>
		</Card>
	);
};
