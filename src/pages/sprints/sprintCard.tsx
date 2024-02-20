import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import { HiDatabase, HiOutlineClock } from "react-icons/hi";
import { reducerNameFromUrl } from "@/redux/actions/AppActions";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";

const IssueMiniCard = ({ data }: any) => {
	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);

	const usersOptions =
		usersList?.data?.items?.map((user) => ({
			value: user?.id,
			label: user?.name,
		})) ?? [];

	const statusOptions = [
		{ label: "Backlog", value: "backlog" },
		{ label: "Todo", value: "todo" },
		{ label: "Ongoing", value: "ongoing" },
		{ label: "Pending", value: "pending" },
		{ label: "Done", value: "done" },
	];

	return (
		<Card>
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
						defaultValue={data?.points}
						label={<HiDatabase />}
						options={[
							{ label: "5", value: "5" },
							{ label: "10", value: "10" },
							{ label: "15", value: "15" },
						]}
					/>
				</div>
				<div>
					<HYCombobox
						defaultValue={data?.estimated_hours?.toString()}
						label={<HiOutlineClock />}
						options={[
							{ label: "0", value: "0" },
							{ label: "1", value: "1" },
							{ label: "2", value: "2" },
							{ label: "3", value: "3" },
							{ label: "4", value: "4" },
							{ label: "5", value: "5" },
						]}
					/>
				</div>
				<div>
					<HYCombobox
						defaultValue={data?.status}
						buttonClassName="w-full"
						id="status"
						options={statusOptions}
					/>
				</div>
				<div>
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
						id="assigned_to"
						options={usersOptions}
						buttonClassName="w-full"
						defaultValue={data?.assign_to}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default IssueMiniCard;
