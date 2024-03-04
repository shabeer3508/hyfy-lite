import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HiOutlineEye, HiOutlineEyeOff, HiLockClosed, HiMail } from "react-icons/hi";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CreateAccountPage: React.FC = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState({ initialPassword: false, confirmPassword: false });

    return <div className="flex justify-center h-screen items-center dark:bg-background">
        <Card className="w-[500px] dark:bg-[#23252A]">
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
                <Button className="w-full text-white hover:bg-primary" onClick={() => navigate("/signup/verify_email")}>
                    Continue
                </Button>
            </CardFooter>
        </Card>
    </div>
}

export default CreateAccountPage