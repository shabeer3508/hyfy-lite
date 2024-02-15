import HYSearch from "@/components/SBComponents/HYSearch";
import { Button } from "@/components/ui/button";
import React from "react";

const Index = () => {
	return (
		<div className=" h-full">
			<div className="flex justify-between items-end mx-8">
				<div className="flex flex-col gap-1">
					<p className="text-lg ">Projects</p>
					<Button>Create Project</Button>
				</div>
				<div className="flex gap-2">
					<HYSearch />
					<HYSearch />
				</div>
			</div>
			{/* <ResizablePanelGroup direction="vertical" className="">
				<ResizablePanel defaultSize={25}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Header</span>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={75}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Content</span>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup> */}
		</div>
	);
};

export default Index;
