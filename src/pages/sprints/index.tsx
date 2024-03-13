import { useEffect } from "react";
import Urls from "../../redux/actions/Urls";
import { IoIosFlash } from "react-icons/io";
import { HiDatabase } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { IssueCard } from "../backlog/backlog-column";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import HYDialog from "@/components/hy-components/HYDialog";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import IssueCreationCardMini from "../issues/issue-creation-mini";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import SprintDetailView from "@/components/hy-components/detail-views/Sprint-detail-view";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Sprints = () => {
	const dispatch = useDispatch();

	const issueListData = useSelector((state: any) => state?.GetIssues);
	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items;

	const issueListItems = issueListData?.data?.items
	const sprintListItems = sprintListData?.data?.items

	/*  ######################################################################################## */

	const getIssues = (prams?: string) => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getSprints = (prams?: string) => {
		let query = `?perPage=300&expand=created_by&filter=project_id=${appProfileInfo?.project_id}`;
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	const updateDropedIssueToSprint = async (issueId: string, sprintId: string) => {
		const resp = (await dispatch(
			patchAction({ issues: Urls.issues }, { sprint_id: sprintId, status: issueStatusList?.find(issueStatus => issueStatus?.name === "Todo")?._id }, issueId)
		)) as any;

		if (resp.payload.status == 200) {
			getIssues();
		}
	}

	/*  ######################################################################################## */

	const filteredSprints = sprintListItems?.filter(sprnt => sprnt.project_id === appProfileInfo.project_id)

	const findTotalPoints = (data: any[]) => {
		return data?.reduce((accumulator, currentValue) => {
			return accumulator + +currentValue?.points;
		}, 0);
	};

	/*  ######################################################################################## */

	useEffect(() => {
		if (appProfileInfo?.project_id) {
			getIssues();
			getSprints();
		}
	}, [appProfileInfo?.project_id]);

	/*  ####################################################################################### */

	if (!appProfileInfo?.project_id) {
		return <NoProjectScreen />
	}

	return (
		<div className="text-xs">
			<div className="flex justify-between px-6 items-center">
				<div className="text-xl flex gap-5">
					Sprints
				</div>
				<div className="flex gap-2">
					<HYSearch />
				</div>
			</div>
			<ScrollArea className="h-[calc(100vh-200px)] w-full my-3">
				<div className="px-6 space-y-2">
					{filteredSprints?.map((sprint) => {

						const sprintIssues = issueListItems?.filter(
							(issue) => issue?.sprint_id === sprint?._id
						);

						return <div
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
						</div>;
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default Sprints;
