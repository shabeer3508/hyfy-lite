import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { HiFolder } from "react-icons/hi";
import { MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { ScrollArea, } from "@/components/ui/scroll-area";
import HYDialog from "@/components/hy-components/HYDialog";
import HYSearch from "@/components/hy-components/HYSearch";
import HYTooltip from "@/components/hy-components/HYTooltip";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import ProjectCreationForm from "@/pages/projects/forms/project-creation";
import ProjectDetailView from "@/components/HYComponents/detail-views/Project-detail-view";
import { getAction, reducerNameFromUrl, setProjectData } from "@/redux/actions/AppActions";


const Project = () => {
	const dispatch = useDispatch();

	const projectReducerName = reducerNameFromUrl("project", "GET");
	const projectListResponse = useSelector((state: any) => state?.[projectReducerName]);
	const projectsData = projectListResponse?.data?.items

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const projectPageInfo = appProfileInfo.projects

	/*  ######################################################################################## */

	const getProjects = (prams?: string) => {
		let query = "?perPage=300&expand=owner";
		if (prams) { query = query + prams }
		dispatch(getAction({ project: Urls.project + query }));
	}

	/*  ######################################################################################## */

	const statusOptions = [
		{ label: "Done", value: "done" },
		{ label: "In-progress", value: "in-progress" },
		{ label: "Pending", value: "pending" },
		{ label: "Open", value: "open" }]

	const orderFilterOption = [
		{ label: "Recent", value: "recent" },
		{ label: "Old", value: "old" }
	]

	/*  ######################################################################################## */

	useEffect(() => {
		getProjects();
	}, [projectPageInfo]);

	/*  ######################################################################################## */

	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center mx-6">
				<div className="flex flex-col gap-4">
					<p className="text-xl">Projects</p>
				</div>
				<div className="flex gap-2">
					<HYCombobox
						label="Order"
						unSelectable={false}
						options={orderFilterOption}
						defaultValue={projectPageInfo?.order_filter_value}
						onValueChange={(value) => dispatch(setProjectData(value, "order_filter_value"))}
					/>
					<HYCombobox
						label="Status"
						unSelectable={false}
						defaultValue={projectPageInfo?.status_filter_value}
						options={[{ label: "All", value: "all" }, ...statusOptions]}
						onValueChange={(value) => dispatch(setProjectData(value, "status_filter_value"))}
					/>
					<HYSearch />
					<ProjectCreationForm>
						<Button className="text-white">Create Project</Button>
					</ProjectCreationForm>
				</div>
			</div>

			<ScrollArea className="mt-4">
				<div className="flex flex-col gap-3 px-6 py-3">
					{projectsData?.map((item: any, index: number) => (
						<ProjectCard data={item} key={index} index={index} />
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default Project;

const ProjectCard = ({ data, index }: { data: any, index: number }) => {

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issuesItems = issuesListData?.data?.items;

	const projectIssues = issuesItems?.filter(
		(issue) => issue?.project_id === data?._id
	);

	const pieceWidth = 100 / projectIssues?.length;

	const logoColors = [
		// "text-[#FFFFFF]",
		"text-[#71A4FF]",
		"text-[#FF6481]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
	];

	const statusOptions = [
		{ label: "Done", value: "done" },
		{ label: "In-progress", value: "in-progress" },
		{ label: "Pending", value: "pending" },
		{ label: "Open", value: "open" }]


	return <Card className="dark:bg-[#151619] bg-[#F7F8F9]">
		<HYDialog
			className="max-w-6xl"
			content={<ProjectDetailView data={data} />}
		>
			<div className="flex justify-between items-center h-16 px-3 cursor-pointer">
				<div className="flex gap-3 items-center">
					<HiFolder className={`w-8 h-8 ${logoColors[index % 7]}`} />
					<div className="capitalize">{data?.title}</div>
				</div>
				<div className="flex gap-4 items-center">
					<HYCombobox unSelectable={false} defaultValue={data?.status} options={statusOptions} />
					<div className="flex items-center gap-4 w-[200px] truncate text-base">
						<HYAvatar url="https://github.com/shadcn.png" name={data?.owner?.[0]?.user_name} />
						<div className="truncate" title={data?.owner?.[0]?.user_name}>{data?.owner?.[0]?.user_name}</div>
					</div>
					{projectIssues?.length > 0 &&
						<div className="flex gap-1 w-[50px] sm:w-[100px] md:w-[200px] xl:w-[500px] h-2 overflow-hidden mr-3">
							{projectIssues?.map((itm => (
								<HYTooltip key={itm?._id} message={itm?.status} className='capitalize'>
									<div
										className={`
                                         ${itm?.status === "done" && "bg-[#56972E]"}
                                         ${itm?.status === "backlog" && "bg-[#FFFFFF66]"} 
                                         ${itm?.status === "ongoing" && "bg-cyan-500"} 
                                         ${itm?.status === "todo" && "bg-[#006EEF]"} 
                                         ${itm?.status === "pending" && "bg-[#D63B00]"} `}
										style={{ width: `${pieceWidth}%` }}>
									</div>
								</HYTooltip>
							)))}
						</div>
					}
					<Button variant="ghost" size="sm">
						<MoreVertical />
					</Button>
				</div>
			</div>
		</HYDialog>
	</Card>
}
