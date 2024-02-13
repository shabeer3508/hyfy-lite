import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const index = () => {
	return (
		<div className="flex justify-center h-screen items-center dark:bg-background">
			<Card className="w-[500px] dark:bg-[#23252A]">
				<CardHeader>
					<CardTitle className="text-primary">Hyfy</CardTitle>
					<CardDescription>Login</CardDescription>
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
					<Button className="w-full hover:bg-primary">
						Continue
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default index;
