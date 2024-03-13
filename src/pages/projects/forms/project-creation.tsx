import { z } from "zod";
import Urls from "@/redux/actions/Urls";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import HYInputDate from "../../../components/hy-components/HYInputDate";
import { HYCombobox } from "../../../components/hy-components/HYCombobox";
import { getAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ProjectCreationForm = ({ children }: { children: any }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	/*  ######################################################################################## */

	const formSchema = z.object({
		title: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		// owner: z.string(),
		end_date: z.date().optional().nullable(),
		start_date: z.date().optional().nullable(),
		description: z.string().optional().nullable(),
		status: z.string(),
	});

	const defaultFormValues = {
		title: "",
		status: "open",
		description: ""
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultFormValues,
	});

	/*  ######################################################################################## */

	const getUsers = () => {
		let query = `?perPage=300`;
		dispatch(getAction({ users: Urls.users + query }));
	};

	const getProjects = () => {
		let query = "?perPage=300&expand=owner";
		dispatch(getAction({ project: Urls.project + query }));
	};

	const handleProjectCreation = async (values: z.infer<typeof formSchema>) => {
		const resp = (await dispatch(postAction({ project: Urls.project }, values))) as any;
		const success = resp.payload?.status == 200;
		if (success) {
			form.reset(defaultFormValues);
			setOpenForm(false);
			getProjects();
		}
	};

	/*  ######################################################################################## */

	// const usersOptions =
	// 	usersList?.data?.items?.map((user) => ({
	// 		value: user?._id,
	// 		label: user?.user_name,
	// 	})) ?? [];

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
										placeholder="Title"
										className="w-full outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
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
										className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
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

						{/* <FormField
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
						/> */}

						<DialogFooter className="mt-5">
							<Button type="reset" variant="outline" onClick={() => setOpenForm(false)}>
								Cancel
							</Button>
							<Button
								onClick={form.handleSubmit(handleProjectCreation)}
								type="submit"
								className="text-white"
							>
								Add
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ProjectCreationForm;
