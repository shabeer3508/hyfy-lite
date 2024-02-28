export const domain = import.meta.env.VITE_DOMAIN;

/// https://pb-api.hyfy.app/api/collections/project/records

const Urls = {
	domain,
	upload: "/",
	imgBaseUrl: "/",
	host: `${domain}/`,
	baseUrl: `${domain}/api/collections`,

	authenticate: "/users/auth-with-password",

	users: "/users/records",
	profile: "/profile/records",
	organization: "/organization/records",

	project: "/project/records",
	epic: "/epic/records",
	issues: "/issues/records",
	release: "/release/records",
	sprints: "/sprints/records",

	comments: "/comments/records",
};

export default Urls;
