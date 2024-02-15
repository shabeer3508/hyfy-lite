import {
	FieldValues,
	UseFormHandleSubmit,
	UseFormRegister,
	useForm,
} from "react-hook-form";
import { HiMail } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EmailSubmitForm = ({
	show,
	register,
	setShowPswOption,
}: {
	show: boolean;
	register: UseFormRegister<FieldValues>;
	setShowPswOption: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const handleEmailSubmit = (e: any) => {
		e.preventDefault();
		setShowPswOption((prev) => !prev);
	};

	if (show) return null;

	return (
		<form onSubmit={handleEmailSubmit}>
			<div className="grid w-full items-center gap-4">
				<div className="flex items-center bg-[#23252A] rounded px-3 border border-[#414144]">
					<HiMail className="mr-2" />
					<Input
						className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
						type="email"
						id="email"
						required
						autoComplete="off"
						placeholder="Email"
						{...register("email")}
					/>
				</div>
			</div>

			<Button
				type="submit"
				className="w-full hover:bg-primary mt-5 dark:text-foreground"
			>
				Continue
			</Button>
		</form>
	);
};

export default EmailSubmitForm;
