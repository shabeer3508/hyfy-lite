import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import HYSelect from "@/components/HYComponents/HYSelect";
import { Card, CardContent } from "@/components/ui/card";
import { HiDatabase, HiOutlineClock } from "react-icons/hi";

const SprintCard = ({ data }: any) => {
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
						label={<HiOutlineClock />}
						options={[
							{ label: "1", value: "5" },
							{ label: "2", value: "10" },
							{ label: "3", value: "15" },
							{ label: "4", value: "15" },
							{ label: "5", value: "15" },
						]}
					/>
					{/* <HYSelect id="" options={["options"]} className="w-full" /> */}
				</div>
				<div>
					<HYSelect id="" options={["options"]} className="w-full" />
				</div>
				<div>
					<HYSelect id="" options={["options"]} className="w-full" />
				</div>
			</CardContent>
		</Card>
	);
};

export default SprintCard;
