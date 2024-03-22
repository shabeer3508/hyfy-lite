import { Route, Routes } from "react-router-dom";
import { Suspense, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import routes from "../routes";
import HelpSidebar from "@/pages/help";
import Urls from "@/redux/actions/Urls";
import NotFound from "@/pages/empty-screens/NotFound";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

export const loading = (
	<div className="w-full h-full bg-transparent flex items-center justify-center">
		<div className="h-6 w-6 rounded-full bg-blue-700 animate-ping"></div>
	</div>
);

const TheContent = () => {

	const dispatch = useDispatch()
	const appInfo = useSelector((state: any) => state.AppReducer);

	// const getIssueStatus = () => dispatch(getAction({ issueStatus: Urls.issue_status }));
	const getUsers = () => dispatch(getAction({ users: Urls.users + `?perPage=300` }));

	useEffect(() => {
		// getIssueStatus();
		getUsers();
	}, [])

	return (
		<main className="transition-all transform-gpu duration-200 ease-in h-full w-full flex scrollbar-hide">
			<div className="flex-1">
				<Suspense fallback={loading}>
					<Routes>
						{routes.map((route, idx) => {
							if (route.path) {
								return <Route key={idx} path={route.path} element={route.component} />;
							}
						})}

						<Route path="/*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</div>
			<HelpSidebar show={appInfo?.appState?.showHelpScreen} />
		</main>
	);
};

const MemoizedTheContent = memo(TheContent);
export default MemoizedTheContent;



