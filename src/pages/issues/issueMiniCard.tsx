import Urls from "@/redux/actions/Urls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HiDatabase, HiOutlineClock } from "react-icons/hi";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const IssueMiniCard = ({ data }: any) => {
	const dispatch = useDispatch()
	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items;

	/*  ######################################################################################## */

	const upadateIssueByType = (value: string | number, key: string) => {
		dispatch(patchAction({ issues: Urls.issues }, { [key]: value }, data?._id))
	}

	/*  ######################################################################################## */

	const usersOptions =
		usersList?.data?.items?.map((user) => ({
			value: user?._id,
			label: user?.name,
		})) ?? [];

	const statusOptions = issueStatusList?.map(status => ({ label: status?.name, value: status?._id }))

	const pointsOptions = [
		{ label: "5", value: "5" },
		{ label: "10", value: "10" },
		{ label: "15", value: "15" },
	]

	const estimatedHoursOptions = [
		{ label: "0", value: "0" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
	]

	/*  ######################################################################################## */


	return (
		<Card className="dark:bg-[#151619] card-gradient" >
			<CardContent className="px-0 py-1 grid grid-cols-5 gap-3">
				<div className="px-3 flex items-center gap-3">
					{data?.type === "task" && (
						<img src="/task_icon.svg" alt="Project" />
					)}
					{data?.type === "story" && (
						<img src="/story_icon.svg" alt="Project" />
					)}
					{data?.type === "bug" && (
						<img src="/bug_icon.svg" alt="Project" />
					)}

					{data?.name}
				</div>
				<div className="">
					<HYCombobox
						label={<HiDatabase />}
						options={pointsOptions}
						buttonClassName="w-full"
						defaultValue={data?.points?.toString()}
						onValueChange={(value) => upadateIssueByType(value, "points")}
					/>
				</div>
				<div>
					<HYCombobox
						buttonClassName="w-full"
						label={<HiOutlineClock />}
						options={estimatedHoursOptions}
						defaultValue={data?.estimated_hours?.toString()}
						onValueChange={(value) => upadateIssueByType(value, "estimated_hours")}
					/>
				</div>
				<div>
					<HYCombobox
						id="status"
						unSelectable={false}
						options={statusOptions}
						buttonClassName="w-full"
						defaultValue={data?.status}
						onValueChange={(value) => upadateIssueByType(value, "status")}
					/>
				</div>
				<div>
					{/*  TODO : Change this component to multiple user selction drop down */}
					<HYCombobox
						label={
							<div>
								<HYAvatar
									name={"user"}
									className="size-6"
									url="https://github.com/shadcn.png"
								/>
							</div>
						}
						id="assign_to"
						options={usersOptions}
						buttonClassName="w-full"
						defaultValue={data?.assign_to[0]}
						onValueChange={(value) => upadateIssueByType(value, "assign_to")}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default IssueMiniCard;
