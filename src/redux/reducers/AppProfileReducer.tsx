import Actions from "../actions/ActionTypes";

export interface BoardStates {
    selected_sprint?: string
    task_filter_value?: string
    type_filter_value?: string
    points_filter_value?: string
}

export interface SprintStates {
    selected_sprint?: string
}

export interface ProjectStates {
    status_filter_value?: string
    order_filter_value?: string
}

export interface TeamsStates {
    role_filter_value?: string
    order_filter_value?: string
}

export interface ReleaseStates {
    points_filter_value?: string
    order_filter_value?: string
}

export interface BacklogStates {
    backlog_sort_value?: string;
    backlog_filter_values?: string[];
    backlog_assignee_value?: string;
    backlog_epic_value?: string;

    sprint_sort_value?: string;
    sprint_status_value?: string;
}

export interface AppProfileTypes {
    project_id: string,
    board: BoardStates,
    backlog: BacklogStates,
    sprints: SprintStates,
    releases: ReleaseStates,
    projects: ProjectStates,
    teams: TeamsStates
}

const initialState: AppProfileTypes = {
    project_id: "",
    board: {
        selected_sprint: "",
        task_filter_value: "all",
        type_filter_value: "all",
        points_filter_value: "all"
    },
    backlog: {
        backlog_assignee_value: "all",
        backlog_epic_value: "all",
        backlog_sort_value: "-createdAt",

        sprint_sort_value: "-createdAt",
        sprint_status_value: "all",
    },
    sprints: {
        selected_sprint: ""
    },
    releases: {
        order_filter_value: "recent",
        points_filter_value: "hp"
    },
    projects: {
        status_filter_value: "all",
        order_filter_value: "recent"
    },
    teams: {
        role_filter_value: "all",
        order_filter_value: "recent",
    }
};

export default function AppProfileReducer() {
    return (state = initialState, action: any) => {
        switch (action.type) {
            case Actions.RESET_APP_INFO:
                return initialState;
            case Actions.SET_PROJECT:
                return { ...initialState, project_id: action.payload };
            case Actions.SET_BOARD_PAGE_DATA:
                return { ...state, board: { ...state.board, [action.payload?.key]: action.payload?.data } };
            case Actions.SET_BACKLOG_PAGE_DATA:
                return { ...state, backlog: { ...state.backlog, [action.payload?.key]: action.payload?.data } };
            case Actions.SET_SPRINTS_PAGE_DATA:
                return { ...state, sprints: { ...state.sprints, [action.payload?.key]: action.payload?.data } };
            case Actions.SET_RELEASE_PAGE_DATA:
                return { ...state, releases: { ...state.releases, [action.payload?.key]: action.payload?.data } };
            case Actions.SET_PROJECT_PAGE_DATA:
                return { ...state, projects: { ...state.projects, [action.payload?.key]: action.payload?.data } };
            case Actions.SET_TEAMS_PAGE_DATA:
                return { ...state, teams: { ...state.teams, [action.payload?.key]: action.payload?.data } };
            default:
                return state;
        }
    };
}
