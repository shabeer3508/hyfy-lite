import {
	PieChartIcon,
	CircleDot,
	CheckSquare,
	KanbanSquare,
} from "lucide-react";

const _nav = [
	{
		path: "/board",
		icon_name: "nav_board",
		icon: PieChartIcon,
	},
	{
		path: "/backlog",
		icon_name: "nav_backlog",
		icon: CircleDot,
	},
	{
		path: "/sprints",
		icon_name: "nav_sprints",
		icon: CheckSquare,
	},
	// {
	// 	path: "/standup",
	// 	icon_name: "nav_sprints.svg",
	// 	icon: KanbanSquare,
	// },
	{
		path: "/releases",
		icon_name: "nav_releases",
		icon: CircleDot,
	},
	{
		path: "/projects",
		icon_name: "nav_projects",
		icon: CheckSquare,
	},
	{
		path: "/team",
		icon_name: "nav_teams",
		icon: KanbanSquare,
	},
	{
		path: "/settings",
		icon_name: "nav_settings",
		icon: KanbanSquare,
	},
];

export default _nav;
