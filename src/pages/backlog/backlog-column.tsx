import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYDialog from "@/components/HYComponents/HYDialog";
import HYSearch from "@/components/HYComponents/HYSearch";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IssueCreationForm from "@/components/HYComponents/forms/issue-creation";
import IssueDetailView from "@/components/HYComponents/DetailViews/Issue-detail-view";
import IssueCreationCardMini from "@/components/HYComponents/forms/issue-creation-mini";

import {
	HiPlus,
	HiFilter,
	HiOutlineArrowNarrowUp,
	HiDatabase,
} from "react-icons/hi";
import HYDropDown from "@/components/HYComponents/HYDropDown";
import HYDropdownMenuCheckbox from "@/components/HYComponents/HYCheckboxDropDown";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";

const BacklogColumn = () => {
	const dispatch = useDispatch();
	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueItems = issuesListData?.data?.items;

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);

	/*  ######################################################################################## */

	const getIssues = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getUsers = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ users: Urls.users + query }));
	};

	/*  ######################################################################################## */

	const backlogIssues =
		issueItems?.filter((issue) => issue?.status === "backlog") ?? [];

	const usersOptions =
		usersList?.data?.items?.map((user) => ({
			value: user?.id,
			label: user?.name,
		})) ?? [];

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
		getUsers();
	}, []);

	/*  ######################################################################################## */

	return (
		<div className="flex flex-col h-full  px-6 border-r">
			<div className="flex items-center justify-between w-full">
				<div className="mr-3">Backlog</div>
				<div className="flex gap-3">
					<HYSearch />
					<IssueCreationForm>
						<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 border-primary text-primary cursor-pointer">
							<HiPlus className="h-8 w-8 " />
						</div>
					</IssueCreationForm>
				</div>
			</div>
			<div className="flex border-b w-full justify-between py-3">
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
				<div className="">
					<HYCombobox
						label="Assigned to "
						options={[
							{ label: "All", value: "all" },
							...usersOptions,
						]}
					/>
				</div>
			</div>
			<div className="flex items-center border-b h-14 w-full">
				<IssueCreationCardMini />
			</div>

			<div className="">
				{backlogIssues?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-250px)] w-full">
						<div className="py-4 pr-4 space-y-2">
							{backlogIssues.map((issue, i) => (
								<IssueCard
									index={i}
									issue={issue}
									key={issue?.id}
								/>
							))}
						</div>
					</ScrollArea>
				)}

				{backlogIssues?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-250px)] items-center ">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								2
							</div>
							<div className="text-primary font-bold text-xl">
								Add your stories here
							</div>
							<div className="w-2/3 text-center text-[#F8F8F8]">
								You can add stories here and then drag ‘n’ drop
								them to epics or stories.
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
			className=" border rounded hover:border-primary cursor-pointer"
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
