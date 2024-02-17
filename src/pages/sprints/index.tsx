import SprintCard from "./sprintCard";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sprints = () => {
	const sampleData = Array.from({ length: 6 }).map((_, i, a) => ({
		id: i + 1,
		name: `Sprint-${i}`,
	}));

	return (
		<div className="text-xs">
			<div className="flex justify-between px-5 items-center">
				<div className="text-base flex gap-5">
					<div>Sprint Name</div>
					<div className="flex gap-3">
						(
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
						)
					</div>
				</div>
				<div className="flex gap-2">
					<HYSelect id="tasks" options={[]} />
					<HYSelect id="types" options={[]} />
					<HYSelect id="points" options={[]} />
					<HYSearch />
				</div>
			</div>
			<div className="px-5 grid grid-cols-5 mt-6 mb-4 gap-3">
				<div>Item</div>
				<div>Points</div>
				<div>Hours</div>
				<div>Status</div>
				<div>Assigned to</div>
			</div>
			<ScrollArea className="h-[calc(100vh-200px)] w-full">
				<div className="px-5 space-y-2">
					{sampleData?.map((sprint) => {
						return <SprintCard data={sprint} />;
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default Sprints;
