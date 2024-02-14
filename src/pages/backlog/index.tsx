import { Input } from "@/components/ui/input";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IoIosSearch } from "react-icons/io";

import { CiSquarePlus } from "react-icons/ci";

const Backlog = () => {
	return (
		<div className="dark:text-foreground h-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className=" rounded-lg "
			>
				<ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
					<EpicsColumn />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={70}>
					<ResizablePanelGroup
						direction="horizontal"
						className=" rounded-lg "
					>
						<ResizablePanel defaultSize={50}>
							<BacklogColumn />
						</ResizablePanel>
						{/* <ResizableHandle /> */}
						<ResizablePanel defaultSize={50}>
							<SprintsColumn />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default Backlog;

const EpicsColumn = () => {
	return (
		<div className="flex flex-col h-full px-6">
			<div className="flex items-center justify-between w-full">
				<div className="">Epics</div>
				<div className="flex items-center bg-background pr-3 rounded border">
					<Input
						className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
						placeholder="Search"
					/>
					<IoIosSearch />
				</div>
				<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 border-primary text-primary">
					+
				</div>
			</div>
			<div className="flex border-b w-full  py-3">
				<div className="flex items-center bg-background pr-3 rounded border">
					<Input
						className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
						placeholder="Search"
					/>
					<IoIosSearch />
				</div>
			</div>
			<div className="flex items-center border-b h-10 w-full">
				<span className="">No Epics</span>
			</div>
			<div></div>
		</div>
	);
};

const BacklogColumn = () => {
	return (
		<div className="flex h-full items-center justify-center p-6 border-r">
			<span className="font-semibold">Backlogs</span>
		</div>
	);
};

const SprintsColumn = () => {
	return (
		<div className="flex h-full items-center justify-center p-6">
			<span className="font-semibold">Sprints</span>
		</div>
	);
};
