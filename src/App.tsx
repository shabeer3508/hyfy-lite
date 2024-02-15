import { Suspense, lazy } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Login = lazy(() => import("./pages/auth/login/index"));
const SignUp = lazy(() => import("./pages/auth/signup/index"));
const TheLayout = lazy(() => import("./layout/TheLayout"));

const loading = () => {
	return (
		<div className="w-screen h-screen bg-transparent dark:bg-background flex items-center justify-center">
			<div className="h-6 w-6 rounded-full bg-blue-700 animate-ping"></div>
		</div>
	);
};

function App() {
	const isAuthenticated = () => {
		// const token = localStorage.getItem("token");
		// return !!token;
		return true;
	};

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			{/* <div className="dark"> */}
			<Suspense fallback={loading()}>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="/*" element={isAuthenticated() ? <TheLayout /> : <Navigate to="/login" replace />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
			<Toaster />
			{/* </div> */}
		</ThemeProvider>
	);
}

export default App;
