import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiDotsVertical, HiFolder } from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectDetailView from "./project-detail-view";
import { IssueTypes, ProjectType } from "@/interfaces";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { ScrollArea, } from "@/components/ui/scroll-area";
import HYDialog from "@/components/hy-components/HYDialog";
import HYSearch from "@/components/hy-components/HYSearch";
import HYTooltip from "@/components/hy-components/HYTooltip";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import ProjectCreationForm from "@/pages/projects/forms/project-creation";
import { getAction, patchAction, reducerNameFromUrl, setProjectData } from "@/redux/actions/AppActions";


const Project: React.FC = () => {
	const dispatch = useDispatch();

	const projectReducerName = reducerNameFromUrl("project", "GET");
	const projectListResponse = useSelector((state: any) => state?.[projectReducerName]);
	const projectsData = projectListResponse?.data?.items as ProjectType[]

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const projectPageInfo = appProfileInfo.projects

	/*  ######################################################################################## */

	const getProjects = () => {
		let query = `?perPage=300&expand=owner
			&sort=${projectPageInfo.order_filter_value === "recent" ? "-createdAt" : "createdAt"}
			${projectPageInfo.status_filter_value !== "all" ? `&filter=status=${projectPageInfo.status_filter_value}` : ""}`;

		dispatch(getAction({ project: Urls.project + query }));
	}

	const getIssues = () => {
		let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
		dispatch(getAction({ issues: Urls.issues + query }));
	};

	/*  ######################################################################################## */

	const statusOptions = [
		{ label: "Open", value: "open" },
		{ label: "In-progress", value: "in-progress" },
		{ label: "Pending", value: "pending" },
		{ label: "Done", value: "done" },
	]

	const orderFilterOption = [
		{ label: "Recent", value: "recent" },
		{ label: "Old", value: "old" }
	]

	/*  ######################################################################################## */

	useEffect(() => {
		getProjects();
	}, [projectPageInfo]);

	useEffect(() => {
		getIssues();
	}, [])

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
						<Button className="text-white">Add Project</Button>
					</ProjectCreationForm>
				</div>
			</div>

			{projectsData?.length > 0 &&
				<ScrollArea className="mt-4">
					<div className="flex flex-col gap-3 px-6 py-3">
						{projectsData?.map((item, index: number) => (
							<ProjectCard data={item} key={index} index={index} />
						))}
					</div>
				</ScrollArea>
			}

			{projectsData?.length === 0 && <div className="dark:text-foreground flex justify-center h-full items-center">No Projects found</div>}
		</div>
	);
};

export default Project;







const ProjectCard = ({ data, index }: { data: ProjectType, index: number }) => {

	const dispatch = useDispatch()

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issuesItems = issuesListData?.data?.items as IssueTypes[];

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items;

	/*  ######################################################################################## */

	const getProjects = () => {
		let query = "?perPage=300&expand=owner";
		dispatch(getAction({ project: Urls.project + query }));
	}

	const findStatusNameById = (statusId) => {
		return issueStatusList?.find((status) => status?._id === statusId)?.name
	}

	const findIssueStatusIdByName = (statusName: "Todo" | "Ongoing" | "Backlog" | "Pending" | "Done") => {
		return issueStatusList?.find((status) => status?.name === statusName)?._id
	}


	// TODO: update projectIssue  from project issue count api response 
	const projectIssues = issuesItems?.filter(
		(issue) => issue?.project_id === data?._id
	);


	const handleProjectStatusChange = (projectStatus: string) => {
		(dispatch(patchAction({ project: Urls.project }, { status: projectStatus }, data?._id)) as any).then((res) => {
			if (res.payload?.status === 200) {
				getProjects();
			}
		})
	}

	/*  ######################################################################################## */

	const pieceWidth = 100 / projectIssues?.length;

	const logoColors = [
		"text-[#71A4FF]",
		"text-[#FF6481]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
	];

	const statusOptions = [
		{ label: "Open", value: "open" },
		{ label: "In-progress", value: "in-progress" },
		{ label: "Pending", value: "pending" },
		{ label: "Done", value: "done" },
	]

	/*  ######################################################################################## */

	return (
		<Card className="dark:bg-[#151619] hover:border-primary">
			<HYDialog
				className="max-w-6xl dark:bg-card"
				content={<ProjectDetailView data={data} />}
			>
				<div className="flex justify-between items-center h-16 px-3 cursor-pointer">
					<div className="flex gap-3 items-center ">
						<HiFolder className={`w-8 h-8 ${logoColors[index % 6]}`} />
						<div className="capitalize">{data?.title}</div>
					</div>
					<div className="flex gap-4 items-center">

						{/* {projectIssues?.length > 0 &&
							<div className="flex gap-1 w-[50px] sm:w-[100px] md:w-[200px] xl:w-[400px] h-2 overflow-hidden mr-3">
								{projectIssues?.map((issue => (
									<HYTooltip key={issue?._id} message={findStatusNameById(issue?.status)} className='capitalize'>
										<div
											className={`
                                         		${issue?.status === findIssueStatusIdByName("Done") && "bg-[#56972E]"}
                                         		${issue?.status === findIssueStatusIdByName("Backlog") && "bg-[#6D6E74]"} 
                                         		${issue?.status === findIssueStatusIdByName("Ongoing") && "bg-cyan-500"} 
                                         		${issue?.status === findIssueStatusIdByName("Todo") && "bg-[#006EEF]"} 
                                         		${issue?.status === findIssueStatusIdByName("Pending") && "bg-[#D63B00]"} `}
											style={{ width: `${pieceWidth}%` }}>
										</div>
									</HYTooltip>
								)))}
							</div>
						} */}

						<HYCombobox
							defaultValue={data?.status}
							options={statusOptions}
							onValueChange={(value) => handleProjectStatusChange(value)}
						/>

						<div className="flex items-center gap-4 w-[200px] truncate text-base">
							<HYAvatar
								url="https://github.com/shadcn.png"
								name={typeof data?.owner !== "string" && data?.owner?.[0]?.user_name}
							/>
							<div
								className="truncate"
								title={typeof data?.owner !== "string" && data?.owner?.[0]?.user_name}
							>
								{typeof data?.owner !== "string" && data?.owner?.[0]?.user_name}
							</div>
						</div>



						<HYDropDown options={[
							{
								label: "Edit",
								action: () => { }
							},
							{
								label: "Delete",
								action: (e) => { e?.stopPropagation() }
							},
						]}>
							<Button size="icon" variant="ghost" className="" onClick={(e) => e.stopPropagation()}>
								<HiDotsVertical className="size-5" />
							</Button>
						</HYDropDown>

					</div>
				</div>
			</HYDialog>
		</Card >
	)
}
