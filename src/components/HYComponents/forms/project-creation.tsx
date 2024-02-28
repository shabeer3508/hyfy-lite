import { z } from "zod";
import Urls from "@/redux/actions/Urls";
import HYInputDate from "../HYInputDate";
import { useForm } from "react-hook-form";
import { HYCombobox } from "../HYCombobox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
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
import {
	getAction,
	postAction,
	reducerNameFromUrl,
} from "@/redux/actions/AppActions";

const ProjectCreationForm = ({ children }: { children: any }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);

	/*  ######################################################################################## */

	const formSchema = z.object({
		title: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		owner: z.string(),
		end_date: z.date().optional().nullable(),
		start_date: z.date().optional().nullable(),
		description: z.string().optional().nullable(),
		status: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			status: "open",
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

	const handleProjectCreation = async (
		values: z.infer<typeof formSchema>
	) => {
		const getProjects = (prams?: string) => {
			let query = "?expand=owner";
			if (prams) {
				query = query + prams;
			}
			dispatch(getAction({ project: Urls.project + query }));
		};
		const resp = (await dispatch(postAction(Urls.project, values))) as any;
		const success = resp.payload.status == 200;
		if (success) {
			setOpenForm(false);
			getProjects();
		}
	};

	/*  ######################################################################################## */

	const usersOptions =
		usersList?.data?.items?.map((user) => ({
			value: user?.id,
			label: user?.name,
		})) ?? [];

	/*  ######################################################################################## */

	useEffect(() => {
		getUsers();
	}, []);

	/*  ######################################################################################## */

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Project</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleProjectCreation)}>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Project Title</FormLabel>
									<Input
										placeholder="title"
										className="w-full outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										{...field}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem className="mt-2">
									<FormLabel>Description</FormLabel>
									<Input
										type="text"
										className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										{...field}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4 py-4 ">
							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>Start Date</FormLabel>
										<HYInputDate field={field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>End Date</FormLabel>
										<HYInputDate field={field} />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="owner"
							render={({ field }) => (
								<FormItem className="flex flex-col w-full">
									<FormLabel>Owner</FormLabel>
									<HYCombobox
										id="owner"
										name="Owner"
										form={form}
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
							<Button type="submit" className="text-white">Add</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectCreationForm;
