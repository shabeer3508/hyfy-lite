import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HYSelect from "@/components/hy-components/HYSelect";
import { getAction, postAction } from "@/redux/actions/AppActions";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import HYInputDate from "@/components/hy-components/HYInputDate";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";


const SprintCreationForm = ({ children }: { children: React.ReactNode; }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const authInfo = useSelector((state: any) => state.UserReducer);

	/*  ######################################################################################## */

	const sprintFormSchema = z.object({
		name: z.string().min(2, {
			message: "Title must be at least 2 characters.",
		}),
		status: z.string(),
		duration: z.string(),
		exclude_days: z.string().optional().nullable(),
		exclude_public_holiday: z.boolean().optional().nullable(),
		start_date: z.date(),
		end_date: z.date(),
		description: z.string().optional().nullable(),
		project_id: z.string(),
		created_by: z.string(),
		issues: z.string().optional().nullable(),
	}).refine(data => {
		if (data?.start_date && data?.end_date) {
			return data?.end_date > data?.start_date;
		}
		return true;
	}, { message: "End date must be after the start date.", path: ["end_date"] });

	type SprintFormValues = z.infer<typeof sprintFormSchema>

	const defaultValues: Partial<SprintFormValues> = {
		name: "",
		status: "backlog",
		project_id: appProfileInfo?.project_id,
		created_by: authInfo?.user?._id,
		description: ""
	}

	const form = useForm<SprintFormValues>({
		resolver: zodResolver(sprintFormSchema),
		defaultValues,
	});

	/*  ######################################################################################## */

	const getSprints = () => {
		let query = `?perPage=300&expand=created_by&filter=project_id=${appProfileInfo?.project_id}`;
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	const handleSprintCreation = async (values: SprintFormValues) => {
		const resp = (await dispatch(postAction({ sprints: Urls.sprints }, values))) as any;
		const success = resp.payload?.status == 200;
		if (success) {
			form.reset(defaultValues);
			setOpenForm(false);
			getSprints();
		}
	};

	/*  ######################################################################################## */

	const statusOptions = [
		{ label: "Backlog", value: "backlog" },
		{ label: "In progress", value: "in-progress" },
		{ label: "Retro", value: "retro" },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		form.reset(defaultValues)
	}, [openForm]);

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Sprint</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSprintCreation)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Sprint Title <span className="text-destructive">*</span></FormLabel>
									<Input
										placeholder="title"
										className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
										{...field}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem className="flex flex-col my-2">
									<FormLabel>Status <span className="text-destructive">*</span></FormLabel>
									<HYCombobox
										buttonClassName="w-full"
										defaultValue="backlog"
										id="status"
										form={form}
										options={statusOptions}
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
									<FormLabel>Duration <span className="text-destructive">*</span></FormLabel>
									<HYSelect
										field={field}
										id="release"
										className="w-full"
										options={[
											"1 day",
											"2 days",
											"5 days",
											"7 days",
										]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name="exclude_days"
							render={({ field }) => (
								<FormItem className="my-1">
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
						/> */}
						{/* <FormField
							control={form.control}
							name="exclude_public_holiday"
							render={({ field }) => (
								<FormItem className="flex items-center pt-1">
									<Checkbox id="exclude_public_holiday" />
									<FormLabel className="flex items-center px-2">
										Also exclude public holidays
									</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<div className="grid grid-cols-2 gap-4 py-4 ">
							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Date <span className="text-destructive">*</span></FormLabel>
										<HYInputDate field={field} />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Date <span className="text-destructive">*</span></FormLabel>
										<HYInputDate field={field} />
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

export default SprintCreationForm;
