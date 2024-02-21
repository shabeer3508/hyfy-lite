import { useEffect } from "react";
import IssueMiniCard from "./issueMiniCard";
import Urls from "../../redux/actions/Urls";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { HYCombobox } from "../../components/HYComponents/HYCombobox";
import { getAction, setSprintsSprint } from "@/redux/actions/AppActions";

const Sprints = () => {
	const dispatch = useDispatch();

	const issueListData = useSelector((state: any) => state?.GetIssues);
	const sprintListData = useSelector((state: any) => state?.GetSprints);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const issueListItems = issueListData?.data?.items
	const sprintListItems = sprintListData?.data?.items

	/*  ######################################################################################## */

	const getIssues = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getSprints = (prams?: string) => {
		let query = `?filter=project_id="${appProfileInfo?.project_id}"`;
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	/*  ######################################################################################## */

	const sprintOptions = sprintListItems?.map((sprnt) => ({ value: sprnt?.id, label: sprnt?.name })) ?? [];

	const filteredIssues = issueListItems?.filter(
		(sprnt) => appProfileInfo?.sprints?.selected_sprint && sprnt?.sprint === appProfileInfo?.sprints?.selected_sprint
	);

	const findTotalIssues = (type: "bug" | "story" | "task") => filteredIssues?.filter((issue) => issue.type === type).length;

	/*  ######################################################################################## */

	useEffect(() => {
		getIssues();
		getSprints();
	}, [appProfileInfo?.project_id]);

	/*  ####################################################################################### */

	return (
		<div className="text-xs">
			<div className="flex justify-between px-6 items-center">
				<div className="text-base flex gap-5">
					<div>
						<HYCombobox
							name="sprint"
							showSearch={false}
							options={sprintOptions}
							buttonClassName="border"
							defaultValue={appProfileInfo?.sprints?.selected_sprint}
							onValueChange={(value) => dispatch(setSprintsSprint(value))}
						/>
					</div>
					<div className="flex gap-3 text-xs items-center">
						(
						<div className="flex gap-1">
							<img src="/story_icon.svg" alt="Project" />
							<span>{findTotalIssues("story")}</span>
						</div>
						<div className="flex gap-1">
							<img src="/task_icon.svg" alt="Project" />
							<span>{findTotalIssues("task")}</span>
						</div>
						<div className="flex gap-1">
							<img src="/bug_icon.svg" alt="Project" />
							<span>{findTotalIssues("bug")}</span>
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
			<div className="px-6 grid grid-cols-5 mt-6 mb-4 gap-3">
				<div>Item</div>
				<div>Points</div>
				<div>Hours</div>
				<div>Status</div>
				<div>Assigned to</div>
			</div>
			<ScrollArea className="h-[calc(100vh-200px)] w-full">
				<div className="px-5 space-y-2">
					{filteredIssues?.map((sprint) => {
						return <IssueMiniCard key={sprint?.id} data={sprint} />;
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default Sprints;
