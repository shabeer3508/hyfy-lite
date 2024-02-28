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

interface BacklogStates {
    epics: any,
    backlog: any,
    sprints: any
}

export interface AppProfileTypes {
    project_id: string,
    board: BoardStates,
    backlog: BacklogStates,
    sprints: SprintStates,
    releases: any,
    projects: any,
    teams: any
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
        epics: {},
        backlog: {},
        sprints: {}
    },
    sprints: {
        selected_sprint: ""
    },
    releases: {},
    projects: {},
    teams: {}
};

export default function AppProfileReducer() {
    return (state = initialState, action: any) => {
        switch (action.type) {
            case Actions.RESET_APP_INFO:
                return initialState;
            case Actions.SET_PROJECT:
                return { ...initialState, project_id: action.payload };
            case Actions.SET_BOARD_DATA:
                return { ...state, board: { ...state.board, [action.payload?.key]: action.payload?.data } };
            case Actions.SET_SPRINTS_DATA:
                return { ...state, sprints: { ...state.sprints, [action.payload?.key]: action.payload?.data } };
            default:
                return state;
        }
    };
}
