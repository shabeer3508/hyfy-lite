import HYAvatar from "@/components/HYComponents/HYAvatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReleaseCardProps {
	// TODO
	item?: any;
}

const ReleaseCard = ({ item }: ReleaseCardProps) => {
	const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
	return (
		<Card
			onDragStart={(e) => {
				e.dataTransfer.setData("id", item?.id);
			}}
			draggable={true}
			className="flex flex-col justify-between rounded-lg hover:cursor-grab "
		>
			<div className="flex gap-3 items-center h-16 px-4">
				<img src="/release_icon.svg" alt="Project" />
				<div className="capitalize ">{item?.name}</div>
			</div>
			<Separator className=" w-full" />
			<div className="p-4 space-y-1">
				<div className="text-base">{item?.description}</div>
				<div className="text-base">
					<span className=" text-xs text-[#737377]">From</span>{" "}
					<span className="">
						{formatter.format(new Date(item?.from))}
					</span>
					{"  "}
					<span className=" text-xs text-[#737377]">To</span>{" "}
					<span className="">
						{formatter.format(new Date(item?.to))}
					</span>
				</div>
			</div>
			<Separator className=" w-full" />
			<div className="flex items-center gap-3 p-4">
				<div className="flex gap-1">
					<img src="/story_icon.svg" alt="Project" />
					<span>12</span>
				</div>
				<div className="flex gap-1">
					<img src="/task_icon.svg" alt="Project" />
					<span>12</span>
				</div>
				<div className="flex gap-1">
					<img src="/bug_icon.svg" alt="Project" />
					<span>12</span>
				</div>
			</div>
			<Separator className=" w-full" />
			<div className="flex items-center p-4">
				<div className="flex items-center">
					<HYAvatar
						className=""
						url=""
						name="Shad D"
						color="bg-purple-400"
					/>
					<HYAvatar
						className="-ml-2 shadow-md"
						url=""
						name="Apple Seed"
						color="bg-amber-500"
					/>
					<HYAvatar
						className="-ml-2 shadow-md"
						url=""
						name="Jone ave"
						color="bg-fuchsia-700"
					/>
					<HYAvatar
						className="-ml-2 shadow-md"
						url=""
						name="Fazil Ali"
						color="bg-green-400"
					/>
				</div>
			</div>
		</Card>
	);
};

export default ReleaseCard;
