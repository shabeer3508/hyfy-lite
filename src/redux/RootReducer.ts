import { combineReducers } from "redux";
import UserReducer from "./reducers/UserReducer";
import SidebarReducer from "./reducers/SidebarReducer";
import ReducerModuleManger from "./ReducerModuleManager";
import AppProfileReducer from "./reducers/AppProfileReducer";

const apiConfigReducers = ReducerModuleManger.ApiConfigReducers();

const AllReducers = {
	UserReducer: UserReducer(),
	AppProfile: AppProfileReducer(),
	SidebarReducer: SidebarReducer(),

	...apiConfigReducers,
};

const RootReducer = combineReducers(AllReducers);

const whitelistReducers: string[] = [
	"UserReducer",
	"AppProfile",
	"SidebarReducer",
];

export { whitelistReducers, RootReducer };
