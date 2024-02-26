import Actions from "../actions/ActionTypes";

export interface AppState {
	mode: "dark" | "light" | "auto";
	dir: "ltr" | "rtl";
	language: any;
	locale: any;
}

export interface AppInitialState {
	syncing: boolean;
	appState: AppState;
}

const initialState: AppInitialState = {
	syncing: false,
	appState: {
		dir: "ltr",
		mode: "light",
		language: null,
		locale: { code: "en", name: "English", rtl: false },
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
			case Actions.SET_DARK_MODE:
				updatedState = {
					...state,
					appState: { ...state.appState, mode: action.payload },
				};
				return updatedState;

			default:
				return state;
		}
	};
}
