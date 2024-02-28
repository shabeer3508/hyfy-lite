export interface userDataTypes {
	id: string;
	name: string;
	role: "owner" | "admin" | "manager" | "employee";

	avatar?: string;
	collectionId?: string;
	collectionName?: string;
	created?: Date;
	updated?: Date;
	email?: string;
	emailVisibility?: boolean;
	username?: string;
	verified?: boolean;
}

export interface ProjectDataType {
	id: string;
	title: string;
	status: "done" | "in-progress" | "pending" | "open";

	start_date?: Date;
	end_date?: Date;
	owner: string;
	members: string[];
	epic: string[];
	issues: string[];
	description?: string;
}

export interface EpicDataTypes {
	id: string;
	name: string;
	status: "done" | "in-progress" | "pending" | "open";
	priority: "critical" | "heigh" | "medium" | "low";
	project_id: string;

	description?: string;
	dependency?: string;
	dependency_type?: "blocking";
	stories?: string[];
	releases?: string;
}

export interface IssueDataTypes {
	id: string;
	name: string;
	points: number;
	project_id: string;
	type: "story" | "task" | "bug";
	status: "backlog" | "todo" | "ongoing" | "pending" | "done";
	priority: "critical" | "heigh" | "medium" | "low";

	estimated_hours?: number;
	description?: string;
	epic?: string;
	assign_to?: string[];
	dependency?: string;
	dependency_type?: "blocking" | "";
	assignor?: string;
	sprint?: string;
	sub_tasks?: string[];
	release_id?: string;
	is_subtask?: boolean;
	parent_task?: string;
}

export interface SprintDataTypes {
	id: string;
	name: string;
	status: "backlog" | "retro" | "in-progress";
	project_id: string;

	description?: string;
	duration?: number;
	exclude_days?: "" | "";
	exclude_public_holiday?: boolean;
	start_date?: Date;
	end_date?: Date;
	issues?: string[];
	created_by?: string;
	is_started?: boolean;
}

export interface ReleaseDataTypes {
	id: string;
	name: string;
	project_id: string;

	to_date?: Date;
	from_date?: Date;
	description?: string;
	release_note?: string;
	version_name?: string;
	is_pre_release?: boolean;
	status?: "planning" | "ongoing" | "released";
	priority?: "low" | "medium" | "high" | "urgent";
}

export interface CommentsDataTypes {
	id: string;
	message: string;
	created_by: string;
	project_id?: string;
	issue_id?: string;
}
