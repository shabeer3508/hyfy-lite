import { toast } from "sonner";
import Cookies from "js-cookie";
import HttpCodeMessages from "./HttpCodeMessages";

const ErrorManager = {
	handle(error: any) {
		console.log(
			`ErrorManager,  : error?.response `,
			error,
			error?.response
		);

		if (error.toJSON().message === "Network Error") {
			toast.error("Network Error, No Internet Connection");
			return;
		}

		if (error?.response) {
			/* ############################# Server error response ############################# */

			if (error?.response?.status >= 500) {
				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Servre Error";
				const msg =
					error?.response?.data?.message ||
					`${codeMsg}: Something went wrong, Please try again later`;
				toast.error(msg);
				return;
			}

			/* ################################################################################# */

			/* ############################# Client error response ############################# */

			if (error?.response?.status == 400) {
				console.log(
					"🚀 ~ handle ~ error?.response?.status:",
					error?.response?.data,
					error?.response?.data?.error?.issues
				);

				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Bad Request";

				const errorIssues = error?.response?.data?.error?.issues;

				if (errorIssues?.length > 0) {
					errorIssues.forEach((issue) => {
						issue?.message && toast.error(`${issue?.message}`);
					});
					return;
				}
				return;
			}

			if (error?.response?.status === 401) {
				let message =
					"You are not authorized to perform this action.\nPlease login again";

				toast.error(`${message}`);
				Cookies.remove("hyfy_auth_token");
				return;
			}

			if (error?.response?.status === 404) {
				const message = error?.response?.data?.message;
				message && toast.error(`${message}`);
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

			/* ################################################################################# */

			const message = error?.response?.data?.message;
			message && toast.error(`${message}`);

			/* ############################# Redirection  messages ############################# */

			if (error?.response?.status >= 300) {
				const codeMsg =
					HttpCodeMessages[error?.response?.status] || "Bad Request";
				const msg =
					error?.response?.statusText ||
					`${codeMsg}: Something went wrong, Please try again later`;
				toast.error(`${msg}`);
			}

			/* ################################################################################# */
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
		Cookies.remove("hyfy_auth_token");
	},
};

export default ErrorManager;
