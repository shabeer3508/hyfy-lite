import { toast } from "sonner";
import HttpCodeMessages from "./HttpCodeMessages";

const ErrorManager = {
	handle(error: any) {
		console.log(`ErrorManager,  : error?.response `, error?.response);
		if (error.toJSON().message === "Network Error") {
			toast.error("Network Error, No Internet Connection");
			return;
		}

		if (error?.response) {
			// Request made and server responded
			const url = error?.config?.url;
			if (error?.response?.status >= 500) {
				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Servre Error";
				const msg =
					error?.response?.data?.message ||
					`${codeMsg}: Something went wrong, Please try again later`;
				toast.error(msg);
				return;
			}

			if (error?.response?.status == 400) {
				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Bad Request";
				const msg =
					error?.response?.data?.message ||
					`${codeMsg}: Something went wrong, Please try again later`;
				const msgKeys = Object.keys(error?.response?.data);
				console.log(`ErrorManager,  :  msgKeys `, msgKeys);
				if (msgKeys?.length > 0) {
					msgKeys.forEach((key) => {
						const msgData = error?.response?.data?.[key];

						if (key === "message") {
							toast.error(`${msgData}`);
						}
						// const msg =
						// 	typeof msgData === "string"
						// 		? msgData
						// 		: (msgData?.[0] as string);
						// msg?.toLowerCase()?.includes(key?.toLowerCase())
						// 	? toast.error(`${msg}`)
						// 	: toast.error(`${key} : ${msg}`);
					});
					return;
				}
				toast.error(`${msg}`);
				return;
			}

			if (error?.response?.status === 401) {
				let message =
					"You are not authorized to perform this action.\nPlease login again";
				console.log(`ErrorManager,  : url `, url);
				console.log(
					`ErrorManager,  : error?.response?.data `,
					error?.response?.data?.detail
				);
				if (url === "/token/") {
					message = "Invalid Username or Password";
					message = error?.response?.data?.detail || message;
				}

				toast.error(`${message}`);
				localStorage.removeItem("hyfy_auth_token");
				return;
			}

			if (error?.response?.status === 404) {
				toast.error("Requested url not found");
				return;
			}

			if (
				error?.response?.status > 404 ||
				error?.response?.status === 403 ||
				error?.response?.status === 402
			) {
				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Bad Request";
				const msg =
					error?.response?.statusText ||
					`${codeMsg}: Something went wrong, Please try again later`;
				const msgKeys = Object.keys(error?.response?.data);
				if (msgKeys?.length > 0) {
					msgKeys.forEach((key) => {
						const msg = error?.response?.data?.[key];
						msg.includes(key)
							? toast.error(`${msg}`)
							: toast.error(`${key} : ${msg}`);
					});
					return;
				}
				toast.error(`${msg}`);
				return;
			}

			const message = error?.response?.data?.message;
			message && toast.error(`${message}`);

			if (error?.response?.status >= 300) {
				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Bad Request";
				const msg =
					error?.response?.statusText ||
					`${codeMsg}: Something went wrong, Please try again later`;
				toast.error(`${msg}`);
			}
		} else if (error.request) {
			// The request was made but no response was received
		} else {
			// Something happened in setting up the request that triggered an Error
			const message = error?.message;
			if (error.toJSON().message === "Network Error") {
				toast.error("Network Error, Something went wrong");
				return;
			}
			toast.error(`${message}`);
			return;
		}
	},
	logOut() {
		localStorage.removeItem("hyfy_auth_token");
	},
};

export default ErrorManager;
