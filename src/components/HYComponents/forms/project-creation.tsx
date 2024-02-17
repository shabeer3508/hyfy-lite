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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	owner: z.string().optional(),
	end_date: z.string().optional().nullable(),
	start_date: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
	status: z.string(),
});

const ProjectCreationForm = ({ children }: any) => {
	const dispatch = useDispatch();

	const [openForm, setOpenForm] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			status: "open",
			owner: "y9ynibdq68npy34",
		},
	});

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
								<FormItem className="col-span-2">
									<FormLabel>Project Title</FormLabel>
									<Input placeholder="title" {...field} />
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
									<Input type="text" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4 py-4 ">
							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Date</FormLabel>
										<Input type="date" {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Date</FormLabel>
										<Input type="date" {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="owner"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Owner</FormLabel>
									<HYSelect
										field={field}
										id="owner"
										className="w-full"
										options={[]}
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

export default ProjectCreationForm;
