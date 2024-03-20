import { Reducer } from "react";
import ApiConfig from "../config/ApiConfig";

import { actionTypeFromUrl, reducerNameFromUrl } from "./actions/AppActions";
import NetworkReducer from "./reducers/NetworkReducer";

interface ApiConfigReducersReturnType {
    [key: string]: Reducer<any, any>; // Or whatever type your reducers have
}

const ReducerModuleManger = {
    /// Crud Module
    ApiConfigReducers: (): ApiConfigReducersReturnType => {
        return Object.keys(ApiConfig)?.reduce((prv, apiName: string) => {
            // const apiNameCap = capitalizeFirstLetter(apiName);
            const GetType = actionTypeFromUrl(apiName, "GET");
            const GetName = reducerNameFromUrl(apiName, "GET");
            const CreateType = actionTypeFromUrl(apiName, "POST");
            const CreateName = reducerNameFromUrl(apiName, "POST");
            //
            const detailReducerName = reducerNameFromUrl(apiName, "GET", true);
            const detailActionType = actionTypeFromUrl(apiName, "GET", true);
            return {
                ...prv,
                ...{
                    [GetName]: NetworkReducer(GetType),
                    [CreateName]: NetworkReducer(CreateType),
                    [detailReducerName]: NetworkReducer(detailActionType),
                },
            };
        }, {});
    },
};
export default ReducerModuleManger;
