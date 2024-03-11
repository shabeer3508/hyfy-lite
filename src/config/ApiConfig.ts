import Urls from "../redux/actions/Urls";

const ApiConfig: { [key: string]: string } = {
	users: Urls.users,
	organization: Urls.organization,

	//login
	login: Urls.authenticate,

	//signup
	signupSendEmail: Urls.signup_send_email,
	signupVerifyEmail: Urls.signup_verify_email,
	signupSetupOrganization: Urls.signup_setup_organization,

	invitaions: Urls.invitations,
	invitations_skip: Urls.invitations_skip,

	invite: Urls.invite_user,

	epic: Urls.epic,
	release: Urls.release,
	issues: Urls.issues,
	sprints: Urls.sprints,
	project: Urls.project,

	comments: Urls.comments,

	issueStatus: Urls.issue_status,
};

export default ApiConfig;
