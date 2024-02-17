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
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	status: z.string(),
	duration: z.string().optional().nullable(),
	exclude_days: z.string().optional().nullable(),
	exclude_public_holiday: z.boolean().optional().nullable(),
	start_date: z.string().optional().nullable(),
	end_date: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
	project_id: z.string().optional().nullable(),
	issues: z.string().optional().nullable(),
});

const SprintCreationForm = ({ children }: any) => {
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
		const getSprints = (prams?: string) => {
			let query = "";
			if (prams) {
				query = query + prams;
			}
			dispatch(getAction({ sprints: Urls.sprints + query }));
		};
		const resp = (await dispatch(postAction(Urls.sprints, values))) as any;
		const success = resp.payload.status == 200;
		if (success) {
			setOpenForm(false);
			getSprints();
		}
	};

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Sprint</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleEpicCreation)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Sprint Title</FormLabel>
									<Input placeholder="title" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<HYSelect
										field={field}
										id="status"
										className="w-full"
										options={[
											"backlog",
											"ongoing",
											"retro",
											"in-progress",
										]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration</FormLabel>
									<HYSelect
										field={field}
										id="release"
										className="w-full"
										options={[
											"7 days",
											"5 days",
											"2 days",
											"1 day",
										]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="exclude_days"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Exclude</FormLabel>
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
							name="exclude_public_holiday"
							render={({ field }) => (
								<FormItem className="flex items-center pt-1">
									<Checkbox
										id="exclude_public_holiday"
										// checked={false}
										// {...field}
										// onCheckedChange={() => {
										// 	setSearchParams({});
										// }}
									/>
									<FormLabel className="flex items-center px-2">
										Also Exclude public holidays
									</FormLabel>
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
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<Input type="text" {...field} />
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

export default SprintCreationForm;
