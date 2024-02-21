import { useEffect } from "react";
import HYSearch from "../HYSearch";
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import IssueMiniCard from "@/pages/sprints/issueMiniCard";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const EpicDetailView = ({ data }: { data: any }) => {
	const dispatch = useDispatch();

	const issueListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issueListData?.data?.items;

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const releaseList = useSelector(
		(state: any) => state?.[releaseReducerName]
	);
	/*  ######################################################################################## */

	const getIssues = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getReleases = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ release: Urls.release + query }));
	};

	const findIssueCount = (type: "bug" | "story" | "task") => {
		return issueListItems?.filter((issue) => issue.type === type).length;
	};

	/*  ######################################################################################## */

	const releaseOptions =
		releaseList?.data?.items?.map((release) => ({
			value: release?.id,
			label: release?.name,
		})) ?? [];

	/*  ######################################################################################## */

	useEffect(() => {
		getReleases();
		getIssues();
	}, []);

	/*  ######################################################################################## */

	return (
		<div>
			<div>{data?.name}</div>
			<div className="my-3 space-y-1">
				<div className="text-xs text-[#9499A5]">Description</div>
				<div>{data?.description}</div>
			</div>
			<div>
				<HYCombobox
					name="Release"
					showSearch={false}
					options={releaseOptions}
				/>
			</div>
			<Separator className="my-2" />
			<div className="flex justify-between items-center my-2">
				<div className="flex  gap-3">
					<div>Stories</div>
					<div className="flex gap-3 text-xs items-center">
						(
						<div className="flex gap-1">
							<img src="/story_icon.svg" alt="Project" />
							<span>{findIssueCount("story")}</span>
						</div>
						<div className="flex gap-1">
							<img src="/task_icon.svg" alt="Project" />
							<span>{findIssueCount("task")}</span>
						</div>
						<div className="flex gap-1">
							<img src="/bug_icon.svg" alt="Project" />
							<span>{findIssueCount("bug")}</span>
						</div>
						)
					</div>
				</div>
				<div className="pr-5 ">
					<HYSearch />
				</div>
			</div>
			<ScrollArea className="max-h-[calc(100vh-500px)] h-full w-full">
				<div className="pr-5 space-y-2 text-xs">
					{issueListItems?.map((sprint) => {
						return <IssueMiniCard data={sprint} key={sprint?.id} />;
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default EpicDetailView;
