import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

import EmailSubmitForm from "./email-submit-form";
import SubmitPasswordForm from "./password-submit-form";

const index = () => {
	const { register, handleSubmit } = useForm();
	const [showPasswordOption, setShowPswOption] = useState(false);

	return (
		<div className="flex flex-col justify-center h-screen items-center dark:bg-background">
			<Card className="w-[500px] dark:bg-[#23252A]">
				<CardHeader>
					<CardTitle className="text-primary">Hyfy</CardTitle>
					<CardDescription className="text-foreground text-sm font-semibold pt-3">
						{showPasswordOption ? "Secure Password" : "Login"}
					</CardDescription>
					<CardDescription>
						{showPasswordOption
							? "Enter the password that has been sent to "
							: "Enter your email to start working with Hyfy"}
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					<EmailSubmitForm
						register={register}
						show={showPasswordOption}
						setShowPswOption={setShowPswOption}
					/>
					<SubmitPasswordForm
						register={register}
						show={showPasswordOption}
						handleSubmit={handleSubmit}
						setShowPswOption={setShowPswOption}
					/>
				</CardContent>
			</Card>
		</div>
	);
};

export default index;
