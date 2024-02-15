import ApiConfig from "../config/ApiConfig";

import { capitalizeFirstLetter } from "../utils/utils";
import { actionTypeFromUrl, reducerNameFromUrl } from "./actions/AppActions";
import NetworkReducer from "./reducers/NetworkReducer";

const ReducerModuleManger: any = {
	/// Crud Module
	ApiConfigReducers: () => {
		return Object.keys(ApiConfig)?.reduce((prv: any, apiName: string, idx: number) => {
			const apiNameCap = capitalizeFirstLetter(apiName);
			const GetType = actionTypeFromUrl(apiNameCap, "GET");
			const GetName = reducerNameFromUrl(apiNameCap, "GET");
			const CreateType = actionTypeFromUrl(apiNameCap, "POST");
			const CreateName = reducerNameFromUrl(apiNameCap, "POST");
			//
			const detailReducerName = reducerNameFromUrl(apiNameCap, "GET", true);
			const detailActionType = actionTypeFromUrl(apiNameCap, "GET", true);
			///GET__VEHICLE_DETAIL_SUCCESS
			console.log(`ReducerModuleManger,  : ${detailActionType} apiName`, apiNameCap);
			console.log(`ReducerModuleManger,  : ${detailActionType} GetName`, GetName);
			console.log(`ReducerModuleManger,  : ${detailActionType} detailReducerName`, detailReducerName);
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
