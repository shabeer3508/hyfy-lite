import { lazy } from "react";

const Apple = ({ title }: { title?: string }) => {
	return <div className="dark:text-foreground flex justify-center h-screen items-center">{title ?? "Apple"}</div>;
};

const Board = lazy(() => import("@/pages/board"));
const Backlog = lazy(() => import("@/pages/backlog"));
const Projects = lazy(() => import("@/pages/projects"));
const Sprints = lazy(() => import("@/pages/sprints"));
const Releases = lazy(() => import("@/pages/releases"));
const Team = lazy(() => import("@/pages/team"));
const Settings = lazy(() => import("@/pages/settings"));

export { Backlog, Projects, Apple };

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
];

const routes = [...defultRoutes];

export default routes;
