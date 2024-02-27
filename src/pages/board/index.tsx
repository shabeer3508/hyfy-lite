import { useEffect } from "react";
import BoardCard from "./boardCard";
import Urls from "@/redux/actions/Urls";
import { HiDatabase } from "react-icons/hi";
import { HiOutlineInbox } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { getAction, patchAction, setBoardSprint } from "@/redux/actions/AppActions";

const Board = () => {
	const dispatch = useDispatch();

	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issuesListData?.data?.items

	const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	/*  ######################################################################################## */

	const getSprints = (prams?: string) => {
		let query = `?filter=project_id="${appProfileInfo?.project_id}"`;
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	const getIssues = (prams?: string) => {
		let query = `?perPage=300&filter=sprint="${appProfileInfo?.board?.selected_sprint}"`;
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

	const getIssuesByTypes = (
		issueType: "todo" | "ongoing" | "pending" | "done"
	) => {
		return issueListItems?.filter((issue) => issue?.status === issueType && appProfileInfo?.board?.selected_sprint && issue?.sprint === appProfileInfo?.board?.selected_sprint);
	};

	/*  ######################################################################################## */

	const sprintOptions =
		sprintListData?.data?.items?.map((sprnt) => ({
			value: sprnt?.id,
			label: sprnt?.name,
		})) ?? [];

	const selectedSprintInfo = sprintListData?.data?.items?.find(
		(sprnt) => sprnt?.id === appProfileInfo?.board?.selected_sprint
	);

	/*  ######################################################################################## */

	const updateItemStatus = async (id: string, stage: string) => {
		const resp = (await dispatch(
			patchAction({ issues: Urls.issues }, { status: stage }, id)
		)) as any;
		const success = resp.payload.status == 200;
		if (success) {
			getIssues();
		}
	};

	/*  ######################################################################################## */

	useEffect(() => {
		getSprints();
	}, [appProfileInfo?.project_id]);

	useEffect(() => {
		if (appProfileInfo?.board?.selected_sprint) {
			getIssues();
		}
	}, [appProfileInfo?.board?.selected_sprint]);

	/*  ######################################################################################## */

	return (
		<>
			<div className="text-xs">
				<div className="flex justify-between px-6 items-center">
					<div className="text-base">
						<HYCombobox
							name="sprint"
							showSearch={false}
							options={sprintOptions}
							buttonClassName="border"
							defaultValue={appProfileInfo?.board?.selected_sprint}
							onValueChange={(value) => dispatch(setBoardSprint(value))}
						/>
					</div>
					<div className="flex gap-2">
						<HYSelect id="tasks" options={[]} />
						<HYSelect id="types" options={[]} />
						<HYSelect id="points" options={[]} />
						<HYSearch />
					</div>
				</div>
				<div className="px-6 flex my-5">
					<div>
						{selectedSprintInfo?.start_date
							&& formatter.format(new Date(selectedSprintInfo?.start_date))}
						{" "}-{" "}
						{selectedSprintInfo?.end_date
							&& formatter.format(new Date(selectedSprintInfo?.end_date))}
					</div>
				</div>
				<EmptyBoardList show={issueListItems?.length < 0} />
				<div>
					<ResizablePanelGroup
						direction="horizontal"
						className={`rounded-lg`}
					>
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center dark:bg-[#131417] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "todo");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Todo</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />{" "}
										{findTotalPoints(getIssuesByTypes("todo"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)] ">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("todo")?.map(
											(tdInfo) => <BoardCard data={tdInfo} key={tdInfo?.id} />
										)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						{/* <ResizableHandle /> */}
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center dark:bg-[#131417] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "ongoing");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Ongoing</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />{" "}
										{findTotalPoints(getIssuesByTypes("ongoing"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("ongoing")?.map(
											(tdInfo) => <BoardCard data={tdInfo} key={tdInfo?.id} />
										)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							<div
								className=" text-center dark:bg-[#131417] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "pending");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Pending</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										{findTotalPoints(getIssuesByTypes("pending"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("pending")?.map(
											(tdInfo) => <BoardCard data={tdInfo} key={tdInfo?.id} />
										)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center dark:bg-[#131417] rounded mx-1"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "done");
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Done</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										{findTotalPoints(getIssuesByTypes("done"))}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{getIssuesByTypes("done")?.map(
											(tdInfo) => <BoardCard data={tdInfo} key={tdInfo?.id} />
										)}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>

				</div>
			</div>
		</>
	);
};

export default Board;


const EmptyBoardList = ({ show }: { show: boolean }) => {
	if (show) {
		return (
			<div className="dark:text-foreground flex justify-center h-[calc(100vh-100px)] items-center">
				<div className="flex flex-col justify-center items-center text-center gap-3">
					<div>
						<HiOutlineInbox className="text-primary h-20 w-20 " />
					</div>
					<div className="text-primary text-3xl font-semibold">
						Nothing here!
					</div>
					<div className="dark:text-foreground">
						You have not been assigned any tasks
					</div>
				</div>
			</div>
		);
	}
}