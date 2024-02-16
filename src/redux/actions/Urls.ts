export const domain = import.meta.env.VITE_DOMAIN;

/// https://pb-api.hyfy.app/api/collections/project/records

const Urls = {
	domain,
	upload: "/",
	imgBaseUrl: "/",
	host: `${domain}/`,
	baseUrl: `${domain}/api/collections`,

	user: "/users/records",
	profile: "/profile/records",

	project: "/project/records",
	epics: "/epic/records",
	issues: "/issues/records",
	release: "/release/records",
	sprints: "/sprints/records",
};

export default Urls;
