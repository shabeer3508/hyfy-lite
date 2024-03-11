import { z } from "zod";
import { toast } from "sonner";
import Cookies from "js-cookie"
import Urls from "@/redux/actions/Urls";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAction } from "@/redux/actions/AppActions";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const OrganizationSetupPage: React.FC = () => {

    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*  ######################################################################################## */

    const formSchema = z.object({
        name: z.string().min(3, {
            message: "Username must be at least 3 characters.",
        }),
        branch: z.string(),
        address: z.string().optional().nullable(),
        state: z.string().optional().nullable(),
        country: z.string().optional().nullable(),
        pin_code: z.string().optional().nullable(),
    });


    const formDefaultValues = {
        name: "",
        branch: "",
        address: "",
        state: "",
        country: "",
        pin_code: "",
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    });

    /*  ######################################################################################## */

    const handleOrganizationSetup = (data) => {
        (dispatch(postAction({ signupSetupOrganization: Urls.signup_setup_organization }, data)) as any).then(res => {
            if (res.payload?.status === 200) {
                Cookies.set('hyfy_auth_token', res.payload?.data?.data?.token, { expires: 2, secure: true })
                toast.success(`Organization created successfully`);
                navigate("/signup/billing")
            }
        })
    }

    /*  ######################################################################################## */

    return <div className="flex justify-center h-screen items-center dark:bg-background">
        <Card className="w-[500px] dark:bg-[#23252A]">
            <CardHeader>
                <CardTitle className="text-primary mb-5">Hyfy</CardTitle>
                <CardDescription className="dark:text-white text-base">Setup Organization</CardDescription>
            </CardHeader>
            <CardContent className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleOrganizationSetup)}>
                        <div className="grid w-full items-center gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Organization</FormLabel>
                                        <Input
                                            required
                                            autoComplete="off"
                                            placeholder="Enter the name of your organization"
                                            className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border dark:border-[#FFFFFF1A] dark:bg-[#23252A]"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="branch"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between text-xs items-center">
                                            <FormLabel>Branch</FormLabel>
                                            <div className="text-[#9499A5]">You can add more branches later</div>
                                        </div>
                                        <Input
                                            required
                                            placeholder="Branch Name"
                                            className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border dark:border-[#FFFFFF1A] dark:bg-[#23252A]"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Label>Location</Label>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            required
                                            placeholder="Address"
                                            className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border dark:border-[#FFFFFF1A] dark:bg-[#23252A]"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <Input
                                                required
                                                placeholder="State"
                                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border dark:border-[#FFFFFF1A] dark:bg-[#23252A]"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <Input
                                                required
                                                placeholder="Country"
                                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border dark:border-[#FFFFFF1A] dark:bg-[#23252A]"
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="pin_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            required
                                            placeholder="Pincode"
                                            className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border dark:border-[#FFFFFF1A] dark:bg-[#23252A]"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-5">
                            <Button className="w-full text-white hover:bg-primary">
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
}

export default OrganizationSetupPage