import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EpicTypes, ReleaseTypes } from "@/interfaces";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { HYCombobox } from "../../../components/hy-components/HYCombobox";
import { getAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
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
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const EpicCreationForm = ({ children }: { children: React.ReactNode; }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const authInfo = useSelector((state: any) => state.UserReducer);
	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicsListData = useSelector((state: any) => state?.[epicReducerName]);
	const epicItems = epicsListData?.data?.items as EpicTypes[];

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const releaseList = useSelector((state: any) => state?.[releaseReducerName])?.data?.items as ReleaseTypes[];

	/*  ######################################################################################## */

	const epicFormSchema = z.object({
		name: z.string().min(2, {
			message: "title must be at least 2 characters.",
		}),
		status: z.string(),
		release_id: z.string().optional().nullable(),
		dependency: z.string().optional().nullable(),
		dependency_type: z.string().optional().nullable(),
		priority: z.string(),
		description: z.string().optional().nullable(),
		project_id: z.string(),
	});

	type EpicFormValues = z.infer<typeof epicFormSchema>

	const defaultValues: Partial<EpicFormValues> = {
		name: "",
		status: "open",
		priority: "medium",
		project_id: appProfileInfo.project_id,
	}

	const form = useForm<EpicFormValues>({
		resolver: zodResolver(epicFormSchema),
		defaultValues,
	});

	/*  ######################################################################################## */

	const getReleases = (prams?: string) => {
		let query = `?filter=project_id=${appProfileInfo.project_id}`;
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ release: Urls.release + query }));
	};

	const getEpics = (prams?: string) => {
		let query = `?perPage=300
			&expand=release_id,project_id
			&filter=project_id=${appProfileInfo.project_id}`;

		if (prams) { query = query + prams }
		dispatch(getAction({ epic: Urls.epic + query }));
	};

	const handleEpicCreation = async (values: EpicFormValues) => {
		const resp = (await dispatch(postAction({ epic: Urls.epic }, values))) as any;

		const success = resp.payload.status == 200;

		if (success) {
			form.reset(defaultValues)
			setOpenForm(false);
			getEpics();
		}
	};

	/*  ######################################################################################## */

	const releaseOptions =
		releaseList?.map((relse) => ({
			value: relse?._id,
			label: relse?.name,
		})) ?? [];

	const epicOptions =
		epicItems?.map((epic) => ({
			value: epic?._id,
			label: epic?.name,
		})) ?? [];


	const statusOptions = [
		{ label: "Open", value: "open" },
		{ label: "In progress", value: "in-progress" },
		{ label: "Pending", value: "pending" },
		{ label: "Done", value: "done" },
	]

	const dependencyTypeOptions = [
		{ label: "Blocking", value: "blocking" }
	]

	const priorityOptions = [
		{ label: "Low", value: "low" },
		{ label: "Medium", value: "medium" },
		{ label: "High", value: "high" },
		{ label: "Critical", value: "critical" },
	]

	/*  ######################################################################################## */

	useEffect(() => {
		getReleases();
		getEpics();
	}, []);

	useEffect(() => {
		form.reset(defaultValues)
	}, [openForm]);


	/*  ######################################################################################## */

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Epic</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleEpicCreation)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Epic Title <span className="text-destructive">*</span></FormLabel>
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
								<FormItem className="flex flex-col my-3">
									<FormLabel>Status <span className="text-destructive">*</span></FormLabel>
									<HYCombobox
										id="status"
										form={form}
										options={statusOptions}
										buttonClassName="w-full"
										defaultValue={form.getValues()?.status}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="release_id"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Release</FormLabel>
									<HYCombobox
										id="release_id"
										form={form}
										options={releaseOptions}
										buttonClassName="w-full"
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4 py-4 ">
							<FormField
								control={form.control}
								name="dependency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Dependency</FormLabel>
										<HYCombobox
											id="dependency"
											form={form}
											options={epicOptions}
											buttonClassName="w-full"
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
										<FormLabel>Dependency Type</FormLabel>
										<HYCombobox
											form={form}
											id="dependency_type"
											buttonClassName="w-full"
											options={dependencyTypeOptions}
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
									<FormLabel>Priority <span className="text-destructive">*</span></FormLabel>
									<HYCombobox
										id="priority"
										form={form}
										options={priorityOptions}
										buttonClassName="w-full"
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
								<FormItem className="my-2">
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder=""
											className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
											{...field}
										/>
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
							<Button type="submit" className="text-white">Add</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EpicCreationForm;
