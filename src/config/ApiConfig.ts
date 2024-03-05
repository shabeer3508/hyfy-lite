import Urls from "../redux/actions/Urls";

const ApiConfig: { [key: string]: string } = {
	// profile: Urls.profile,
	users: Urls.users,
	organization: Urls.organization,
	project: Urls.project,

	//signup
	signupSendEmail: Urls.signup_send_email,

	epic: Urls.epic,
	release: Urls.release,
	issues: Urls.issues,
	sprints: Urls.sprints,

	comments: Urls.comments,
};

export default ApiConfig;
