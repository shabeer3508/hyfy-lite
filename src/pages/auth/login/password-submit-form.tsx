import {
	FieldValues,
	UseFormHandleSubmit,
	UseFormRegister,
} from "react-hook-form";
import pb from "@/lib/pocketbase";

import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SubmitPasswordForm = ({
	show,
	register,
	handleSubmit,
	setShowPswOption,
}: {
	show: boolean;
	register: UseFormRegister<FieldValues>;
	handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>;
	setShowPswOption: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const login = async (data) => {
		setIsLoading(true);
		try {
			const authData = await pb
				.collection("users")
				.authWithPassword(data.email, data.password);

			if (authData.token) {
				localStorage.setItem("token", authData.token);
				if (authData.record?.role === "employee") navigate("/board");
				else navigate("/backlog");
			}
		} catch (e) {
			toast.error(e.message);
		}

		setIsLoading(false);
	};

	if (!show) return null;

	return (
		<form onSubmit={handleSubmit(login)}>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col space-y-1.5">
					<Label className="text-xs">Enter Secure password</Label>
					<Input
						className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#23252A] border border-[#FFFFFF1A]"
						type="password"
						id="password"
						placeholder="- - - - - - - -"
						required
						{...register("password")}
					/>
				</div>
			</div>

			<Button
				type="submit"
				disabled={isLoading}
				className="w-full hover:bg-primary mt-5 dark:text-foreground"
			>
				{isLoading ? "Loading..." : "Verify"}
			</Button>
		</form>
	);
};

export default SubmitPasswordForm;
