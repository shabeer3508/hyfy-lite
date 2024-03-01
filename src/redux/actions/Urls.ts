export const domain = import.meta.env.VITE_DOMAIN;

/// https://pb-api.hyfy.app/api/collections/project/records

const Urls = {
	domain,
	upload: "/",
	imgBaseUrl: "/",
	host: `${domain}/`,
	baseUrl: `${domain}/api`,

	authenticate: "/login",

	users: "/users",
	profile: "/profile",
	organization: "/organizations",

	project: "/projects",
	epic: "/epics",
	issues: "/issues",
	release: "/release",
	sprints: "/sprints",

	comments: "/comments",
};

export default Urls;
