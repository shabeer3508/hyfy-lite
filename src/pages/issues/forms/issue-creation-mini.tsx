import { useState } from "react";
import { HiBookOpen } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { StagesTypes } from "@/interfaces";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { HiOutlinePencil } from "react-icons/hi";


const IssueCreationCardMini = ({ sprintId, epicId, statusId }: { sprintId?: string, epicId?: string, statusId?: string }) => {
	const dispatch = useDispatch();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as StagesTypes[];

	const defaultPostData = {
		name: "",
		type: "task",
		points: "5",
		project_id: appProfileInfo?.project_id,
		status: statusId,
	}

	const [postData, setPostData] = useState(defaultPostData);

	/*  ######################################################################################## */

	const getIssues = () => {
		let query = `?perPage=300
				&expand=epic_id
				&sort=${appProfileInfo?.backlog?.backlog_sort_value}
				&filter=project_id=${appProfileInfo?.project_id}`;
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

		if (epicId) {
			setPostData((prevData) => ({
				...prevData,
				epic_id: epicId,
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
				placeholder="Add task"
				onKeyDown={handleIssueCreation}
				onChange={({ target }) => setPostData((prev) => ({ ...prev, name: target.value }))}
				className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 text-sm"
			/>
			<HiOutlinePencil className="size-3 text-gray-400" />
			{/* <Select
				defaultValue="story"
				value={postData.type}
				onValueChange={(value) => setPostData((prev) => ({ ...prev, type: value }))}
			>
				<SelectTrigger className="w-[80px] focus:ring-0 focus:ring-offset-0 border-0 text-primary">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent className="w-10 ">
					<SelectItem value="story">
						<HiBookOpen className="w-4 h-4" />
					</SelectItem>
					<SelectItem value="task">
						<img src="/task_icon.svg" alt="task" />
					</SelectItem>
					<SelectItem value="bug" >
						<img src="/bug_icon.svg" alt="bug" />
					</SelectItem>
				</SelectContent>
			</Select> */}
		</div>
	);
};

export default IssueCreationCardMini;
