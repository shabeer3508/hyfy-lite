import { Suspense, memo, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes/routes";

const loading = (
	<div className="w-full h-full bg-transparent flex items-center justify-center">
		<div className="h-6 w-6 rounded-full bg-blue-700 animate-ping"></div>
	</div>
);
// const Dashboard = lazy(() => import("../pages/Dashboard"));

const TheContent = () => {
	return (
		<main className="transition-all transform-gpu duration-200 ease-in h-full w-full scrollbar-hide">
			<Suspense fallback={loading}>
				<Routes>
					{/* <Route path="/" element={<Dashboard />} /> */}
					{routes.map((route, idx) => {
						if (route.path) {
							return (
								<Route
									key={idx}
									path={route.path}
									element={<div>hey</div>}
								/>
							);
						}
					})}
				</Routes>
			</Suspense>
		</main>
	);
};

export default memo(TheContent);
