const initialState = {
	sidebarShow: "responsive",
	minimize: false,
	dir: "ltr", // ltr : rtl
};

export default function SidebarReducer() {
	return (state = initialState, action: any) => {
		switch (action.type) {
			case "set":
				return { ...state, sidebarShow: action.sidebarShow };
			case "set_align":
				return { ...state, dir: action.dir };
			case "minimize":
				return { ...state, minimize: action.minimize };
			default:
				return state;
		}
	};
}

// export default SidebarReducer
