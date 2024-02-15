import Actions from "./ActionTypes";
import { AppInitialState } from "../reducers/AppReducer";
import { capitalizeFirstLetter } from "../../utils/utils";

const AppActions = {};

type actionType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const reducerNameFromUrl = (url: string, method: actionType, isDeatil = false) => {
	const match = /[^a-zA-Z ]/g;
	const lastPath = /\/([^/]*)$/;
	let name = `${method.toLowerCase()}${url}`.replace(lastPath, "")?.replaceAll(match, " ");
	name = capitalizeFirstLetter(name);
	// name = camelize(name);
	if (isDeatil) {
		name = name + "Detail";
	}
	return name;
};

export const actionTypeFromUrl = (url: string, method: actionType, isDeatil = false) => {
	const match = /[^a-zA-Z ]/g;
	const lastPath = /\/([^/]*)$/;
	let ActionType = `${method}${url}`.replace(lastPath, "")?.replace(match, "_").toUpperCase();
	if (isDeatil) {
		ActionType = ActionType + "_DETAIL";
	}
	return ActionType;
};

/**
 * Creates redux http action for redux axios middleware
 * @param apiUrl url path for data to be fetched
 * @param params oprtinal query params
 * @returns redux action
 */
export function getAction(apiUrl: string | object, params?: any) {
	const method = "GET";
	let url = typeof apiUrl === "string" ? apiUrl : Object.values(apiUrl)[0];
	url = params ? url + `?${params}` : url;
	const typeName = typeof apiUrl === "string" ? apiUrl : Object.keys(apiUrl)[0];
	const type = actionTypeFromUrl(typeName, method);
	return {
		type,
		payload: { request: { url, method } },
	};
}

export function getDetailAction(apiurl: string | object, id: any, params?: any) {
	const method = "GET";
	let url = typeof apiurl === "string" ? apiurl : Object.values(apiurl)[0];
	const apiUrl = typeof apiurl === "string" ? apiurl : Object.values(apiurl)[0];
	if (id && apiUrl?.includes("?")) {
		url = apiUrl.split("?")[0] + `/${id}/?${apiUrl.split("?")[1]}`;
	}
	if (id && !apiUrl?.includes("?")) {
		url = apiUrl + `/${id}/`;
	}
	const typeName = typeof apiurl === "object" ? Object.keys(apiurl)?.[0] : apiUrl;
	const type = actionTypeFromUrl(typeName, method, true);
	return {
		type,
		payload: { request: { url } },
	};
}

/**
 * Make POST request with redux axios middleware
 * @param apiUrl API end point url
 * @param data post body data
 * @param params url query parameters if any
 * @returns Redux Action
 */
export function postAction(apiUrl: string, data: any, params = "") {
	const method = "POST";
	let url = apiUrl;
	url = params ? `${url}?${params}` : url;
	const type = actionTypeFromUrl(apiUrl, method);
	return {
		type,
		payload: { request: { url, data, method } },
	};
}

export function patchAction(apiUrl: string, data: any, id: string, lastPath?: string) {
	const method = "PATCH";
	const url = apiUrl + `${id}/${lastPath ? lastPath : ""}`;
	const type = actionTypeFromUrl(apiUrl, method);
	return {
		type,
		payload: { request: { url, data, method } },
	};
}

export function putAction(apiUrl: string, data: any, id?: string) {
	const method = "PUT";
	const url = id ? apiUrl + `${id}/` : apiUrl;
	const type = actionTypeFromUrl(apiUrl, method);
	return {
		type,
		payload: { request: { url, data, method } },
	};
}

export function deleteAction(apiUrl: string, id: string, params = "") {
	const method = "DELETE";
	let url = apiUrl + `${id}/`;
	url = params ? `${url}?${params}` : url;

	const type = actionTypeFromUrl(apiUrl, method);
	return {
		type,
		payload: { request: { url, method } },
	};
}

////////////////// SETTINGS REDUCER ACTIONS ///////////////////////

export function setDirection(dir: "ltr" | "rtl") {
	return {
		type: Actions.SET_DIRECTION,
		payload: dir,
	};
}

export function setLocale(locale: any) {
	return {
		type: Actions.SET_LOCALE,
		payload: locale,
	};
}

export function setDarkMode(mode: "dark" | "light" | "auto") {
	return {
		type: Actions.SET_DARK_MODE,
		payload: mode,
	};
}

// export function updateTemplateTheme(themeInfo: any) {
//   return {
//     type: Actions.SET_TEMPLATE_THEME,
//     payload: themeInfo,
//   };
// }

export function syncAppSettings(data: AppInitialState) {
	return {
		type: Actions.SET_APPSTATE,
		payload: data,
	};
}

////////////////// TEMPLATE REDUCER ACTIONS ///////////////////////

export default AppActions;
