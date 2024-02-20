import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import SprintCreationForm from "@/components/HYComponents/forms/sprint-creation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { useEffect } from "react";

import {
	HiPlus,
	HiDatabase,
	HiBookOpen,
	HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoIosFlash } from "react-icons/io";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IssueCreationCardMini from "@/components/HYComponents/forms/issue-creation-mini";
import HYDropDown from "@/components/HYComponents/HYDropDown";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";

const SprintsColumn = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const sprintItems = sprintListData?.data?.items;

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issuesItems = issuesListData?.data?.items;

	/*  ######################################################################################## */

	const getSprints = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	/*  ######################################################################################## */

	const sortoptions = [
		{
			label: "New",
			action: () => {},
		},
		{
			label: "Oldest",
			action: () => {},
		},
		{
			label: "Recently Edited",
			action: () => {},
		},
		{
			label: "A-Z",
			action: () => {},
		},
		{
			label: "Z-A",
			action: () => {},
		},
	];

	/*  ######################################################################################## */

	useEffect(() => {
		getSprints();
	}, []);

	/*  ######################################################################################## */

	return (
		<div className="flex flex-col h-full px-6">
			<div className="flex items-center justify-between w-full">
				<div className="mr-3">Sprints</div>
				<div className="flex gap-3">
					<HYSearch />
					<SprintCreationForm>
						<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 border-primary text-primary cursor-pointer">
							<HiPlus className="h-8 w-8 " />
						</div>
					</SprintCreationForm>
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
				</div>
				<div className="">
					<HYCombobox
						label="Status "
						options={[
							{ label: "All", value: "all" },
							{ label: "Backlog", value: "backlog" },
							{ label: "In Progress", value: "in-progress" },
							{ label: "Retro", value: "retro" },
						]}
					/>
				</div>
			</div>
			<div>
				{sprintItems?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-200px)] w-full">
						<div className="py-4 pr-4 space-y-2">
							{sprintItems.map((sprint, i) => {
								const sprintIssues = issuesItems?.filter(
									(issue) => issue?.sprint === sprint?.id
								);

								return (
									<div
										key={sprint.id}
										className="flex gap-3 justify-between items-center text-sm border  px-3 rounded hover:border-primary cursor-pointer"
									>
										<Accordion
											type="single"
											collapsible
											className="w-full border-0 p-0 m-0"
										>
											<AccordionItem
												value="item-1"
												className="border-0 p-0 m-0"
											>
												<div className="flex justify-between w-full items-center ">
													<div className="flex gap-1 items-center">
														<IoIosFlash
															className={`w-5 text-[#707173]`}
														/>
														<div className="w-[100px] truncate">
															{sprint.name}
														</div>
													</div>
													<div>
														<div
															className={`${
																sprint?.status ===
																	"in-progress" &&
																"bg-[#56972E]"
															} ${
																sprint?.status ===
																	"backlog" &&
																"bg-[#5F5F5F]"
															} ${
																sprint?.status ===
																	"retro" &&
																"bg-[#DF8430]"
															}  text-white px-3 py-0.5 whitespace-nowrap mx-2 rounded-full text-xs `}
														>
															{sprint?.status}
														</div>
													</div>
													<div className="flex gap-2 items-center text-[#737377]">
														<div className="text-xs">
															4 Apr - 12 Apr
														</div>
														<div className="flex gap-1 items-center">
															<HiDatabase className="" />{" "}
															{(i + (1 % 6)) * 10}
														</div>
														<div>
															<AccordionTrigger></AccordionTrigger>
															{/* <HiChevronRight className="w-5 h-5" /> */}
														</div>
													</div>
												</div>
												<AccordionContent className="flex flex-col gap-2">
													{sprintIssues?.map(
														(itm, i2) => {
															return (
																<div
																	draggable
																	key={itm}
																	className="flex gap-3 justify-between items-center text-sm border  hover:border-primary px-3 py-3 rounded cursor-pointer"
																>
																	<div className="flex gap-1 items-center">
																		{itm.type ===
																			"story" && (
																			<img
																				src="/story_icon.svg"
																				alt="Project"
																			/>
																		)}

																		{itm.type ===
																			"task" && (
																			<img
																				src="/task_icon.svg"
																				alt="Project"
																			/>
																		)}

																		{itm.type ===
																			"bug" && (
																			<img
																				src="/bug_icon.svg"
																				alt="Project"
																			/>
																		)}
																		<div className="text-[#737377]">
																			{
																				itm?.name
																			}
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
																		{i %
																			2 ===
																			0 && (
																			<HiOutlineArrowNarrowUp className="text-red-500" />
																		)}
																		<PiLinkSimpleHorizontalBold />
																		<div className="flex gap-1 items-center">
																			<HiDatabase className="" />{" "}
																			{i2 +
																				(1 %
																					6)}
																		</div>
																	</div>
																</div>
															);
														}
													)}

													<IssueCreationCardMini
														sprintId={sprint?.id}
													/>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				)}
				{sprintItems?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-200px)] items-center mt-[30px]">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								3
							</div>
							<div className="text-primary font-bold text-xl">
								Add sprints here
							</div>
							<div className="w-2/3 text-center text-[#F8F8F8]">
								Sprints are week long and help you get things
								done
							</div>{" "}
							<SprintCreationForm>
								<Button
									variant="outline"
									className="flex gap-3 border-primary text-primary hover:text-primary"
								>
									<HiPlus />
									Add
								</Button>
							</SprintCreationForm>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SprintsColumn;
