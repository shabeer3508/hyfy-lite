import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import Urls from "@/redux/actions/Urls";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Form, FormField, FormItem, FormMessage, } from "@/components/ui/form";
import { HiOutlineEye, HiOutlineEyeOff, HiLockClosed, HiMail } from "react-icons/hi";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import HYRadioGroup from "@/components/hy-components/HYRadioGroup";

const CreateAccountPage: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({ initialPassword: false, confirmPassword: false });

    /*  ######################################################################################## */

    const formSchema = z.object({
        user_type: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string()
            .min(8, { message: "Password must contain 8 characters" })
            .refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
            .refine(value => /\d/.test(value), { message: "Password must contain at least one number" }),
        confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

    const formDefaultValues = {
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        user_type: "employee"
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    });

    /*  ######################################################################################## */

    const handleSendEmailVerification = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        (dispatch(postAction(Urls.signup_send_email, data)) as any).then(res => {
            if (res.payload?.status === 200) {
                toast.success(`${res.payload?.data?.message}`)
                navigate("/signup/verify_email", { state: { authInfo: data } })
            }
            setIsLoading(false);
        })
    }


    /*  ######################################################################################## */

    const radioGroups = [
        { label: "Individual", value: "employee" },
        { label: "Organization", value: "owner" }
    ]

    return <div className="flex justify-center h-screen items-center dark:bg-background">
        <Card className="w-[500px] dark:bg-[#23252A]">
            <CardHeader>
                <CardTitle className="text-primary mb-5 text-3xl">Hyfy</CardTitle>
                <CardDescription className="dark:text-white text-xl">Create Account</CardDescription>
            </CardHeader>
            <CardContent className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSendEmailVerification)}>
                        <div className="grid w-full items-center gap-3">
                            <FormField
                                control={form.control}
                                name="user_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <HYRadioGroup className="flex gap-3" defaultValue={field.value} radioGroups={radioGroups} onChange={field.onChange} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
                                            <HiMail className="mr-2" />
                                            <Input
                                                required
                                                autoFocus
                                                {...field}
                                                id="identity"
                                                autoComplete="off"
                                                placeholder="Email"
                                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
                                            <HiLockClosed className="mr-2" />
                                            <Input
                                                required
                                                {...field}
                                                id="identity"
                                                autoComplete="off"
                                                placeholder="Password"
                                                type={showPassword.initialPassword ? "text" : "password"}
                                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
                                            />

                                            {showPassword.initialPassword ?
                                                <HiOutlineEyeOff
                                                    className="cursor-pointer text-[#707173] h-5 w-5 select-none"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, initialPassword: !prev?.initialPassword }))}
                                                /> :
                                                <HiOutlineEye
                                                    className="cursor-pointer text-[#707173] h-5 w-5 select-none"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, initialPassword: !prev?.initialPassword }))}
                                                />
                                            }

                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center dark:bg-[#23252A] rounded px-3 border dark:border-[#FFFFFF1A] border-border mt-1">
                                            <HiLockClosed className="mr-2" />
                                            <Input
                                                required
                                                {...field}
                                                id="identity"
                                                autoComplete="off"
                                                placeholder="Confirm Password"
                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A]"
                                            />
                                            {showPassword.confirmPassword ?
                                                <HiOutlineEyeOff
                                                    className="cursor-pointer text-[#707173] h-5 w-5 select-none"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev?.confirmPassword }))}
                                                /> :
                                                <HiOutlineEye
                                                    className="cursor-pointer text-[#707173] h-5 w-5 select-none"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev?.confirmPassword }))}
                                                />
                                            }
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isLoading} className="w-full text-white hover:bg-primary">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
}

export default CreateAccountPage