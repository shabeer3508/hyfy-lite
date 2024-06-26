import Urls from "@/redux/actions/Urls";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiBookOpen } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HiDatabase, HiOutlineClock, HiOutlineUser } from "react-icons/hi";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { StagesTypes, IssueTypes, UsersTypes } from "@/interfaces";
import { patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

interface IssueMiniCardProps {
	data: IssueTypes;
}

const IssueMiniCard: React.FC<IssueMiniCardProps> = ({ data }) => {
	const dispatch = useDispatch()

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as StagesTypes[];



	/*  ######################################################################################## */

	const upadateIssueByType = (value: string | number, key: string) => {
		dispatch(patchAction({ issues: Urls.issues }, { [key]: value }, data?._id))
	}

	/*  ######################################################################################## */

	const usersOptions =
		usersList?.map((user) => ({
			value: user?._id,
			label: user?.user_name,
		})) ?? [];

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

	const logoColors = [
		"bg-[#71A4FF]",
		"bg-[#4C4878]",
		"bg-[#A4599A]",
		"bg-[#E2A766]",
		"bg-[#389C98]",
		"bg-[#FF6481]",
	];

	const statusOptions = issueStatusList?.map(status => ({ label: status?.name, value: status?._id }))

	/*  ######################################################################################## */


	return (
		<Card className="dark:bg-card dark:border-[#FFFFFF1A] card-gradient" >
			<CardContent className="px-0 py-1 grid grid-cols-5 gap-3">
				<div className="px-3 flex items-center gap-3">
					{data?.type === "task" && (
						<img src="/task_icon.svg" alt="Project" />
					)}
					{data?.type === "story" && (
						<HiBookOpen className="w-4 h-4" />
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
						buttonClassName="w-full dark:bg-card dark:border-[#FFFFFF1A]"
						defaultValue={data?.points?.toString()}
						onValueChange={(value) => upadateIssueByType(value, "points")}
					/>
				</div>
				<div>
					<HYCombobox
						buttonClassName="w-full dark:bg-card dark:border-[#FFFFFF1A]"
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
						buttonClassName="w-full dark:bg-card dark:border-[#FFFFFF1A]"
						defaultValue={data?.status}
						onValueChange={(value) => upadateIssueByType(value, "status")}
					/>
				</div>
				<div className="flex  items-center">

					{data?.assign_to?.map((user, i) => {
						const currentUser = usersList?.find((u) => u?._id === user);
						return (
							<HYAvatar
								name={currentUser?.user_name}
								color={`${logoColors[i]}`}
								className="cursor-default size-6 text-xs first:ml-0 -ml-2 border text-white flex items-center justify-center"
							/>
						)
					}
					)}

					{data?.assign_to?.length === 0 &&
						<div
							onClick={(e) => e?.stopPropagation()}
							title="Unassigned"
							className="cursor-default aspect-square border rounded-full flex justify-center items-center size-6 bg-gray-500" >
							<HiOutlineUser className="text-white" />
						</div>
					}

					{/*  TODO : Change this component to multiple user selction drop down */}
					{/* <HYCombobox
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
					/> */}
				</div>
			</CardContent>
		</Card>
	);
};

export default IssueMiniCard;
