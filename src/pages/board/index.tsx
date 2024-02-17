import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { HiOutlineInbox } from "react-icons/hi2";
import {
	HiPlus,
	HiFilter,
	HiBookOpen,
	HiOutlineArrowNarrowUp,
	HiDatabase,
} from "react-icons/hi";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import BoardCard from "./boardCard";

const Board = () => {
	return (
		<>
			<div className="text-xs">
				<div className="flex justify-between px-5 items-center">
					<div className="text-base">Sprint name</div>
					<div className="flex gap-2">
						<HYSelect id="tasks" options={[]} />
						<HYSelect id="types" options={[]} />
						<HYSelect id="points" options={[]} />
						<HYSearch />
					</div>
				</div>
				<div className="px-5 flex my-5">
					<div>Day 5</div>
					<Separator
						className="px-2"
						orientation="vertical"
						decorative
					/>
					<div>24 March - 28 March</div>
				</div>
				<div>
					<ResizablePanelGroup
						direction="horizontal"
						className=" rounded-lg "
					>
						<ResizablePanel defaultSize={25}>
							{/* <EpicsColumn /> */}
							<div className="text-center">
								<div className="flex justify-between items-center px-5 py-2">
									<div>Todo</div>
									<div className="flex gap-2 items-center">
										<HiDatabase /> 100
									</div>
								</div>
								<div className="px-5 py-2">
									<BoardCard />
								</div>
							</div>
						</ResizablePanel>
						{/* <ResizableHandle /> */}

						<ResizablePanel defaultSize={25}>
							{/* <BacklogColumn /> */}
							<div className="text-center">
								<div className="flex justify-between items-center px-5 py-2">
									<div>Ongoing</div>
									<div className="flex gap-2 items-center">
										<HiDatabase /> 50
									</div>
								</div>
								<div className="px-5 py-2">
									<BoardCard />
								</div>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							{/* <SprintsColumn /> */}
							<div className=" text-center">
								<div className="flex justify-between items-center px-5 py-2">
									<div>Pending</div>
									<div className="flex gap-2 items-center">
										<HiDatabase />
										30
									</div>
								</div>
								<div className="px-5 py-2">
									<BoardCard />
								</div>
							</div>
						</ResizablePanel>
						<ResizablePanel defaultSize={25}>
							{/* <SprintsColumn /> */}
							<div className="text-center">
								<div className="flex justify-between items-center px-5 py-2">
									<div>Done</div>
									<div className="flex gap-2 items-center">
										<HiDatabase /> 21
									</div>
								</div>
								<div className="px-5 py-2">
									<BoardCard />
								</div>
							</div>
						</ResizablePanel>
					</ResizablePanelGroup>
				</div>
			</div>
			{/* <div className="dark:text-foreground flex justify-center h-[calc(100vh-100px)] items-center">
				<div className="flex flex-col justify-center items-center text-center gap-3">
					<div>
						<HiOutlineInbox className="text-primary h-20 w-20 " />
					</div>
					<div className="text-primary text-3xl font-semibold">
						Nothing here!
					</div>
					<div className="dark:text-foreground">
						You have not been assigned any tasks
					</div>
				</div>
			</div> */}
		</>
	);
};

export default Board;
