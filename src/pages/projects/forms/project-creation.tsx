import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BoardTemplateType } from "@/interfaces";
import HYInputDate from "../../../components/hy-components/HYInputDate";
import { HYCombobox } from "../../../components/hy-components/HYCombobox";
import { getAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ProjectCreationForm = ({ children }: { children: React.ReactNode; }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const reducerName = reducerNameFromUrl("boardTemplates", "GET");
	const templateList = useSelector((state: any) => state?.[reducerName])?.data?.items as BoardTemplateType[];

	/*  ######################################################################################## */

	const projectFormSchema = z.object({
		title: z.string().min(3, {
			message: "Title must be at least 3 characters.",
		}),
		end_date: z.date().optional().nullable(),
		start_date: z.date().optional().nullable(),
		description: z.string().optional().nullable(),
		template: z.string(),
		status: z.enum(["open", "in-progress", "pending", "done"]),
	}).refine(data => {
		if (data?.start_date && data?.end_date) {
			return data?.end_date > data?.start_date;
		}
		return true;
	}, { message: "End date must be after the start date.", path: ["end_date"] });

	type ProjectFormValues = z.infer<typeof projectFormSchema>

	const defaultValues: Partial<ProjectFormValues> = {
		title: "",
		status: "open",
		description: ""
	};

	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues,
	});

	/*  ######################################################################################## */

	const getProjects = () => {
		let query = "?perPage=300&expand=owner";
		dispatch(getAction({ project: Urls.project + query }));
	};

	const handleProjectCreation = async (values: ProjectFormValues) => {
		const resp = (await dispatch(postAction({ project: Urls.project }, values))) as any;
		const success = resp.payload?.status == 200;
		if (success) {
			form.reset(defaultValues);
			setOpenForm(false);
			getProjects();
		}
	};

	/*  ######################################################################################## */

	const usersOptions =
		templateList?.map((tmp) => ({
			value: tmp?._id,
			label: tmp?.title,
		})) ?? [];

	/*  ######################################################################################## */

	useEffect(() => {
		form.reset(defaultValues);
	}, [openForm]);

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
									<FormLabel>Project Title <span className="text-destructive">*</span></FormLabel>
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

							<FormField
								control={form.control}
								name="template"
								render={({ field }) => (
									<FormItem className="flex flex-col w-full">
										<FormLabel>Template <span className="text-destructive">*</span></FormLabel>
										<HYCombobox
											id="template"
											name="Template"
											form={form}
											options={usersOptions}
											optionsClassName="w-auto md:w-[300px] "
											buttonClassName="w-full"
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>



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
