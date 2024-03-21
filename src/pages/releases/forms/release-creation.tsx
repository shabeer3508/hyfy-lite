import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { JsonToFormData } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import HYInputDate from "@/components/hy-components/HYInputDate";
import { getAction, postAction } from "@/redux/actions/AppActions";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
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

const ReleaseCreationForm = ({ children }: { children: React.ReactNode; }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	/*  ######################################################################################## */

	const releaseFormSchema = z.object({
		name: z.string().min(2, {
			message: "title must be at least 2 characters.",
		}),
		status: z.string(),
		to_date: z.date(),
		priority: z.string(),
		description: z.string().optional().nullable(),
		project_id: z.string(),
	});

	type ReleaseFormValues = z.infer<typeof releaseFormSchema>

	const defaultValues: Partial<ReleaseFormValues> = {
		name: "",
		status: "planning",
		description: "",
		priority: "medium",
		project_id: appProfileInfo?.project_id,
	}

	const form = useForm<ReleaseFormValues>({
		resolver: zodResolver(releaseFormSchema),
		defaultValues,
	});

	/*  ######################################################################################## */

	const getReleases = () => {
		let query = `?filter=project_id=${appProfileInfo.project_id}`;
		dispatch(getAction({ release: Urls.release + query }));
	}

	const handleReleaseCreation = async (values: ReleaseFormValues) => {
		const postData = JsonToFormData(values)

		// TODO: Add tag & file name 
		const resp = (await dispatch(postAction({ release: Urls.release }, postData))) as any;
		const success = resp.payload?.status == 200;
		if (success) {
			form.reset(defaultValues);
			setOpenForm(false);
			getReleases();
		}
	};

	/*  ######################################################################################## */

	const releaseStatus = [
		{ label: "Planning", value: "planning" },
		{ label: "Ongoing", value: "ongoing" },
		{ label: "Released", value: "released" },
	]

	const priorityOptions = [
		{ label: "Low", value: "low" },
		{ label: "Medium", value: "medium" },
		{ label: "High", value: "high" },
		{ label: "Urgent", value: "urgent" },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		form.reset(defaultValues);
	}, [openForm])


	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Release</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleReleaseCreation)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Release Title <span className="text-destructive">*</span></FormLabel>
									<Input
										placeholder="title"
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
								name="status"
								render={({ field }) => (
									<FormItem className="flex flex-col justify-center">
										<FormLabel className="my-1">
											Status <span className="text-destructive">*</span>
										</FormLabel>

										<HYCombobox
											id="status"
											form={form}
											options={releaseStatus}
											buttonClassName="w-full"
											defaultValue={form.getValues()?.status}
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
										<FormLabel>Release Date <span className="text-destructive">*</span></FormLabel>
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
									<FormLabel>Priority <span className="text-destructive">*</span></FormLabel>
									<HYCombobox
										id="priority"
										form={form}
										buttonClassName="w-full"
										options={priorityOptions}
										defaultValue={form.getValues()?.priority}
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
										className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
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
							<Button type="submit" className="text-white">Add</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default ReleaseCreationForm;
