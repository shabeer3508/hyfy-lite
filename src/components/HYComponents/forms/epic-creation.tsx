import { z } from "zod";
import Urls from "@/redux/actions/Urls";
import { useForm } from "react-hook-form";
import { HYCombobox } from "../HYCombobox";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
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
import {
	getAction,
	postAction,
	reducerNameFromUrl,
} from "@/redux/actions/AppActions";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";

const EpicCreationForm = ({ children }: { children: any }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicsListData = useSelector((state: any) => state?.[epicReducerName]);
	const epicItems = epicsListData?.data?.items;

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const releaseList = useSelector(
		(state: any) => state?.[releaseReducerName]
	);

	/*  ######################################################################################## */

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		status: z.string(),
		release: z.string().optional().nullable(),
		dependency: z.string().optional().nullable(),
		dependency_type: z.string().optional().nullable(),
		priority: z.string().optional().nullable(),
		description: z.string().optional().nullable(),
		project_id: z.string()
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			status: "blocking",
			release: null,
			dependency: null,
			dependency_type: null,
			priority: null,
			description: null,
			project_id: appProfileInfo.project_id
		},
	});

	/*  ######################################################################################## */

	const getReleases = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ release: Urls.release + query }));
	};

	const getEpics = (prams?: string) => {
		let query = "?expand=releases,project_id";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ epic: Urls.epic + query }));
	};

	const handleEpicCreation = async (values: z.infer<typeof formSchema>) => {
		const getEpics = (prams?: string) => {
			let query = "?expand=releases,project_id";
			if (prams) {
				query = query + prams;
			}
			dispatch(getAction({ epic: Urls.epic + query }));
		};

		const resp = (await dispatch(postAction(Urls.epic, values))) as any;

		const success = resp.payload.status == 200;

		if (success) {
			setOpenForm(false);
			getEpics();
		}
	};

	/*  ######################################################################################## */

	const releaseOptions =
		releaseList?.data?.items?.map((relse) => ({
			value: relse?.id,
			label: relse?.name,
		})) ?? [];

	const epicOptions =
		epicItems?.map((epic) => ({
			value: epic?.id,
			label: epic?.name,
		})) ?? [];

	/*  ######################################################################################## */

	useEffect(() => {
		getReleases();
		getEpics();
	}, []);

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
									<FormLabel>Epic Title</FormLabel>
									<Input
										placeholder="title"
										className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
									<FormLabel>Status</FormLabel>
									<HYCombobox
										buttonClassName="w-full"
										id="status"
										form={form}
										options={[
											{
												label: "Open",
												value: "open",
											},
											{
												label: "In progress",
												value: "in-progress",
											},
											{
												label: "Pending",
												value: "pending",
											},
											{
												label: "Done",
												value: "done",
											},
										]}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="release"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Release</FormLabel>
									<HYCombobox
										id="release"
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
											id="dependency_type"
											form={form}
											options={[
												{
													label: "Blocking",
													value: "blocking",
												},
											]}
											buttonClassName="w-full"
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
									<HYCombobox
										id="priority"
										form={form}
										options={[
											{
												label: "Critical",
												value: "critical",
											},
											{
												label: "Heigh",
												value: "heigh",
											},
											{
												label: "Medium",
												value: "medium",
											},
											{
												label: "Low",
												value: "low",
											},
										]}
										buttonClassName="w-full"
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
											className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
							<Button type="submit">Add</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EpicCreationForm;
