import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import { HiOutlineEye, HiOutlineEyeOff, HiLockClosed, HiMail } from "react-icons/hi";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type signupPageTypes = "create_account" | "verify_email" | "setup_account" | "create_project" | "add_members"
interface PassDataProps { show: boolean, setSignUpPages: React.Dispatch<React.SetStateAction<signupPageTypes>> }

const Signup = () => {
	const [signUpPages, setSignUpPages] = useState<signupPageTypes>("create_account");

	return (
		<div className="flex justify-center h-screen items-center dark:bg-background">
			<CreateAccountCard show={signUpPages === "create_account"} setSignUpPages={setSignUpPages} />
			<VerifyEmailCard show={signUpPages === "verify_email"} setSignUpPages={setSignUpPages} />
			<AccountSetupCard show={signUpPages === "setup_account"} setSignUpPages={setSignUpPages} />
			<CreateProjectCard show={signUpPages === "create_project"} setSignUpPages={setSignUpPages} />
			<AddMembersCard show={signUpPages === "add_members"} setSignUpPages={setSignUpPages} />
		</div>
	);
};

export default Signup;

const CreateAccountCard: React.FC<PassDataProps> = ({ show, setSignUpPages }) => {

	const [showPassword, setShowPassword] = useState({ initialPassword: false, confirmPassword: false });

	if (!show) {
		return null
	}

	return <Card className="w-[500px] dark:bg-[#23252A]">
		<CardHeader>
			<CardTitle className="text-primary mb-5">Hyfy</CardTitle>
			<CardDescription className="">Create Account</CardDescription>
			<CardDescription>
				Enter your email and password to start working with Hyfy
			</CardDescription>
		</CardHeader>
		<CardContent className="">
			<form>
				<div className="grid w-full items-center gap-3">
					<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
						<HiMail className="mr-2" />
						<Input
							autoFocus
							className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
							type="email"
							id="identity"
							required
							autoComplete="off"
							placeholder="Email"
						// {...register("identity")}
						/>
					</div>
					<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
						<HiLockClosed className="mr-2" />
						<Input
							autoFocus
							className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
							type={showPassword.initialPassword ? "text" : "password"}
							id="identity"
							required
							autoComplete="off"
							placeholder="Password"
						// {...register("identity")}
						/>
						{showPassword.initialPassword
							? <HiOutlineEyeOff className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => ({ ...prev, initialPassword: !prev?.initialPassword }))} />
							: <HiOutlineEye className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => ({ ...prev, initialPassword: !prev?.initialPassword }))} />
						}
					</div>

					<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
						<HiLockClosed className="mr-2" />
						<Input
							autoFocus
							className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
							type={showPassword.confirmPassword ? "text" : "password"}
							id="identity"
							required
							autoComplete="off"
							placeholder="Confirm Password"
						// {...register("identity")}
						/>
						{showPassword.confirmPassword
							? <HiOutlineEyeOff className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev?.confirmPassword }))} />
							: <HiOutlineEye className="cursor-pointer text-[#707173] h-5 w-5 select-none" onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev?.confirmPassword }))} />
						}
					</div>
				</div>
			</form>
		</CardContent>
		<CardFooter className="flex ">
			<Button className="w-full text-white hover:bg-primary" onClick={() => setSignUpPages("verify_email")}>
				Continue
			</Button>
		</CardFooter>
	</Card>
}

const VerifyEmailCard: React.FC<PassDataProps> = ({ show, setSignUpPages }) => {

	if (!show) {
		return null
	}

	return <Card className="w-[500px] dark:bg-[#23252A]">
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
			<Button className="w-full text-white hover:bg-primary" onClick={() => setSignUpPages("setup_account")}>
				Verify
			</Button>
		</CardFooter>
	</Card>
}

