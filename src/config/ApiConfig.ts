import Urls from "../redux/actions/Urls";

const ApiConfig = {
    users: Urls.users,
    profile: Urls.profile,
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

    stagesList: Urls.stages_list,
    stages: Urls.stages,
    stageOrder: Urls.stages_order,
    subTasks: Urls.sub_tasks,

    comments: Urls.comments,
    history: Urls.history,
    sprintMembers: Urls.sprint_members,

    issueStatus: Urls.issue_status,
    issueAttachment: Urls.issue_attachment,
    boardTemplates: Urls.board_templates,
};

export default ApiConfig;
