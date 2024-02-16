import { z } from "zod";
import { useState } from "react";
import HYSelect from "../HYSelect";
import Urls from "@/redux/actions/Urls";
import HYInputDate from "../HYInputDate";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { HYCombobox } from "../HYCombobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAction, postAction } from "@/redux/actions/AppActions";
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

const ReleaseCreationForm = ({ children }: any) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	/*  ######################################################################################## */

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		status: z.string(),
		to_date: z.date().optional().nullable(),
		priority: z.string().optional().nullable(),
		description: z.string().optional().nullable(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			status: "planning",
		},
	});

	/*  ######################################################################################## */

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

	/*  ######################################################################################## */

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
									<Input
										placeholder="title"
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
								name="status"
								render={({ field }) => (
									<FormItem className="flex flex-col justify-center">
										<FormLabel className="my-1">
											Status
										</FormLabel>

										<HYCombobox
											id="status"
											buttonClassName="w-full"
											// name="Status"
											form={form}
											options={[
												{
													label: "Panning",
													value: "planning",
												},
												{
													label: "Ongoing",
													value: "ongoing",
												},
												{
													label: "Released",
													value: "released",
												},
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
										<HYInputDate field={field} />
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
								<FormItem className="my-1">
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
