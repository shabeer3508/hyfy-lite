import Urls from "../redux/actions/Urls";

const ApiConfig: { [key: string]: string } = {
	// profile: Urls.profile,
	users: Urls.users,
	project: Urls.project,
	epic: Urls.epic,
	release: Urls.release,
	issues: Urls.issues,
	sprints: Urls.sprints,

	comments: Urls.comments,
};

export default ApiConfig;
