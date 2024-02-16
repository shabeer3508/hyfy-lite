import { lazy } from "react";

const Board = lazy(() => import("@/pages/board"));
const Backlog = lazy(() => import("@/pages/backlog"));
const Projects = lazy(() => import("@/pages/projects"));
const Sprints = lazy(() => import("@/pages/sprints"));
const Releases = lazy(() => import("@/pages/releases"));
const Team = lazy(() => import("@/pages/team"));
const Settings = lazy(() => import("@/pages/settings"));
const Profile = lazy(() => import("@/pages/profile"));

export { Backlog, Projects };

const defultRoutes = [
	{
		path: "/board",
		component: <Board />,
	},
	{
		path: "/backlog",
		component: <Backlog />,
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
		path: "/team",
		component: <Team />,
	},
	{
		path: "/settings",
		component: <Settings />,
	},
	{
		path: "/profile",
		component: <Profile />,
	},
];

const routes = [...defultRoutes];

export default routes;
