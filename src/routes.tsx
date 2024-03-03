import { lazy } from "react";

const Board = lazy(() => import("@/pages/board/index"));
const Backlog = lazy(() => import("@/pages/backlog/index"));
const Epics = lazy(() => import("@/pages/epics/index"));
const Sprints = lazy(() => import("@/pages/sprints/index"));
const Releases = lazy(() => import("@/pages/releases/index"));
const Projects = lazy(() => import("@/pages/projects/index"));
const Teams = lazy(() => import("@/pages/team/index"));
const Settings = lazy(() => import("@/pages/settings/index"));
const Profile = lazy(() => import("@/pages/profile"));
const Notification = lazy(() => import("@/pages/notification"));

export { Backlog, Projects };

const defultRoutes = [
	{
		path: "/",
		component: <Board />,
	},
	{
		path: "/board",
		component: <Board />,
	},
	{
		path: "/backlog",
		component: <Backlog />,
	},
	{
		path: "/epics",
		component: <Epics />,
	},
	{
		path: "/sprints",
		component: <Sprints />,
	},
	{
		path: "/releases",
		component: <Releases />,
	},
	{
		path: "/projects",
		component: <Projects />,
	},
	{
		path: "/teams",
		component: <Teams />,
	},
	{
		path: "/settings",
		component: <Settings />,
	},
	{
		path: "/profile",
		component: <Profile />,
	},
	{
		path: "/notification",
		component: <Notification />,
	},
];

const routes = [...defultRoutes];

export default routes;
