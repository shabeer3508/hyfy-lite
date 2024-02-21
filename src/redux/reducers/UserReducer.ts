import Actions from "../actions/ActionTypes";
const initialState = { user: null };

export default function UserReducer() {
	return (state = initialState, action: any) => {
		switch (action.type) {
			case Actions.SET_USER:
				return { ...state, user: action.payload };
			case Actions.CLEAR_USER:
				return { ...state, user: null };
			default:
				return state;
		}
	};
}
