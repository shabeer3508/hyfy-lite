export const domain = import.meta.env.VITE_API;

/// https://pb-api.hyfy.app/api/collections/project/records

const Urls = {
    domain,
    upload: "/",
    imgBaseUrl: "/",
    host: `${domain}/`,
    baseUrl: `${domain}/api`,

    // login
    authenticate: "/login",

    // Signup
    signup_send_email: "/email",
    signup_verify_email: "/verifyEmail",
    signup_verify_coupon: "/subscriptions",
    signup_setup_organization: "/organizationOnboard",

    users: "/users",
    profile: "/profile",
    organization: "/organizations",

    invite_user: "/sendInvitation",
    invitations: "/invitations",
    invitations_skip: "/invitations/skip",

    project: "/projects",
    epic: "/epics",
    issues: "/issues",
    release: "/release",
    sprints: "/sprints",

    stages: "/stages",
    stages_list: "/projects/stages",
    stages_order: "/stages/change/order",
    sub_tasks: "/subTask",

    comments: "/comments",
    history: "/history",
    issue_status: "/issueStatus",
    sprint_members: "/sprints/members",
    issue_attachment: "/issues/uploads",
    board_templates: "/templates",
};

export default Urls;
