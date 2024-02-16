import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { getAction, postAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";

const IssueCreationCardMini = ({ sprintId }: { sprintId?: string }) => {
	const dispatch = useDispatch();
	const [postData, setPostData] = useState({
		name: "",
		status: "backlog",
		type: "task",
		points: "5",
	});

	/*  ######################################################################################## */

	const getIssues = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	const handleIssueCreation = async (event) => {
		if (sprintId) {
			setPostData((prevData) => ({
				...prevData,
				sprint: sprintId,
				status: "todo",
			}));
		}

		if (event.key === "Enter") {
			(dispatch(postAction(Urls.issues, postData)) as any).then((res) => {
				const success = res.payload.status == 200;
				if (success) {
					getIssues();
				}
			});
		}
	};
	/*  ######################################################################################## */

	return (
		<div className="flex items-center bg-background pr-3 w-full rounded border">
			<Input
				placeholder="Add Story"
				onKeyDown={handleIssueCreation}
				onChange={({ target }) => {
					setPostData((prev) => ({ ...prev, name: target.value }));
				}}
				className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
			/>
			<Select
				defaultValue="story"
				value={postData.type}
				onValueChange={(value) => {
					setPostData((prev) => ({ ...prev, type: value }));
				}}
			>
				<SelectTrigger className="w-[80px] focus:ring-0 focus:ring-offset-0 border-0 text-primary">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent className="w-1 ">
					<SelectItem value="story">
						<img src="/story_icon.svg" alt="Project" />
					</SelectItem>
					<SelectItem value="task">
						<img src="/task_icon.svg" alt="Project" />
					</SelectItem>
					<SelectItem value="bug">
						<img src="/bug_icon.svg" alt="Project" />
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default IssueCreationCardMini;
