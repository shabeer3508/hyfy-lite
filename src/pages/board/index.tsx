import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { HiDatabase } from "react-icons/hi";
import { Separator } from "@/components/ui/separator";
import BoardCard from "./boardCard";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAction, patchAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HiOutlineInbox } from "react-icons/hi2";

const Board = () => {
	const dispatch = useDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const issuesListData = useSelector((state: any) => state?.GetIssues);

	const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

	/*  ######################################################################################## */

	const getSprints = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	const getIssues = (prams?: string) => {
		let query = ""; // add sprint filter here
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const findIssueCount = (data) => {
		return data?.reduce((accumulator, currentValue) => {
			return accumulator + +currentValue?.points;
		}, 0);
	};

	/*  ######################################################################################## */

	const sprintOptions =
		sprintListData?.data?.items?.map((sprnt) => ({
			value: sprnt?.id,
			label: sprnt?.name,
		})) ?? [];

	const selectedSprintInfo = sprintListData?.data?.items?.find(
		(sprnt) => sprnt?.id === searchParams.get("selectedSprint")
	);

	/*  ######################################################################################## */

	const todoIssues = issuesListData?.data?.items?.filter(
		(issue) => issue?.status === "todo"
	);
	const onGoingIssues = issuesListData?.data?.items?.filter(
		(issue) => issue?.status === "ongoing"
	);
	const pendingIssues = issuesListData?.data?.items?.filter(
		(issue) => issue?.status === "pending"
	);
	const doneIssues = issuesListData?.data?.items?.filter(
		(issue) => issue?.status === "done"
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
	}, []);

	useEffect(() => {
		if (searchParams.get("selectedSprint")) {
			getIssues();
		}
	}, [searchParams]);

	/*  ######################################################################################## */

	if (issuesListData?.data?.items?.length === 0) {
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

	return (
		<>
			<div className="text-xs">
				<div className="flex justify-between px-5 items-center">
					<div className="text-base">
						<HYCombobox
							name="sprint"
							showSearch={false}
							onValueChange={(value) => {
								value
									? setSearchParams({ selectedSprint: value })
									: setSearchParams({});
							}}
							options={sprintOptions}
							buttonClassName="border-0"
						/>
					</div>
					<div className="flex gap-2">
						<HYSelect id="tasks" options={[]} />
						<HYSelect id="types" options={[]} />
						<HYSelect id="points" options={[]} />
						<HYSearch />
					</div>
				</div>
				<div className="px-5 flex my-5">
					<div>Day 5</div>
					<Separator
						decorative
						className="px-2"
						orientation="vertical"
					/>
					<div>
						{selectedSprintInfo?.start_date
							? formatter.format(
									new Date(selectedSprintInfo?.start_date)
							  )
							: "_"}{" "}
						-{" "}
						{selectedSprintInfo?.end_date
							? formatter.format(
									new Date(selectedSprintInfo?.end_date)
							  )
							: "_"}
					</div>
				</div>
				<div>
					<ResizablePanelGroup
						direction="horizontal"
						className=" rounded-lg "
					>
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(
										e?.dataTransfer?.getData("id"),
										"todo"
									);
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Todo</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />{" "}
										{findIssueCount(todoIssues)}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{todoIssues?.map((tdInfo) => (
											<BoardCard data={tdInfo} />
										))}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						{/* <ResizableHandle /> */}
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(
										e?.dataTransfer?.getData("id"),
										"ongoing"
									);
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Ongoing</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />{" "}
										{findIssueCount(onGoingIssues)}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{onGoingIssues?.map((tdInfo) => (
											<BoardCard data={tdInfo} />
										))}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							<div
								className=" text-center"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(
										e?.dataTransfer?.getData("id"),
										"pending"
									);
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Pending</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										{findIssueCount(pendingIssues)}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{pendingIssues?.map((tdInfo) => (
											<BoardCard data={tdInfo} />
										))}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							<div
								className="text-center"
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(
										e?.dataTransfer?.getData("id"),
										"done"
									);
								}}
							>
								<div className="flex justify-between items-center px-5 py-2">
									<div>Done</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										{findIssueCount(doneIssues)}
									</div>
								</div>
								<ScrollArea className="h-[calc(100vh-220px)]">
									<div className="flex flex-col px-5 py-2 gap-3">
										{doneIssues?.map((tdInfo) => (
											<BoardCard data={tdInfo} />
										))}
									</div>
								</ScrollArea>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			</div>
			{/* <div className="dark:text-foreground flex justify-center h-[calc(100vh-100px)] items-center">
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
			</div> */}
		</>
	);
};

export default Board;
