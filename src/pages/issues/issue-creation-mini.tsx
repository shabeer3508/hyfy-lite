import { useState } from "react";
import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const IssueCreationCardMini = ({ sprintId }: { sprintId?: string }) => {
	const dispatch = useDispatch();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items;

	const defaultPostData = {
		name: "",
		type: "story",
		points: "5",
		project_id: appProfileInfo?.project_id,
		status: issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id,
	}

	const [postData, setPostData] = useState(defaultPostData);

	/*  ######################################################################################## */

	const getIssues = () => {
		let query = "?perPage=300";
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const handleIssueCreation = async (event) => {
		if (sprintId) {
			setPostData((prevData) => ({
				...prevData,
				sprint_id: sprintId,
				status: issueStatusList?.find(issueStatus => issueStatus?.name === "Todo")?._id,
			}));
		}

		if (event.key === "Enter") {
			(dispatch(postAction({ issues: Urls.issues }, postData)) as any).then((res) => {
				const success = res.payload?.status == 200;
				if (success) {
					getIssues();
					setPostData(defaultPostData)
				}
			});
		}
	};

	/*  ######################################################################################## */

	return (
		<div className="flex items-center bg-background pr-3 w-full rounded border" >
			<Input
				value={postData?.name}
				placeholder="Create issue"
				onKeyDown={handleIssueCreation}
				onChange={({ target }) => setPostData((prev) => ({ ...prev, name: target.value }))}
				className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 text-sm"
			/>
			<Select
				defaultValue="story"
				value={postData.type}
				onValueChange={(value) => setPostData((prev) => ({ ...prev, type: value }))}
			>
				<SelectTrigger className="w-[80px] focus:ring-0 focus:ring-offset-0 border-0 text-primary">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent className="w-1 ">
					<SelectItem value="story">
						<img src="/story_icon.svg" alt="story" />
					</SelectItem>
					<SelectItem value="task">
						<img src="/task_icon.svg" alt="task" />
					</SelectItem>
					<SelectItem value="bug">
						<img src="/bug_icon.svg" alt="bug" />
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default IssueCreationCardMini;
