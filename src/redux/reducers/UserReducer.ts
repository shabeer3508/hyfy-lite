import Actions from "../actions/ActionTypes";
const initialState = { token: null };

export default function UserReducer() {
	return (state = initialState, action: any) => {
		switch (action.type) {
			case Actions.SET_TOKEN:
				return { ...state, token: action.payload };
			default:
				return state;
		}
	};
}
