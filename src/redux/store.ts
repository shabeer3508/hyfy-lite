import Axios from "axios";
import Cookies from "js-cookie";
import axiosMiddleware from "redux-axios-middleware";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import localforage from "localforage";
//
import Urls from "./actions/Urls";
import { RootReducer, whitelistReducers } from "./RootReducer";
import ErrorManager from "../utils/ErrorManager";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "Hyfy",
	version: 1.0,
	size: 100000000, // 100MB // Size of database, in bytes.
	storeName: "hyfy", // Should be alphanumeric, with underscores.
	description: "Hyfy project management tool",
});

const persistConfig = {
	key: "root",
	storage: localforage,
	whitelist: whitelistReducers,
};

const client = Axios.create({
	baseURL: Urls.baseUrl,
	responseType: "json",
});

const middleware = axiosMiddleware(client, {
	interceptors: {
		request: [
			{
				success: async function (items: any, req: any) {
					const token = Cookies.get("hyfy_auth_token");
					const tokenLessApis = ["/email", "/login", "/verifyEmail"];

					if (token && !tokenLessApis?.includes(req?.url)) {
						req.headers["Authorization"] = `Bearer ${token}`;
					}

					console.log("interceptors request", req); //contains information about request object

					return req;
				},
				error: function (item: any, error: any) {
					console.log("interceptors request error", error);
					// return response;
				},
			},
		],
		response: [
			{
				success: function (item: any, res: any) {
					console.log(
						`store,  : interceptors response: res ${res?.config?.url}`,
						res
					); //contains information about request object
					return Promise.resolve(res);
				},
				error: function (actions: any, error: any) {
					ErrorManager.handle(error);
					return Promise.reject(error);
				},
			},
		],
	},
});

const pReducer = persistReducer(persistConfig, RootReducer);
const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	pReducer,
	composeEnhancers(applyMiddleware(middleware))
);
const persistor = persistStore(store);

export { persistor, store, client };
