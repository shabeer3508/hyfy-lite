import { useEffect } from "react";
import IssueMiniCard from "./sprintCard";
import Urls from "../../redux/actions/Urls";
import { useDispatch, useSelector } from "react-redux";
import { getAction } from "@/redux/actions/AppActions";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { HYCombobox } from "../../components/HYComponents/HYCombobox";
import { useSearchParams } from "react-router-dom";

const Sprints = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const issueListData = useSelector((state: any) => state?.GetIssues);
	const sprintListData = useSelector((state: any) => state?.GetSprints);

	/*  ######################################################################################## */

	const getIssues = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getSprints = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	/*  ######################################################################################## */

	const sprintOptions =
		sprintListData?.data?.items?.map((sprnt) => ({
			value: sprnt?.id,
			label: sprnt?.name,
		})) ?? [];

	const filteredIssues = issueListData?.data?.items?.filter(
		(sprnt) => sprnt?.sprint === searchParams.get("selectedSprint")
	);

	const bugsCount = filteredIssues?.filter(
		(issue) => issue.type === "bug"
	).length;

	const storyCount = filteredIssues?.filter(
		(issue) => issue.type === "story"
	).length;

	const taskCount = filteredIssues?.filter(
		(issue) => issue.type === "task"
	).length;

	/*  ######################################################################################## */

	useEffect(() => {
		getIssues();
		getSprints();
	}, []);

	/*  ####################################################################################### */

	return (
		<div className="text-xs">
			<div className="flex justify-between px-5 items-center">
				<div className="text-base flex gap-5">
					<div>
						<HYCombobox
							showSearch={false}
							onValueChange={(value) => {
								value
									? setSearchParams({ selectedSprint: value })
									: setSearchParams({});
							}}
							options={sprintOptions}
							name="sprint"
							buttonClassName="border-0"
						/>
					</div>
					<div className="flex gap-3 text-xs items-center">
						(
						<div className="flex gap-1">
							<img src="/story_icon.svg" alt="Project" />
							<span>{storyCount}</span>
						</div>
						<div className="flex gap-1">
							<img src="/task_icon.svg" alt="Project" />
							<span>{taskCount}</span>
						</div>
						<div className="flex gap-1">
							<img src="/bug_icon.svg" alt="Project" />
							<span>{bugsCount}</span>
						</div>
						)
					</div>
				</div>
				<div className="flex gap-2">
					<HYSelect id="tasks" options={[]} />
					<HYSelect id="types" options={[]} />
					<HYSelect id="points" options={[]} />
					<HYSearch />
				</div>
			</div>
			<div className="px-5 grid grid-cols-5 mt-6 mb-4 gap-3">
				<div>Item</div>
				<div>Points</div>
				<div>Hours</div>
				<div>Status</div>
				<div>Assigned to</div>
			</div>
			<ScrollArea className="h-[calc(100vh-200px)] w-full">
				<div className="px-5 space-y-2">
					{filteredIssues?.map((sprint) => {
						return <IssueMiniCard data={sprint} />;
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default Sprints;
