import Urls from "../redux/actions/Urls";

const ApiConfig: { [key: string]: string } = {
	// profile: Urls.profile,
	users: Urls.user,
	project: Urls.project,
	epics: Urls.epics,
	release: Urls.release,
};

export default ApiConfig;
