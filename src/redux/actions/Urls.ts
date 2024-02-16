export const domain = import.meta.env.VITE_DOMAIN;

/// https://pb-api.hyfy.app/api/collections/project/records

const Urls = {
	domain,
	upload: "/",
	imgBaseUrl: "/",
	host: `${domain}/`,
	baseUrl: `${domain}/api/collections`,

	user: "/users",
	profile: "/profile",

	project: "/project/records",
	epics: "/epic/records",
	issues: "/issues/records",
};

export default Urls;
