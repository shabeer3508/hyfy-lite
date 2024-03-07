import Cookies from "js-cookie"
import { toast } from "sonner";
import Urls from "@/redux/actions/Urls";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postAction, reducerNameFromUrl, setCurrentUser } from "@/redux/actions/AppActions";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const VerifyEmailPage: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { state } = useLocation()

	const { register, handleSubmit } = useForm()

	const signupVerifyEmailReducerName = reducerNameFromUrl("signupVerifyEmail", "POST");
	const postSignupInfoInfo = useSelector((state: any) => state?.[signupVerifyEmailReducerName]);

	/*  ######################################################################################## */

	const handleVerifyEmail = (value) => {
		const postData = { email: state?.authInfo?.email, code: value?.code };

		(dispatch(postAction({ signupVerifyEmail: Urls.signup_verify_email }, postData)) as any).then(res => {
			if (res.payload?.status === 200) {

				toast.success(`${res.payload?.data?.message}`);
				dispatch(setCurrentUser(res.payload?.data?.data?.user));
				Cookies.set('hyfy_auth_token', res.payload?.data?.data?.token, { expires: 7, secure: true })

				handleNavigation(res.payload?.data?.data?.user)

			}
		})
	}

	const handleNavigation = (userInfo) => {
		if (userInfo?.user_type === "organization") {
			switch (userInfo?.stage) {
				case "organization":
					navigate("/signup/setup_organization", { state: { authInfo: userInfo } })
					break;
				case "purchase":
					navigate("/signup/purchase", { state: { authInfo: userInfo } })
					break;
				case "invitations":
					navigate("/signup/invite-members", { state: { authInfo: userInfo } })
					break;
				default:
					navigate("/board", { state: { authInfo: userInfo } })
					break;
			}
		} else {
			navigate("/signup/accept-invites", { state: { authInfo: userInfo } })
		}
	}

	/*  ######################################################################################## */

	return <div className="flex justify-center h-screen items-center dark:bg-background">
		<Card className="w-[500px] dark:bg-[#23252A]">
			<CardHeader>
				<CardTitle className="text-primary mb-5">Hyfy</CardTitle>
				<CardDescription className="">Verify Email</CardDescription>
				<CardDescription>
					Please enter the code you received in your email
				</CardDescription>
			</CardHeader>
			<CardContent className="">
				<form onSubmit={handleSubmit(handleVerifyEmail)}>
					<div className="grid w-full items-center gap-3">
						<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
							<Input
								required
								autoFocus
								autoComplete="off"
								{...register("code")}
								placeholder="Enter the code ...."
								className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
							/>
						</div>
						<Button disabled={postSignupInfoInfo.loading} className="w-full text-white hover:bg-primary">
							Verify
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	</div>
}

export default VerifyEmailPage