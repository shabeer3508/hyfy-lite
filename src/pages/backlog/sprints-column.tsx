import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { IoIosFlash } from "react-icons/io";
import { IssueCard } from "./backlog-column";
import { Button } from "@/components/ui/button";
import { HiPlus, HiDatabase } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYDialog from "@/components/hy-components/HYDialog";
import HYSearch from "@/components/hy-components/HYSearch";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { getAction, patchAction } from "@/redux/actions/AppActions";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import SprintCreationForm from "@/pages/sprints/forms/sprint-creation";
import IssueCreationCardMini from "@/pages/issues/issue-creation-mini";
import SprintDetailView from "@/components/hy-components/detail-views/Sprint-detail-view";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const SprintsColumn = () => {
	const dispatch = useDispatch();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const sprintItems = sprintListData?.data?.items;

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issuesItems = issuesListData?.data?.items;

	/*  ######################################################################################## */

	const getSprints = (prams?: string) => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	const getIssues = (prams?: string) => {
		let query = "?perPage=300";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const findTotalPoints = (data: any[]) => {
		return data?.reduce((accumulator, currentValue) => {
			return accumulator + +currentValue?.points;
		}, 0);
	};

	const updateDropedIssueToSprint = async (issueId: string, sprintId: string) => {
		const resp = (await dispatch(
			patchAction({ issues: Urls.issues }, { sprint: sprintId, status: "todo" }, issueId)
		)) as any;
		const success = resp.payload.status == 200;
		if (success) {
			getIssues();
		}
	}

	/*  ######################################################################################## */

	const filteredSprints = sprintItems?.filter(sprnt => sprnt.project_id === appProfileInfo.project_id)

	const sortoptions = [
		{ label: "New", action: () => { } },
		{ label: "Oldest", action: () => { } },
		{ label: "Recently Edited", action: () => { } },
		{ label: "A-Z", action: () => { } },
		{ label: "Z-A", action: () => { } },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		getSprints();
	}, []);

	/*  ######################################################################################## */

	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between w-full px-6">
				<div className="mr-3 text-xl">Sprints</div>
				<div className="flex gap-3">
					<HYSearch />
					<SprintCreationForm>
						<div className="flex justify-center items-center border py-2 px-4 gap-1 rounded h-10 border-primary text-primary cursor-pointer text-sm">
							Add Sprint
							<HiPlus className="h-5 w-5" />
						</div>
					</SprintCreationForm>
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
					</div>
					<div className="">
						<HYCombobox
							defaultValue="all"
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
			</div>
			<div>
				{filteredSprints?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-200px)] w-full">

						<div className="py-4 px-6 space-y-2">
							{filteredSprints.map((sprint, i) => {

								const sprintIssues = issuesItems?.filter(
									(issue) => issue?.sprint === sprint?._id
								);

								return (
									<div
										key={sprint?._id}
										onDrop={(e) => {
											e.preventDefault();
											updateDropedIssueToSprint(e?.dataTransfer?.getData("id"), sprint?._id)
										}}
										onDragOver={(e) => e.preventDefault()}
										className="flex gap-3 justify-between items-center text-sm border  px-2 rounded hover:border-primary cursor-pointer dark:bg-background bg-[#F7F8F9]"
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
												<div className="flex justify-between items-center w-full">
													<HYDialog
														className="max-w-6xl"
														content={<SprintDetailView data={sprint} />}
													>
														<div className="flex justify-between items-center w-full">
															<div className="flex gap-1 items-center">
																<IoIosFlash
																	className={`w-5  ${sprint?.is_started ? "text-primary" : "text-[#707173]"}`}
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
														<Button type="button" variant="ghost" className="p-0" ><AccordionTrigger className="p-3" /></Button>
													</div>
												</div>
												<AccordionContent className="flex flex-col gap-2">
													{sprintIssues?.map((itm, i2) => <IssueCard key={i2} issue={itm} index={i2} />)}

													<IssueCreationCardMini
														sprintId={sprint?._id}
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
				{filteredSprints?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-200px)] items-center mt-[30px]">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								2
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
		</div >
	);
};

export default SprintsColumn;
