import Cookies from "js-cookie"
import { toast } from "sonner";
import { useState } from "react";
import Urls from "@/redux/actions/Urls";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { HiLockClosed, HiMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { postAction, reducerNameFromUrl, setCurrentUser } from "@/redux/actions/AppActions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);

	const { register, handleSubmit, formState: { errors }, } = useForm();

	const loginReducerName = reducerNameFromUrl("login", "POST");
	const postLoginInfo = useSelector((state: any) => state?.[loginReducerName]);


	const login = async (data) => {
		try {
			(dispatch(postAction({ login: Urls.authenticate }, data)) as any).then((res: any) => {
				const res_data = res?.payload?.data
				const success = res?.payload?.status == 200;

				if (success) {
					Cookies.set('hyfy_auth_token', res_data?.data?.token, { expires: 2, secure: true })
					dispatch(setCurrentUser(res_data?.data?.user));

					if (res_data?.data?.user?.role === "employee") navigate("/board");
					else navigate("/backlog");

					toast.success("Login successful");
				}
			});
		} catch (e) {
			toast.error(e.message);
		}
	};

	return (
		<div className="flex flex-col justify-center h-screen items-center dark:bg-background">
			<Card className="w-[300px] md:w-[400px] xl:w-[500px] dark:bg-[#23252A]">
				<CardHeader>
					<CardTitle className="text-primary">Hyfy</CardTitle>
					<CardDescription className="text-foreground text-sm font-semibold pt-3">Login</CardDescription>
				</CardHeader>
				<CardContent className="">
					<form onSubmit={handleSubmit(login)}>
						<Label className="text-xs dark:text-foreground">
							Enter your email to start working with Hyfy
						</Label>

						<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
							<HiMail className="mr-2" />
							<Input
								autoFocus
								className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
								type="email"
								id="identity"
								required
								placeholder="Email"
								{...register("identity")}
							/>
						</div>
						<div className="flex flex-col space-y-1.5 mt-3">
							<Label className="text-xs dark:text-foreground">Enter Secure password</Label>
							<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
								<HiLockClosed className="mr-2" />
								<Input
									required
									type={showPassword ? "text" : "password"}
									id="password"
									minLength={8}
									placeholder="- - - - - - - -"
									{...register("password")}
									className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#23252A] border-0 dark:border-[#FFFFFF1A]"
								/>
								{showPassword
									? <HiOutlineEyeOff className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => !prev)} />
									: <HiOutlineEye className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => !prev)} />
								}
							</div>
						</div>
						<Button
							type="submit"
							disabled={postLoginInfo?.loading}
							className="w-full hover:bg-primary mt-5 dark:text-foreground"
						>
							{postLoginInfo?.loading ? "Loading..." : "Login"}
						</Button>
					</form>
					<div className="text-xs mt-5 mb-2" >Don't have an account ? <span className="text-primary mx-1 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span></div>
				</CardContent>
			</Card>
		</div >
	);
};

export default Login;
