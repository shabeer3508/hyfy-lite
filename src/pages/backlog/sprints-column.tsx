import HYSearch from "@/components/HYComponents/HYSearch";
import SprintCreationForm from "@/components/HYComponents/forms/sprint-creation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { useEffect } from "react";
import { HiPlus, HiDatabase } from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoIosFlash } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IssueCreationCardMini from "@/components/HYComponents/forms/issue-creation-mini";
import HYDropDown from "@/components/HYComponents/HYDropDown";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import { IssueCard } from "./backlog-column";
import HYDialog from "@/components/HYComponents/HYDialog";
import SprintDetailView from "@/components/HYComponents/DetailViews/Sprint-detail-view";

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

	const findTotalPoints = (data: any[]) => {
		return data?.reduce((accumulator, currentValue) => {
			return accumulator + +currentValue?.points;
		}, 0);
	};

	/*  ######################################################################################## */

	const sortoptions = [
		{
			label: "New",
			action: () => { },
		},
		{
			label: "Oldest",
			action: () => { },
		},
		{
			label: "Recently Edited",
			action: () => { },
		},
		{
			label: "A-Z",
			action: () => { },
		},
		{
			label: "Z-A",
			action: () => { },
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
												<div className="flex justify-between w-full ">
													<HYDialog
														className="max-w-6xl"
														content={<SprintDetailView data={sprint} />}
													>
														<div className="flex justify-between items-center w-full">
															<div className="flex gap-1 items-center">
																<IoIosFlash
																	className={`w-5 text-[#707173]`}
																/>
																<div className="sm:w-[50px] md:w-[60px] 2xl:w-[100px]  truncate">
																	{sprint.name}
																</div>
															</div>
															<div>
																<div
																	className={`${sprint?.status ===
																		"in-progress" &&
																		"bg-[#56972E]"
																		} ${sprint?.status ===
																		"backlog" &&
																		"bg-[#5F5F5F]"
																		} ${sprint?.status ===
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
																	{findTotalPoints(sprintIssues)}
																</div>
															</div>
														</div>
													</HYDialog>
													<div className="pl-2">
														<AccordionTrigger />
													</div>
												</div>
												<AccordionContent className="flex flex-col gap-2">
													{sprintIssues?.map(
														(itm, i2) => {
															return (
																<IssueCard key={i2} issue={itm} index={i2} />
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
