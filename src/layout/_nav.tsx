import { HiOutlineLightBulb, HiOutlineHashtag, HiUserGroup, HiClipboardList, HiViewBoards } from "react-icons/hi";
import { HiArrowPathRoundedSquare, HiBookOpen } from "react-icons/hi2";
import { TbSettingsFilled } from "react-icons/tb";

const _nav = [
	{
		path: "/board",
		icon_name: "nav_board",
		icon: <HiViewBoards className="w-5 h-5" />,
	},
	// {
	// 	path: "/backlog",
	// 	icon_name: "nav_backlog",
	// 	icon: <HiClipboardList className="w-5 h-5" />,
	// },
	// {
	// 	path: "/epics",
	// 	icon_name: "nav_backlog",
	// 	icon: <HiBookOpen className="w-5 h-5" />,
	// },
	// {
	// 	path: "/releases",
	// 	icon_name: "nav_releases",
	// 	icon: <HiOutlineHashtag className="w-5 h-5" />,
	// },
	// {
	// 	path: "/sprints",
	// 	icon_name: "nav_sprints",
	// 	icon: <HiArrowPathRoundedSquare className="w-5 h-5" />,
	// },
	{
		path: "/projects",
		icon_name: "nav_projects",
		icon: <HiOutlineLightBulb className="w-5 h-5" />,
	},
	{
		path: "/teams",
		icon_name: "nav_teams",
		name: "Members",
		icon: <HiUserGroup className="w-5 h-5" />,
	},
	{
		path: "/settings",
		icon_name: "nav_settings",
		icon: <TbSettingsFilled className="w-5 h-5" />,
	},
];

export default _nav;
