import { HiRocketLaunch } from "react-icons/hi2";

import { ReleaseTypes } from "@/interfaces";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReleaseCardProps {
	data?: ReleaseTypes;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ data }) => {

	const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
	return (
		<Card
			draggable={true}
			onDragStart={(e) => { e.dataTransfer.setData("id", data?._id) }}
			className="flex flex-col justify-between rounded-lg hover:cursor-grab dark:bg-[#151619] card-gradient"
		>
			<div className="flex gap-3 items-center h-16 px-4">
				<HiRocketLaunch className="w-6 h-6 text-[#707173]" />
				<div className="capitalize ">{data?.name}</div>
			</div>
			<Separator className=" w-full" />
			<div className="p-4 space-y-2">
				<div className="text-base w-1/2 line-clamp-2">{data?.description}</div>
				<div className="text-xs">
					<span className="  text-[#737377] mr-2">Release Date </span>{" "}
					<span className="">
						{data?.to_date && formatter.format(new Date(data?.to_date))}
					</span>
				</div>
			</div>

			<Separator className=" w-full " />
			<div className="flex justify-between text-xs p-2 px-4">
				<div className="text-[#737377]">Tags :</div>
				<div className="dark:text-[#737377]">
					Priority
					<span className="dark:text-white text-[#737377] capitalize ml-2">{data?.priority}</span>
				</div>
			</div>
		</Card>
	);
};

export default ReleaseCard;
