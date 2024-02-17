import "./index.css";
import React from "react";
import App from "./App.tsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<div className="scrollbar-hide">
				<Provider store={store}>
					<App />
					<Toaster
						richColors
						position="bottom-center"
						closeButton
						toastOptions={{ duration: 2000 }}
					/>
				</Provider>
			</div>
		</BrowserRouter>
	</React.StrictMode>
);
