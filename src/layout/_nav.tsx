import {
	PieChartIcon,
	CircleDot,
	CheckSquare,
	KanbanSquare,
} from "lucide-react";

const _nav = [
	{
		_tag: "NavTitle",
		name: "Dashboard",
	},
	{
		path: "/dashboard",
		icon: PieChartIcon,
	},
	{
		path: "/issues",
		icon: CircleDot,
	},
	{
		path: "/tasks",
		icon: CheckSquare,
	},
	{
		path: "/projects",
		icon: KanbanSquare,
	},
];

export default _nav;
