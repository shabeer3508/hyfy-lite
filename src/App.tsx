import { lazy } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Navigate,
} from "react-router-dom";

const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Login = lazy(() => import("./pages/auth/login/index"));
const SignUp = lazy(() => import("./pages/auth/signup/index"));
const TheLayout = lazy(() => import("./layout/index"));

function App() {
	const isAuthenticated = () => {
		// const token = localStorage.getItem("token");
		// return !!token;
		return false;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<SignUp />}>
					<Route path="admin" element={<SignUp />} />
				</Route>

				{/* Private routes */}
				<Route
					path="/"
					element={
						isAuthenticated() ? (
							<TheLayout />
						) : (
							<Navigate to="/login" replace />
						)
					}
				/>

				{/* Not found route */}
				<Route path="*" element={<NotFound />} />
			</>
		)
	);

	return (
		<div className="dark">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
