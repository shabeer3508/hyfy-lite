export interface UsersTypes {
    _id: string;
    user_name: string;
    email: string;
    avatar?: string;
    user_type: "organization" | "employee";
    role: "owner" | "admin" | "manager" | "employee";
    stage: "organization" | "purchase" | "invitations" | "completed";
    organizations: OrganizationType[];
    org_id?: string;
    is_deleted: boolean;
    verified: boolean;
    verification_code?: string;
    invitations: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrganizationType {
    _id: string;
    name: string;
    branch: string;
    location: string;
    address: string;
    state: string;
    country: string;
    pin_code: string;
    phone: string;
    email: string;
    created_by: string;
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvitationTypes {
    _id: string;
    title: string;
    message: string;
    sender: string;
    org_id?: OrganizationType[];
    status: "pending" | "accepted" | "rejected";
}

export interface ProjectType {
    _id: string;
    title: string;
    status: "done" | "in-progress" | "pending" | "open";
    owner: string | UsersTypes[];
    created_by: string;
    members: string[];
    epic: string[];
    issues: string[];
    description?: string;
    is_deleted: boolean;
    start_date?: Date;
    end_date?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface EpicTypes {
    _id: string;
    name: string;
    description?: string;
    status: "done" | "in-progress" | "pending" | "open";
    priority: "critical" | "high" | "medium" | "low";
    dependency?: string;
    dependency_type?: "blocking";
    project_id: string;
    release_id?: string | ReleaseTypes[];
    stories?: string[];
    is_deleted?: boolean;
    created_by?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IssueTypes {
    _id: string;
    name: string;
    org_id: string;
    points: number;
    status: string;
    assignor?: string;
    dependency?: string;
    cretaed_by?: string;
    description?: string;
    estimated_hours?: number;
    dependency_type?: "blocking";
    type: "story" | "task" | "bug";
    priority: "critical" | "high" | "medium" | "low";
    assign_to?: string[];
    sub_tasks?: string[];
    epic_id?: string | EpicTypes[];
    sprint_id?: string;
    release_id?: string;
    project_id: string;
    issue_id?: string;
    is_subtask?: boolean;
    is_deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IssueStatusTypes {
    _id?: string;
    name?: string;
    order?: string;
    org_id?: string;
    color?: string;
}

export interface SprintTypes {
    _id: string;
    org_id: string;
    name: string;
    duration?: string;
    description?: string;
    project_id: string;
    created_by?: string | UsersTypes[];
    exclude_days?: "option-1" | "option-2";
    status: "backlog" | "retro" | "in-progress";
    issues?: string[];
    is_deleted?: boolean;
    is_started?: boolean;
    exclude_public_holiday?: boolean;
    end_date?: Date;
    start_date?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ReleaseTypes {
    _id: string;
    name: string;
    org_id: string;
    project_id: string;
    file_name?: string;
    created_by?: string;
    version_name?: string;
    description?: string;
    release_note?: string;
    status?: "planning" | "on-going" | "released";
    priority?: "low" | "medium" | "high" | "urgent";
    tags?: string[];
    is_deleted?: boolean;
    is_pre_release?: boolean;
    to_date?: Date;
    from_date?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CommentsTypes {
    _id: string;
    org_id: string;
    message: string;
    created_by: string;
    project_id?: string;
    issue_id?: string;
    is_deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface NotificationType {
    _id: string;
    org_id?: string;
    title?: string;
    message?: string;
    types?: "comment" | "invitation" | "assigned";
    is_deleted?: boolean;
    created_by?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
