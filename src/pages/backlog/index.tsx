import EpicsColumn from "./epics-column";
import { useSelector } from "react-redux";
import BacklogColumn from "./backlog-column";
import SprintsColumn from "./sprints-column";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const Backlog = () => {

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	if (!appProfileInfo?.project_id) {
		return <NoProjectScreen />
	}

	return (
		<div className="dark:text-foreground h-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className="rounded-lg "
			>
				{/* 
					<ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
						<EpicsColumn />
					</ResizablePanel> 
					<ResizableHandle /> 
				*/}
				<ResizablePanel defaultSize={70}>
					<ResizablePanelGroup
						direction="horizontal"
						className=" rounded-lg "
					>
						<ResizablePanel defaultSize={50}>
							<BacklogColumn />
						</ResizablePanel>
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
