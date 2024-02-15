import { combineReducers } from "redux";
import UserReducer from "./reducers/UserReducer";
import SidebarReducer from "./reducers/SidebarReducer";
import ReducerModuleManger from "./ReducerModuleManager";

const apiConfigReducers = ReducerModuleManger.ApiConfigReducers();

const AllReducers = {
	UserReducer: UserReducer(),
	// AppReducer: AppReducer(),
	SidebarReducer: SidebarReducer(),

	...apiConfigReducers,
};

const RootReducer = combineReducers(AllReducers);

const whitelistReducers: string[] = ["UserReducer", "SidebarReducer"];
export { whitelistReducers, RootReducer };
