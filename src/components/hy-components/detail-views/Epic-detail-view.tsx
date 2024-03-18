import { useEffect } from "react";
import HYSearch from "../HYSearch";
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import HYEditableDiv from "../HYEditableDiv";
import HYAlertDialog from "../HYAlertDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import IssueMiniCard from "@/pages/issues/issue-card-2";
import { EpicTypes, IssueTypes, ReleaseTypes } from "@/interfaces";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { deleteAction, getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const EpicDetailView = ({ data }: { data: EpicTypes }) => {
	const dispatch = useDispatch();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const issueListData = useSelector((state: any) => state?.GetIssues);
	const issueListItems = issueListData?.data?.items as IssueTypes[];

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const releaseList = useSelector((state: any) => state?.[releaseReducerName])?.data?.items as ReleaseTypes[];

	/*  ######################################################################################## */

	const getIssues = () => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const getReleases = () => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
		dispatch(getAction({ release: Urls.release + query }));
	};

	const getEpics = () => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
		dispatch(getAction({ epic: Urls.epic + query }));
	};


	const filterIssueByEpic = issueListItems?.filter((issue) => issue?.epic_id === data?._id);

	const findIssueCount = (type: "bug" | "story" | "task") => {
		return filterIssueByEpic?.filter((issue) => issue.type === type).length;
	};

	const updateEpicData = async (key: string | number, value: string | boolean) => {
		const resp = (await dispatch(patchAction({ epic: Urls.epic }, { [key]: value !== "" ? value : null }, data?._id))) as any
		const success = resp.payload?.status == 200;
		if (success) {
			getEpics();
		}
	}

	const handleEpicDelete = () => {
		(dispatch(deleteAction(Urls.epic, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getEpics();
			}
		})
	}


	/*  ######################################################################################## */

	const releaseOptions =
		releaseList?.map((release) => ({
			value: release?._id,
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
			<div className="text-xl">
				<HYEditableDiv className="text-xl dark:bg-card" defaultText={data?.name} handleChange={(value) => updateEpicData("name", value)} />
			</div>
			<div className="my-3 space-y-3">
				<div className="text-xs text-[#9499A5]">Description</div>
				<div className="text-xs">
					<HYEditableDiv
						type="textarea"
						className="text-xs"
						placeholder="Add description"
						defaultText={data?.description}
						handleChange={(value) => updateEpicData("description", value)}
					/>
				</div>
			</div>
			<div className="flex justify-between mr-4">
				<HYCombobox
					label="Release"
					unSelectable={true}
					options={releaseOptions}
					defaultValue={data?.release_id}
					buttonClassName="dark:bg-card dark:border-[#FFFFFF1A]"
					onValueChange={(value) => updateEpicData("release_id", value)}
				/>
				<HYAlertDialog submitAction={handleEpicDelete} >
					<Button
						type="button"
						variant="ghost"
						className="border border-destructive text-destructive hover:text-destructive"
					>
						Delete
					</Button>
				</HYAlertDialog>
			</div>
			<Separator className="my-2 dark:bg-[#FFFFFF1A]" />
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
					<HYSearch className="dark:bg-card dark:border-[#FFFFFF1A]" inputClassName="dark:bg-card" />
				</div>
			</div>
			<ScrollArea className="max-h-[calc(100vh-600px)] overflow-auto w-full">
				<div className="pr-4 space-y-2 text-xs">
					{filterIssueByEpic?.map((sprint) => {
						return <IssueMiniCard data={sprint} key={sprint?._id} />;
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default EpicDetailView;
