import { useEffect } from "react";
import { IoIosFlash } from "react-icons/io";
import { HiDatabase } from "react-icons/hi";
import { HiOutlineInbox } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import Urls from "../../redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { IssueCard } from "../issues/issue-card-1";
import SprintDetailView from "./sprint-detail-view";
import SprintCreationForm from "./forms/sprint-creation";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import HYDialog from "@/components/hy-components/HYDialog";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import IssueCreationCardMini from "../issues/forms/issue-creation-mini";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { StagesTypes, IssueTypes, SprintTypes } from "@/interfaces";
import { getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Sprints = () => {
	const dispatch = useDispatch();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

	const issueListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issueListData?.data?.items as IssueTypes[]

	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const sprintListItems = sprintListData?.data?.items as SprintTypes[]

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as StagesTypes[];


	/*  ######################################################################################## */

	const getIssues = () => {
		let query = `?perPage=300&expand=epic_id&filter=project_id=${appProfileInfo.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getSprints = () => {
		let query = `?perPage=300&expand=created_by&filter=project_id=${appProfileInfo?.project_id}`;
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

	const findTotalPoints = (data: IssueTypes[]) => {
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
					<SprintCreationForm>
						<Button className='text-white text-sm'>Add Sprint</Button>
					</SprintCreationForm>
				</div>
			</div>
			{sprintListItems?.length > 0 &&
				<ScrollArea className="h-[calc(100vh-200px)] w-full my-3">
					<div className="px-6 space-y-2">
						{sprintListItems?.map((sprint) => {

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
										<div className="flex justify-between items-center w-full min-h-14">
											<HYDialog
												className="max-w-6xl dark:bg-card"
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
															className={`
															${sprint?.status === "in-progress" && "bg-[#56972E]"} 
															${sprint?.status === "backlog" && "bg-[#5F5F5F]"}
															${sprint?.status === "retro" && "bg-[#DF8430]"}
															text-white px-3 py-0.5 whitespace-nowrap mx-2 rounded-full text-xs `
															}
														>
															{sprint?.status}
														</div>
													</div>
													<div className="flex gap-2 items-center text-[#737377]">
														<div className="text-xs">
															{formatter.format(new Date(sprint?.start_date))} - {formatter.format(new Date(sprint?.end_date))}
														</div>
														<div className="flex gap-1 items-center">
															<HiDatabase className="" />{" "}
															{findTotalPoints(sprintIssues)}
														</div>
													</div>
												</div>
											</HYDialog>
											<div className="pl-2">
												<AccordionTrigger className="p-3" />
											</div>
										</div>
										<AccordionContent className="flex flex-col gap-2">
											{sprintIssues?.map((issue, i2) => <IssueCard key={i2} issue={issue} index={i2} />)}

											<IssueCreationCardMini sprintId={sprint?._id} />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>;
						})}
					</div>
				</ScrollArea>
			}

			{sprintListItems?.length === 0 && (
				<div className="dark:text-foreground flex justify-center h-[calc(100vh-200px)] items-center">
					<div className="flex flex-col justify-center items-center text-center gap-3">
						<div>
							<HiOutlineInbox className="text-primary h-20 w-20 " />
						</div>
						<div className="text-primary text-4xl font-semibold">
							Nothing here!
						</div>
						<div className="dark:text-foreground text-xl">
							Create an sprint from the backlog to start working!
						</div>
						<div className='my-3'>
							<SprintCreationForm>
								<Button className='text-white text-sm'>Create an Sprint</Button>
							</SprintCreationForm>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Sprints;
