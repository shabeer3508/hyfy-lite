import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { HiDatabase, HiOutlineClock } from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HYSelect from "@/components/hy-components/HYSelect";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { EpicTypes, IssueStatusTypes, IssueTypes } from "@/interfaces";
import { HYUserSelect } from "@/components/hy-components/HYUserSelect";
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

const IssueCreationForm = ({ children }: { children: React.ReactNode; }) => {
	const dispatch = useDispatch();
	const [openForm, setOpenForm] = useState(false);
	const [selectedUsers, setUsersInfo] = useState([]);

	const epicReducerName = reducerNameFromUrl("epic", "GET")
	const epicsListData = useSelector((state: any) => state?.[epicReducerName]);
	const epicItems = epicsListData?.data?.items as EpicTypes[];

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const issuesListData = useSelector((state: any) => state?.GetIssues);
	const issueItems = issuesListData?.data?.items as IssueTypes[];

	const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
	const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];

	/*  ######################################################################################## */

	const issueFormSchema = z.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		type: z.string(),
		status: z.string().optional(),
		epic_id: z.string().optional().nullable(),
		points: z.string().optional().nullable(),
		dependency: z.string().optional().nullable(),
		dependency_type: z.string().optional().nullable(),
		priority: z.string().optional().nullable(),
		estimated_hours: z.string().optional().nullable(),
		description: z.string().optional().nullable(),
		sub_tasks: z.string().optional().nullable(),
		project_id: z.string(),
	});

	type IssueFormValues = z.infer<typeof issueFormSchema>

	const defaultValues: Partial<IssueFormValues> = {
		name: "",
		points: "5",
		type: "story",
		project_id: appProfileInfo.project_id,
		status: issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id,
	}

	const form = useForm<IssueFormValues>({
		resolver: zodResolver(issueFormSchema),
		defaultValues,
	});

	/*  ######################################################################################## */

	const getIssues = () => {
		let query = `?perPage=300
			&expand=release_id,project_id,epic_id
			&filter=project_id=${appProfileInfo?.project_id}`;

		dispatch(getAction({ issues: Urls.issues + query }));
	};


	const handleEpicCreation = async (values: IssueFormValues) => {
		const postData = { ...values, assign_to: selectedUsers?.map((user) => user?._id) || [] }
		const resp = (await dispatch(postAction({ issues: Urls.issues }, postData))) as any;
		const success = resp.payload?.status == 200;
		if (success) {
			form.reset(defaultValues);
			setOpenForm(false);
			getIssues();
		}
	};

	const handleUserSelection = (user) => {
		if (user && !selectedUsers?.find(u => u._id == user?._id)) {
			setUsersInfo((prev) => ([...prev, user]))
		}
	}

	const handleUserDelete = (userId) => {
		if (userId) {
			setUsersInfo((prev) => (prev?.filter(u => u._id !== userId)))
		}
	}

	/*  ######################################################################################## */

	const epicOptions = epicItems?.map((epic) => ({
		value: epic?._id,
		label: epic?.name,
	})) ?? [];

	const issueOptions =
		issueItems
			?.filter((issue) => issue?.type === "story")
			?.map((issue) => ({
				value: issue?._id,
				label: issue?.name,
			})) ?? [];

	/*  ######################################################################################## */

	const pointOptions = [
		{ label: "5", value: "5" },
		{ label: "10", value: "10" },
		{ label: "15", value: "15" },
	];

	const priorityOptions = [
		{ label: "Low", value: "low" },
		{ label: "Medium", value: "medium" },
		{ label: "High", value: "high" },
		{ label: "Critical", value: "critical" },
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

	const statusOptions = issueStatusList?.map(status => ({ label: status?.name, value: status?._id }))

	/*  ######################################################################################## */

	useEffect(() => {
		form?.reset(defaultValues)
		setUsersInfo([])
	}, [openForm])

	/*  ######################################################################################## */


	return (
		<Dialog open={openForm} onOpenChange={setOpenForm}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-4xl h-[75vh] dark:bg-card">
				<DialogHeader>
					<DialogTitle>Add Issue</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleEpicCreation)} className="overflow-auto pr-3">
						<div className="grid grid-cols-3 gap-3">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel className="text-xs text-[#9499A5]">Story Title</FormLabel>
										<Input
											placeholder="Title"
											className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-[#36363A] dark:bg-card"
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
										<FormLabel className="text-xs text-[#9499A5]">Type</FormLabel>
										<HYCombobox
											defaultValue="story"
											buttonClassName="w-full dark:bg-card dark:border-[#36363A]"
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
								name="epic_id"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="my-1 text-xs text-[#9499A5]">
											Epic
										</FormLabel>
										<HYCombobox
											buttonClassName="w-full  dark:bg-card dark:border-[#36363A]"
											id="epic_id"
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
										<FormLabel className="text-xs text-[#9499A5]">Points</FormLabel>
										<HYCombobox
											defaultValue="5"
											label={<HiDatabase />}
											buttonClassName="w-full  dark:bg-card dark:border-[#36363A]"
											id="points"
											form={form}
											options={pointOptions}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>


						<div className=" w-full flex gap-4">
							<div className="w-1/2 ">
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-xs text-[#9499A5]">Status</FormLabel>

											<HYCombobox
												defaultValue={form?.getValues()?.status}
												buttonClassName="w-full  dark:bg-card dark:border-[#36363A]"
												id="status"
												form={form}
												options={statusOptions}
											/>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-2 gap-3 my-2">
									<FormField
										control={form.control}
										name="dependency"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-xs text-[#9499A5]">Dependency</FormLabel>
												<HYCombobox
													buttonClassName="w-full  dark:bg-card dark:border-[#36363A]"
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
												<FormLabel className="text-xs text-[#9499A5]">Depedency Type</FormLabel>
												<HYSelect
													field={field}
													id="dependency_type"
													className="w-full  dark:bg-card dark:border-[#36363A]"
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
											<FormLabel className="text-xs text-[#9499A5]">Priority</FormLabel>
											<HYCombobox
												buttonClassName="w-full  dark:bg-card dark:border-[#36363A]"
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
											<FormLabel className="text-xs text-[#9499A5]">Estimated Hours</FormLabel>
											<HYCombobox
												label={<HiOutlineClock />}
												buttonClassName="w-full dark:bg-card dark:border-[#36363A]"
												id="estimated_hours"
												form={form}
												options={estimatedHours}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>

							</div>
							<div className="w-1/2 text-xs flex flex-col">
								<div className="flex flex-col justify-between pt-1">
									<div className="text-[#9499A5]">Assign to</div>
									<HYUserSelect showSearch buttonClassName="w-full my-3 dark:bg-card dark:border-[#36363A]" onValueChange={handleUserSelection} />
								</div>
								<div className="border dark:border-[#36363A] h-[210px] my-2 rounded p-1 flex flex-col gap-1 overflow-auto">

									{selectedUsers?.map(user => {
										return (
											<div key={user?._id} className="border dark:border-[#36363A] p-1 rounded flex justify-between items-center">
												<div className="flex gap-2 items-center">
													<div><HYAvatar name={user?.user_name || user?.name} /></div>
													<div>
														<div className="capitalize">{user?.user_name || user?.name}</div>
														<div className="text-[10px] text-[#9499A5]">{user?.role}</div>
													</div>
												</div>
												<Button type="button" variant="ghost" size="icon" onClick={() => handleUserDelete(user?._id)}>
													<HiMiniXMark />
												</Button>
											</div>
										)
									})}

								</div>
							</div>
						</div>


						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xs text-[#9499A5]">Description</FormLabel>
									<FormControl>
										<Input
											placeholder=""
											className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-card dark:border-[#36363A]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* <FormField
							control={form.control}
							name="sub_tasks"
							render={({ field }) => (
								<FormItem className="my-1">
									<FormLabel className="text-xs text-[#9499A5]">Sub Tasks</FormLabel>
									<FormControl>
										<Input
											disabled
											placeholder=""
											className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-card dark:border-[#36363A]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}

						<DialogFooter className="mt-5 pt-3 sticky bottom-0 border-t dark:bg-card dark:border-[#36363A]">
							<Button
								type="reset"
								variant="outline"
								className="dark:bg-card dark:border-primary text-primary"
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

export default IssueCreationForm;
