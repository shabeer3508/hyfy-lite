import { combineReducers } from "redux";
import UserReducer from "./reducers/UserReducer";
import SidebarReducer from "./reducers/SidebarReducer";

const AllReducers = {
	UserReducer: UserReducer(),
	// AppReducer: AppReducer(),
	SidebarReducer: SidebarReducer(),
};

const RootReducer = combineReducers(AllReducers);

const whitelistReducers: string[] = ["UserReducer", "SidebarReducer"];
export { whitelistReducers, RootReducer };
