import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import HYSelect from "../HYSelect";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { getAction, postAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	type: z.string(),
	epic: z.string().optional().nullable(),
	points: z.string().optional().nullable(),
	status: z.string().optional().nullable(),
	assign_to: z.string().optional().nullable(),
	dependency: z.string().optional().nullable(),
	dependency_type: z.string().optional().nullable(),
	priority: z.string().optional().nullable(),
	estimated_hours: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
	sub_tasks: z.string().optional().nullable(),
});

const IssueCreationForm = ({ children }: any) => {
	const dispatch = useDispatch();

	const [openForm, setOpenForm] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			// status: "blocking",
			// dependency: null,
			// dependency_type: null,
			// priority: null,
			// description: null,
		},
	});

	const handleEpicCreation = async (values: z.infer<typeof formSchema>) => {
		console.log("🚀 ~ handleEpicCreation ~ values:", values);
		// const getIssues = (prams?: string) => {
		// 	let query = "?expand=releases,project_id";
		// 	if (prams) {
		// 		query = query + prams;
		// 	}
		// 	dispatch(getAction({ epics: Urls.issues + query }));
		// };
		// const resp = (await dispatch(postAction(Urls.issues, values))) as any;
		// const success = resp.payload.status == 200;
		// if (success) {
		// 	setOpenForm(false);
		// 	getIssues();
		// }
	};

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] ">
				<DialogHeader>
					<DialogTitle>Add Story</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleEpicCreation)}>
						<div className="grid grid-cols-3 gap-3">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>Story Title</FormLabel>
										<Input placeholder="title" {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<HYSelect
											field={field}
											id="status"
											className="w-full"
											options={["blocking"]}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4 py-4 ">
							<FormField
								control={form.control}
								name="epic"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Epic</FormLabel>
										<HYSelect
											field={field}
											id="release"
											className="w-full"
											options={[
												"backlog",
												"todo",
												"ongoing",
											]}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="points"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Points</FormLabel>
										<HYSelect
											field={field}
											id="dependency"
											className="w-full"
											options={[]}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<HYSelect
										field={field}
										id="dependency"
										className="w-full"
										options={[]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="assign_to"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Assign To</FormLabel>
									<HYSelect
										field={field}
										id="priority"
										className="w-full"
										options={["backlog"]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-3">
							<FormField
								control={form.control}
								name="dependency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dependency</FormLabel>
										<HYSelect
											field={field}
											id="dependency"
											className="w-full"
											options={["backlog"]}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="dependency_type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Depedency Type</FormLabel>
										<HYSelect
											field={field}
											id="dependency_type"
											className="w-full"
											options={["backlog"]}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<HYSelect
										field={field}
										id="priority"
										className="w-full"
										options={["backlog"]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="estimated_hours"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estimated Hours</FormLabel>
									<HYSelect
										field={field}
										id="estimated_hours"
										className="w-full"
										options={["1", "2", "3", "4", "5", "6"]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="sub_tasks"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sub Tasks</FormLabel>
									<FormControl>
										<Input placeholder="" {...field} />
									</FormControl>
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

export default IssueCreationForm;