const AccountSetupCard: React.FC<PassDataProps> = ({ show, setSignUpPages }) => {


	if (!show) {
		return null
	}

	return <Card className="w-[500px] dark:bg-[#23252A]">
		<CardHeader>
			<CardTitle className="text-primary mb-5">Hyfy</CardTitle>
			<CardDescription className="">Setup Accpunt</CardDescription>
			<CardDescription>
				email@gmail.com
			</CardDescription>
		</CardHeader>
		<CardContent className="">
			<form>
				<div className="grid w-full items-center gap-3">
					<Label className="text-xs dark:text-foreground">
						Name
					</Label>
					<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
						<Input
							autoFocus
							className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
							type="text"
							id="identity"
							required
							autoComplete="off"
							placeholder="Name"
						// {...register("identity")}
						/>
					</div>
					<Label className="text-xs dark:text-foreground">
						Role
					</Label>
					<HYCombobox
						defaultValue="employee"
						buttonClassName="w-full rounded-md border dark:border-[#FFFFFF1A] border-border dark:bg-[#23252A]"
						options={[{ label: 'Manager', value: "manager" }, { label: "Employee", value: "employee" }]}
					/>
				</div>
			</form>
		</CardContent>
		<CardFooter className="flex ">
			<Button className="w-full text-white hover:bg-primary" onClick={() => setSignUpPages("create_project")}>
				Next
			</Button>
		</CardFooter>
	</Card>
}

const CreateProjectCard: React.FC<PassDataProps> = ({ show, setSignUpPages }) => {


	if (!show) {
		return null
	}

	return <Card className="w-[500px] dark:bg-[#23252A]">
		<CardHeader>
			<CardTitle className="text-primary mb-5">Hyfy</CardTitle>
			<CardDescription className="">Create Project</CardDescription>
			{/* <CardDescription>
				email@gmail.com
			</CardDescription> */}
		</CardHeader>
		<CardContent className="">
			<form>
				<div className="grid w-full items-center gap-3">
					<Label className="text-xs dark:text-foreground">
						Project Name
					</Label>
					<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
						<Input
							autoFocus
							className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
							type="text"
							id="identity"
							required
							autoComplete="off"
							placeholder="Project Name"
						// {...register("identity")}
						/>
					</div>
				</div>
			</form>
		</CardContent>
		<CardFooter className="flex ">
			<Button className="w-full text-white hover:bg-primary" onClick={() => setSignUpPages("add_members")}>
				Create Project
			</Button>
		</CardFooter>
	</Card>
}

const AddMembersCard: React.FC<PassDataProps> = ({ show, setSignUpPages }) => {

	if (!show) {
		return null
	}

	return <Card className="w-[600px] dark:bg-[#23252A]">
		<CardHeader>
			<CardTitle className="text-primary mb-5">Hyfy</CardTitle>
			<CardDescription className="">Add Members</CardDescription>
		</CardHeader>
		<CardContent className="">
			<form>
				<div className="flex w-full justify-between items-center gap-3">
					<div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border">
						<HiMail className="mr-2" />
						<Input
							autoFocus
							className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A] h-[38px]"
							type="text"
							id="identity"
							required
							autoComplete="off"
							placeholder="Email"
						// {...register("identity")}
						/>
					</div>
					<HYCombobox
						defaultValue="employee"
						buttonClassName="dark:bg-[#23252A]  dark:border-[#FFFFFF1A]   border "
						options={[{ label: 'Manager', value: "manager" }, { label: "Employee", value: "employee" }]}
					/>
					<Button type="button" className="text-primary bg-[#23252A] border-primary border" variant="outline">Add</Button>
				</div>
			</form>
		</CardContent>
		<CardFooter className="flex flex-col gap-1 ">
			<Button
				className="w-full text-white hover:bg-primary"
				onClick={() => setSignUpPages("create_account")}>
				Invite Members
			</Button>
			<div
				className="text-center text-sm my-2 cursor-pointer min-w-max dark:text-primary"
				onClick={() => setSignUpPages("create_account")}>
				Skip for now
			</div>
		</CardFooter>
	</Card >
}