import Actions from "../actions/ActionTypes";

export interface AppState {
    locale: any;
    language: any;
    dir: "ltr" | "rtl";
    showHelpScreen: boolean;
}

export interface AppInitialState {
    syncing: boolean;
    appState: AppState;
}

const initialState: AppInitialState = {
    syncing: false,
    appState: {
        dir: "ltr",
        language: null,
        locale: { code: "en", name: "English", rtl: false },
        showHelpScreen: false,
    },
};

export default function AppReducer() {
    let updatedState;
    return (state = initialState, action: any) => {
        switch (action.type) {
            case Actions.SET_APPSTATE:
                return { ...action.payload };

            case Actions.SET_DIRECTION:
                updatedState = {
                    ...state,
                    appState: { ...state.appState, dir: action.payload },
                };
                return updatedState;

            case Actions.SET_HELP_VIEW:
                updatedState = {
                    ...state,
                    appState: {
                        ...state.appState,
                        showHelpScreen: action.payload,
                    },
                };
                return updatedState;

            case Actions.SET_LOCALE:
                updatedState = {
                    ...state,
                    appState: {
                        ...state.appState,
                        locale: action.payload,
                        dir: action.payload.rtl ? "rtl" : "ltr",
                    },
                };
                return updatedState;

            default:
                return state;
        }
    };
}
