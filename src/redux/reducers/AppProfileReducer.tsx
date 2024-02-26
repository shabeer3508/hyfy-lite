import Actions from "../actions/ActionTypes";

interface BoardStates {
    selected_sprint?: string
}

interface SprintStates {
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
            case Actions.SET_PROJECT:
                return { ...initialState, project_id: action.payload };
            case Actions.SET_BOARD_SPRINT:
                return { ...state, board: { ...state.board, selected_sprint: action.payload } };
            case Actions.SET_SPRINTS_SPRINT:
                return { ...state, sprints: { ...state.sprints, selected_sprint: action.payload } };
            default:
                return state;
        }
    };
}
