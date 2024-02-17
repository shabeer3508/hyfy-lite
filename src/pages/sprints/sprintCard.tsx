import HYSelect from "@/components/HYComponents/HYSelect";
import { Card, CardContent } from "@/components/ui/card";

const SprintCard = ({ data }: any) => {
	return (
		<Card>
			<CardContent className="px-0 py-1 grid grid-cols-5 gap-3">
				<div className="px-3 flex items-center gap-3">
					<img src="/task_icon.svg" alt="Project" />
					bug fix - {data?.id}
				</div>
				<div className="">
					<HYSelect id="" options={["options"]} className="w-full" />
				</div>
				<div>
					<HYSelect id="" options={["options"]} className="w-full" />
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
