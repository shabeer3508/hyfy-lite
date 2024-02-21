import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HiDatabase, HiOutlineClock } from "react-icons/hi";
import HYSelect from "../HYSelect";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";

const IssueCreationForm = ({ children }: any) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);

	const epicsListData = useSelector((state: any) => state?.GetEpics);
	const epicItems = epicsListData?.data?.items;

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueItems = issuesListData?.data?.items;

	/*  ######################################################################################## */

	const formSchema = z.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		type: z.string(),
		status: z.string(),
		epic: z.string().optional().nullable(),
		points: z.string().optional().nullable(),
		assign_to: z.string().optional().nullable(),
		dependency: z.string().optional().nullable(),
		dependency_type: z.string().optional().nullable(),
		priority: z.string().optional().nullable(),
		estimated_hours: z.string().optional().nullable(),
		description: z.string().optional().nullable(),
		sub_tasks: z.string().optional().nullable(),
		project_id: z.string()
	});

	const defaultFormValues = {
		name: "",
		dependency: null,
		status: "backlog",
		points: "5",
		type: "story",
		project_id: appProfileInfo.project_id
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultFormValues,
	});

	/*  ######################################################################################## */

	const handleEpicCreation = async (values: z.infer<typeof formSchema>) => {
		const getIssues = (prams?: string) => {
			let query = "?expand=release_id,project_id";
			if (prams) {
				query = query + prams;
			}
			dispatch(getAction({ issues: Urls.issues + query }));
		};
		const resp = (await dispatch(postAction(Urls.issues, values))) as any;
		const success = resp.payload.status == 200;
		if (success) {
			form.reset(defaultFormValues);
			setOpenForm(false);
			getIssues();
		}
	};

	/*  ######################################################################################## */

	const epicOptions =
		epicItems?.map((epic) => ({
			value: epic?.id,
			label: epic?.name,
		})) ?? [];

	const usersOptions =
		usersList?.data?.items?.map((user) => ({
			value: user?.id,
			label: user?.name,
		})) ?? [];

	const issueOptions =
		issueItems
			?.filter((issue) => issue?.type === "story")
			?.map((issue) => ({
				value: issue?.id,
				label: issue?.name,
			})) ?? [];

	/*  ######################################################################################## */

	const pointOptions = [
		{ label: "5", value: "5" },
		{ label: "10", value: "10" },
		{ label: "15", value: "15" },
	];

	const priorityOptions = [
		{ label: "Critical", value: "critical" },
		{ label: "Heigh", value: "heigh" },
		{ label: "Medium", value: "medium" },
		{ label: "Low", value: "low" },
	];

	const estimatedHours = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
	];

	const typeOptions = [
		{ label: "Task", value: "task" },
		{ label: "Bug", value: "bug" },
		{ label: "Story", value: "story" },
	];

	const statusOptions = [
		{ label: "Backlog", value: "backlog" },
		{ label: "Todo", value: "todo" },
		{ label: "Ongoing", value: "ongoing" },
		{ label: "Pending", value: "pending" },
		{ label: "Done", value: "done" },
	];

	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl">
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
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Type</FormLabel>
										<HYCombobox
											defaultValue="story"
											buttonClassName="w-full"
											id="type"
											form={form}
											options={typeOptions}
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
									<FormItem className="flex flex-col">
										<FormLabel className="my-1">
											Epic
										</FormLabel>
										<HYCombobox
											buttonClassName="w-full"
											id="epic"
											form={form}
											options={epicOptions}
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
										<HYCombobox
											defaultValue="5"
											label={<HiDatabase />}
											buttonClassName="w-full"
											id="points"
											form={form}
											options={pointOptions}
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

									<HYCombobox
										defaultValue="backlog"
										buttonClassName="w-full"
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
							name="assign_to"
							render={({ field }) => (
								<FormItem className="my-3">
									<FormLabel>Assign To</FormLabel>
									<HYCombobox
										buttonClassName="w-full"
										id="assign_to"
										form={form}
										options={usersOptions}
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
										<HYCombobox
											buttonClassName="w-full"
											id="dependency"
											form={form}
											options={issueOptions}
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
											options={["blocking"]}
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
								<FormItem className="flex flex-col my-2">
									<FormLabel>Priority</FormLabel>
									<HYCombobox
										buttonClassName="w-full"
										id="priority"
										form={form}
										options={priorityOptions}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="estimated_hours"
							render={({ field }) => (
								<FormItem className="my-1">
									<FormLabel>Estimated Hours</FormLabel>
									<HYCombobox
										label={<HiOutlineClock />}
										buttonClassName="w-full"
										id="estimated_hours"
										form={form}
										options={estimatedHours}
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

						<FormField
							control={form.control}
							name="sub_tasks"
							render={({ field }) => (
								<FormItem className="my-1">
									<FormLabel>Sub Tasks</FormLabel>
									<FormControl>
										<Input
											disabled
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

export default IssueCreationForm;
