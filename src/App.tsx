// import pb from "./lib/pocketbase";
import { Suspense, lazy } from "react";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, Navigate, Routes } from "react-router-dom";

const TheLayout = lazy(() => import("./layout/TheLayout"));
const Login = lazy(() => import("./pages/auth/login/index"));
const SignUp = lazy(() => import("./pages/auth/signup/index"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

const loading = () => {
	return (
		<div className="w-screen h-screen bg-transparent dark:bg-background flex items-center justify-center">
			<div className="h-6 w-6 rounded-full bg-blue-700 animate-ping"></div>
		</div>
	);
};

const App = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			{/* <div className="dark"> */}
			<Suspense fallback={loading()}>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="/*" element={<TheLayout />} />
					<Route path="/*" element={<TheLayout />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
			<Toaster />
			{/* </div> */}
		</ThemeProvider>
	);
};

export default App;
