import { z } from "zod";
import { useState } from "react";
import Urls from "@/redux/actions/Urls";
import { useForm } from "react-hook-form";
import { useDispatch, } from "react-redux";
import { HYCombobox } from "../../../components/hy-components/HYCombobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAction, } from "@/redux/actions/AppActions";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const UserCreationForm = ({ children }: { children: any }) => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);

    /*  ######################################################################################## */

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string(),
        emailVisibility: z.boolean().optional().nullable(),
        password: z.string().optional().nullable(),
        passwordConfirm: z.string().optional().nullable(),
        name: z.string(),
        role: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            emailVisibility: true,
            role: "employee",
            password: "12345678",
            passwordConfirm: "12345678",
        },
    });

    /*  ######################################################################################## */

    const getUsers = (prams?: string) => {
        let query = "";
        if (prams) {
            query = query + prams;
        }
        dispatch(getAction({ users: Urls.users + query }));
    };

    const handleUserCreation = async (
        values: z.infer<typeof formSchema>
    ) => {
        // const getProjects = (prams?: string) => {
        //     let query = "?expand=owner";
        //     if (prams) {
        //         query = query + prams;
        //     }
        //     dispatch(getAction({ project: Urls.project + query }));
        // };
        // const resp = (await dispatch(postAction(Urls.project, values))) as any;
        // const success = resp.payload.status == 200;
        // if (success) {
        //     setOpenForm(false);
        //     getProjects();
        // }
    };

    /*  ######################################################################################## */

    const usersOptions = [{ value: "employee", label: "Employee" }]

    /*  ######################################################################################## */

    return (
        <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleUserCreation)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        className="w-full outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full py-3">
                                    <FormLabel>Role</FormLabel>
                                    <HYCombobox
                                        id="role"
                                        name="role"
                                        form={form}
                                        defaultValue={"employee"}
                                        options={usersOptions}
                                        buttonClassName="w-full"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-5">
                            <Button
                                type="reset"
                                variant="outline"
                                onClick={() => setOpenForm(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default UserCreationForm;
