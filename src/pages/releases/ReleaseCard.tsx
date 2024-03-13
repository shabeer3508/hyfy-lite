import { Card } from "@/components/ui/card";
import { HiRocketLaunch } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";
import HYAvatar from "@/components/hy-components/HYAvatar";

interface ReleaseCardProps {
	item?: any;
}

const ReleaseCard = ({ item }: ReleaseCardProps) => {
	const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
	return (
		<Card
			draggable={true}
			onDragStart={(e) => { e.dataTransfer.setData("id", item?._id) }}
			className="flex flex-col justify-between rounded-lg hover:cursor-grab dark:bg-[#151619] card-gradient"
		>
			<div className="flex gap-3 items-center h-16 px-4">
				<HiRocketLaunch className="w-6 h-6 text-[#707173]" />
				<div className="capitalize ">{item?.name}</div>
			</div>
			<Separator className=" w-full" />
			<div className="p-4 space-y-2">
				<div className="text-base w-1/2 line-clamp-2">{item?.description}</div>
				<div className="text-xs">
					<span className="  text-[#737377] mr-2">Release Date </span>{" "}
					<span className="">
						{item?.to_date && formatter.format(new Date(item?.to_date))}
					</span>
				</div>
			</div>

			<Separator className=" w-full " />
			<div className="flex justify-between text-xs p-2 px-4">
				<div className="text-[#737377]">Tags :</div>
				<div className="text-[#737377]">Priority <span className="dark:text-white capitalize ml-2">{item?.priority}</span></div>
			</div>
		</Card>
	);
};

export default ReleaseCard;
