export const domain = import.meta.env.VITE_DOMAIN;

const Urls = {
	domain,
	upload: "/",
	imgBaseUrl: "/",
	host: `${domain}/`,
	baseUrl: `${domain}/api`,

	user: "/users",
};

export default Urls;
