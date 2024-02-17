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
	to_date: z.string().optional().nullable(),
	priority: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
});

const ReleaseCreationForm = ({ children }: any) => {
	const dispatch = useDispatch();

	const [openForm, setOpenForm] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			status: "planning",
		},
	});

	const handleEpicCreation = async (values: z.infer<typeof formSchema>) => {
		const getReleases = (prams?: string) => {
			let query = "";
			if (prams) {
				query = query + prams;
			}
			dispatch(getAction({ release: Urls.release + query }));
		};
		const resp = (await dispatch(postAction(Urls.release, values))) as any;
		const success = resp.payload.status == 200;
		if (success) {
			setOpenForm(false);
			getReleases();
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
									<FormLabel>Release Title</FormLabel>
									<Input placeholder="title" {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4 py-4 ">
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
												"planning",
												"ongoing",
												"released",
											]}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="to_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Release Date</FormLabel>
										<Input type="date" {...field} />
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
										options={[
											"low",
											"medium",
											"high",
											"urgent",
										]}
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

export default ReleaseCreationForm;
