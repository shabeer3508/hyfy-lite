import ApiConfig from "../config/ApiConfig";

import { capitalizeFirstLetter } from "../utils/utils";
import { actionTypeFromUrl, reducerNameFromUrl } from "./actions/AppActions";
import NetworkReducer from "./reducers/NetworkReducers";

const ReducerModuleManger: any = {
	ApiConfigReducers: () => {
		return Object.keys(ApiConfig)?.reduce(
			(prv: any, apiName: string, idx: number) => {
				const apiNameCap = capitalizeFirstLetter(apiName);
				const GetType = actionTypeFromUrl(apiNameCap, "GET");
				const GetName = reducerNameFromUrl(apiNameCap, "GET");
				const CreateType = actionTypeFromUrl(apiNameCap, "POST");
				const CreateName = reducerNameFromUrl(apiNameCap, "POST");
				//
				const detailReducerName = reducerNameFromUrl(
					apiNameCap,
					"GET",
					true
				);
				const detailActionType = actionTypeFromUrl(
					apiNameCap,
					"GET",
					true
				);

				return {
					...prv,
					...{
						[GetName]: NetworkReducer(GetType),
						[CreateName]: NetworkReducer(CreateType),
						[detailReducerName]: NetworkReducer(detailActionType),
					},
				};
			},
			{}
		);
	},
};
export default ReducerModuleManger;
