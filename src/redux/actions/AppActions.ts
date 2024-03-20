import Actions from "./ActionTypes";
import { capitalizeFirstLetter } from "../../utils/utils";
import {
    BacklogStates,
    BoardStates,
    EpicStates,
    ProjectStates,
    ReleaseStates,
    SprintStates,
    TeamsStates,
} from "../reducers/AppProfileReducer";

const AppActions = {};

type actionType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export const reducerNameFromUrl = (
    url: string,
    method: actionType,
    isDeatil = false
) => {
    const apiNameCap = capitalizeFirstLetter(url);
    const match = /[^a-zA-Z ]/g;
    const lastPath = /\/([^/]*)$/;
    let name = `${method.toLowerCase()}${apiNameCap}`
        .replace(lastPath, "")
        ?.replaceAll(match, " ");
    name = capitalizeFirstLetter(name);
    // name = camelize(name);
    if (isDeatil) {
        name = name + "Detail";
    }
    return name;
};

export const actionTypeFromUrl = (
    url: string,
    method: actionType,
    isDeatil = false
) => {
    const apiNameCap = capitalizeFirstLetter(url);
    const match = /[^a-zA-Z ]/g;
    const lastPath = /\/([^/]*)$/;
    let ActionType = `${method}${apiNameCap}`
        .replace(lastPath, "")
        ?.replace(match, "_")
        .toUpperCase();
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
export function getAction(apiUrl: object) {
    const method = "GET";
    let url = Object.values(apiUrl)[0];
    const typeName = Object.keys(apiUrl)[0];

    const type = actionTypeFromUrl(typeName, method);
    return {
        type,
        payload: { request: { url, method } },
    };
}

export function getDetailAction(apiurl: string | object, id: any) {
    const method = "GET";
    let url = typeof apiurl === "string" ? apiurl : Object.values(apiurl)[0];
    const apiUrl =
        typeof apiurl === "string" ? apiurl : Object.values(apiurl)[0];
    if (id && apiUrl?.includes("?")) {
        url = apiUrl.split("?")[0] + `/${id}/?${apiUrl.split("?")[1]}`;
    }
    if (id && !apiUrl?.includes("?")) {
        url = apiUrl + `/${id}/`;
    }
    const typeName =
        typeof apiurl === "object" ? Object.keys(apiurl)?.[0] : apiUrl;
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
export function postAction(apiUrl: object, data?: any) {
    const method = "POST";
    const url = Object.values(apiUrl)[0];
    const typeName = Object.keys(apiUrl)[0];

    const type = actionTypeFromUrl(typeName, method);
    return {
        type,
        payload: { request: { url, data, method } },
    };
}

export function patchAction(
    apiUrl: string | object,
    data: any,
    id: string,
    lastPath?: string
) {
    const method = "PATCH";
    let url = typeof apiUrl === "string" ? apiUrl : Object.values(apiUrl)[0];
    url = url + `/${id}${lastPath ? `/${lastPath}` : ""}`;
    const type = actionTypeFromUrl(url, method);
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

/////////////////////////  HYFY REDUCER ACTIONS //////////////////////

// USER ACTIONS

export function setCurrentUser(data: any) {
    return {
        type: Actions.SET_USER,
        payload: data,
    };
}

export function updateUserStage(
    stage: "completd" | "invitations" | "purchase" | "organisation"
) {
    return {
        type: Actions.UPDATE_USER_STAGE,
        payload: stage,
    };
}

export function clearUser() {
    return {
        type: Actions.CLEAR_USER,
    };
}

// Common Modul informations

export function resetAppInfo() {
    return { type: Actions.RESET_APP_INFO };
}

export function setProject(projectId: string) {
    return {
        type: Actions.SET_PROJECT,
        payload: projectId,
    };
}

export function setBoardData(data: any, data_key: keyof BoardStates) {
    return {
        type: Actions.SET_BOARD_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export function setBacklogData(data: any, data_key: keyof BacklogStates) {
    return {
        type: Actions.SET_BACKLOG_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export function setEpicData(data: any, data_key: keyof EpicStates) {
    return {
        type: Actions.SET_EPIC_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export function setSprintsData(data: any, data_key: keyof SprintStates) {
    return {
        type: Actions.SET_SPRINTS_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export function setProjectData(data: any, data_key: keyof ProjectStates) {
    return {
        type: Actions.SET_PROJECT_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export function setReleasePageData(data: any, data_key: keyof ReleaseStates) {
    return {
        type: Actions.SET_RELEASE_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export function setTeamsData(data: any, data_key: keyof TeamsStates) {
    return {
        type: Actions.SET_TEAMS_PAGE_DATA,
        payload: { data: data, key: data_key },
    };
}

export default AppActions;
