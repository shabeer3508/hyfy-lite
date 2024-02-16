import { toast } from "sonner";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import Urls from "@/redux/actions/Urls";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { postAction } from "@/redux/actions/AppActions";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);

	const login = async (data) => {
		setIsLoading(true);

		try {
			(dispatch(postAction(Urls.authenticate, data)) as any).then(
				(res: any) => {
					const success = res.payload.status == 200;

					if (success) {
						localStorage.setItem(
							"hyfy_auth_token",
							res?.payload?.data?.token
						);
						if (res?.payload?.data?.record?.role === "employee")
							navigate("/board");
						else navigate("/backlog");
					}
				}
			);
		} catch (e) {
			toast.error(e.message);
		}

		setIsLoading(false);
	};

	return (
		<div className="flex flex-col justify-center h-screen items-center dark:bg-background">
			<Card className="w-[500px] dark:bg-[#23252A]">
				<CardHeader>
					<CardTitle className="text-primary">Hyfy</CardTitle>
					<CardDescription className="text-foreground text-sm font-semibold pt-3">
						Login
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					<form onSubmit={handleSubmit(login)}>
						<Label className="text-xs dark:text-foreground">
							Enter your email to start working with Hyfy
						</Label>

						<div className="flex items-center bg-[#23252A] rounded px-3 border border-[#414144] mt-1">
							<HiMail className="mr-2" />
							<Input
								autoFocus
								className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
								type="email"
								id="identity"
								required
								autoComplete="off"
								placeholder="Email"
								{...register("identity")}
							/>
						</div>
						<div className="flex flex-col space-y-1.5 mt-3">
							<Label className="text-xs dark:text-foreground">
								Enter Secure password
							</Label>
							<Input
								className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#23252A] border border-[#FFFFFF1A]"
								type="password"
								id="password"
								placeholder="- - - - - - - -"
								required
								{...register("password")}
							/>
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full hover:bg-primary mt-5 dark:text-foreground"
						>
							{isLoading ? "Loading..." : "Login"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
