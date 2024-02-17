import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { Separator } from "@radix-ui/react-select";
import { useEffect } from "react";

import {
	HiPlus,
	HiFilter,
	HiBookOpen,
	HiOutlineArrowNarrowUp,
	HiDatabase,
} from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import IssueCreationForm from "@/components/HYComponents/forms/issue-creation";
import IssueCreationCardMini from "@/components/HYComponents/forms/issue-creation-mini";

const BacklogColumn = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const backlogListData = useSelector((state: any) => state?.GetIssues);

	const backlogItems = backlogListData?.data?.items;

	const dispatch = useDispatch();

	const getIssues = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	useEffect(() => {
		getIssues();
	}, []);

	const logoColors = [
		"text-[#71A4FF]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
		"text-[#FF6481]",
	];
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
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 cursor-pointer">
						<HiOutlineArrowsUpDown className="h-8 w-8 text-[#707173]" />
					</div>
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10  cursor-pointer">
						<HiFilter className="h-5 w-5 text-[#707173]" />
					</div>
				</div>
				<div className="">
					<HYSelect
						id=""
						label="Assigned to"
						options={["all", "zahid", "saranya", "roshan"]}
					/>
				</div>
			</div>
			<div className="flex items-center border-b h-14 w-full">
				<IssueCreationCardMini />
			</div>

			<div className="">
				{backlogItems?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-250px)] w-full">
						<div className="py-4 pr-4">
							{backlogItems.map((issue, i) => (
								<>
									<div
										draggable
										key={issue.id}
										className="flex gap-3 justify-between items-center text-sm border px-3 py-3 rounded border-[#696B70] hover:border-primary cursor-pointer"
									>
										<div className="flex gap-1 items-center">
											{issue.type === "story" && (
												<img
													src="/story_icon.svg"
													alt="Project"
												/>
											)}

											{issue.type === "task" && (
												<img
													src="/task_icon.svg"
													alt="Project"
												/>
											)}

											{issue.type === "bug" && (
												<img
													src="/bug_icon.svg"
													alt="Project"
												/>
											)}

											<div className="text-[#737377]">
												{issue.name}
											</div>
										</div>
										<div className="flex gap-4 items-center text-[#737377]">
											<div className="">
												<Avatar className="h-5 w-5">
													<AvatarImage
														src="https://github.com/shadcn.png"
														alt="@shadcn"
													/>
													<AvatarFallback>
														user
													</AvatarFallback>
												</Avatar>
											</div>
											{i % 2 === 0 && (
												<HiOutlineArrowNarrowUp className="text-red-500" />
											)}
											<PiLinkSimpleHorizontalBold />
											<div className="flex gap-1 items-center">
												<HiDatabase className="" />{" "}
												{issue?.points}
											</div>
										</div>
									</div>
									<Separator className="my-2" />
								</>
							))}
						</div>
					</ScrollArea>
				)}

				{backlogItems?.length === 0 && (
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
							<Button
								variant="outline"
								className="flex gap-3 border-primary text-primary hover:text-primary"
							>
								<HiPlus />
								Add
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BacklogColumn;
