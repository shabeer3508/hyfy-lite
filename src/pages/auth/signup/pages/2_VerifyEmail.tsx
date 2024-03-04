import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const VerifyEmailPage: React.FC<{}> = ({ }) => {

	const navigate = useNavigate()

	return <div className="flex justify-center h-screen items-center dark:bg-background">
		<Card className="w-[500px] dark:bg-[#23252A]">
			<CardHeader>
				<CardTitle className="text-primary mb-5">Hyfy</CardTitle>
				<CardDescription className="">Verify Email</CardDescription>
				<CardDescription>
					Please enter the key you received in your email
				</CardDescription>
			</CardHeader>
			<CardContent className="">
				<form>
					<div className="grid w-full items-center gap-3">
						<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
							<Input
								autoFocus
								className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
								type="text"
								id="identity"
								required
								autoComplete="off"
								placeholder="Enter the key ...."
							// {...register("identity")}
							/>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex ">
				<Button className="w-full text-white hover:bg-primary" onClick={() => navigate("/signup/setup_account")}>
					Verify
				</Button>
			</CardFooter>
		</Card>
	</div>
}

export default VerifyEmailPage