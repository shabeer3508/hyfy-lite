import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Signup = () => {
	return (
		<div className="flex justify-center h-screen items-center dark:bg-background">
			<Card className="w-[500px] ">
				<CardHeader>
					<CardTitle className="text-primary">Hyfy</CardTitle>
					<CardDescription>Create Account</CardDescription>
					<CardDescription>
						Enter your email to start working with Hyfy
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Input
									className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
									type="email"
									id="email"
									placeholder="email"
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex ">
					<Button className="w-full  hover:bg-primary">
						Continue
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Signup;
