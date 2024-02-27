import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { HiFolder } from "react-icons/hi";
import { MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import HYDialog from "@/components/HYComponents/HYDialog";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import HYStatusBadge from "@/components/HYComponents/HYStatusBadge";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import ProjectCreationForm from "@/components/HYComponents/forms/project-creation";
import ProjectDetailView from "@/components/HYComponents/DetailViews/Project-detail-view";


const Project = () => {
	const dispatch = useDispatch();
	const reducerName = reducerNameFromUrl("project", "GET");
	const itemsRes = useSelector((state: any) => state?.[reducerName]);

	useEffect(() => {
		loadAction();
	}, []);

	function loadAction(prams?: string) {
		let query = "?expand=owner";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ project: Urls.project + query }));
	}

	const items = itemsRes?.data?.items?.map((val: any) => ({
		...val,
		...val?.expand,
	}));

	return (
		<div className=" flex flex-col h-full">
			<div className=" flex justify-between items-end mx-6">
				<div className="flex flex-col gap-4">
					<p className=" text-xl ">Projects</p>
					<ProjectCreationForm>
						<Button size="sm">Create Project</Button>
					</ProjectCreationForm>
				</div>
				<div className="flex gap-2">
					<HYSearch />
					<div className="">
						<HYSelect id="" label="Status" options={["done", "in-progress", "pending", "open"]} />
					</div>
				</div>
			</div>
			<div className=" overflow-auto px-6 ">
				<div className="flex flex-col gap-3 mt-4">
					{items?.map((item: any, index: number) => (
						<ProjectCard data={item} key={index} index={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Project;

const ProjectCard = ({ data, index }: { data: any, index: number }) => {

	const logoColors = [
		"text-[#FFFFFF]",
		"text-[#71A4FF]",
		"text-[#FF6481]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
	];

	return <Card className="dark:bg-[#151619]">
		<HYDialog
			className="max-w-6xl"
			content={<ProjectDetailView data={data} />}
		>
			<div className="flex justify-between items-center h-16 px-3 cursor-pointer">
				<div className="flex gap-3 items-center">
					<HiFolder className={`w-8 h-8 ${logoColors[index % 7]}`} />
					<div className="capitalize">{data?.title}</div>
				</div>
				<div className="flex gap-4">
					<div className="flex items-center gap-4">
						<HYAvatar url="https://github.com/shadcn.png" name={data?.owner?.name} />
						<a>{data?.expand?.owner?.name}</a>
					</div>
					<HYStatusBadge status={data?.status} />
					<Button variant="ghost" size="sm">
						<MoreVertical />
					</Button>
				</div>
			</div>
		</HYDialog>
	</Card>
}
