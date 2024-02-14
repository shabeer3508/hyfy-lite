import Backlog from "@/pages/backlog";

const Apple = ({ title }: { title?: string }) => {
	return (
		<div className="dark:text-foreground flex justify-center h-screen items-center">
			{title ?? "Apple"}
		</div>
	);
};

const defultRoutes = [
	{
		path: "/board",
		component: <Apple title="board" />,
	},
	{
		path: "/backlog",
		component: <Backlog />,
	},
	{
		path: "/sprints",
		component: <Apple title="sprints" />,
	},
	{
		path: "/releases",
		component: <Apple title="releases" />,
	},
	{
		path: "/projects",
		component: <Apple title="projects" />,
	},
	{
		path: "/team",
		component: <Apple title="team" />,
	},
	{
		path: "/settings",
		component: <Apple title="settings" />,
	},
];

const routes = [...defultRoutes];

export default routes;
