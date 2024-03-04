import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LuMoreVertical } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberCreationForm from "@/components/HYComponents/forms/member-creation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAction, reducerNameFromUrl, setTeamsData } from "@/redux/actions/AppActions";

const Team = () => {

	const dispatch = useDispatch();

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const teamsPageInfo = appProfileInfo?.teams

	/*  ######################################################################################## */

	const getUsers = (prams?: string) => {
		let query = "";
		if (prams) { query = query + prams }
		dispatch(getAction({ users: Urls.users + query }));
	};

	/*  ######################################################################################## */

	const orderFilterOption = [
		{ label: "Recent", value: "recent" },
		{ label: "Old", value: "old" }
	]

	const userRolesOptions = [
		{ label: "Admin", value: "admin" },
		{ label: "Manager", value: "manager" },
		{ label: "Employee", value: "employee" },
	]

	/*  ######################################################################################## */

	useEffect(() => {
		getUsers();
	}, [teamsPageInfo, appProfileInfo.project_id]);

	/*  ######################################################################################## */

	return (
		<div className="dark:text-foreground mx-6 h-screen">
			<div className="gap-3">
				<Tabs defaultValue="members" className=" ">
					<div className="flex items-center justify-between min-h-10">
						<div className="text-xl" >
							Teams
						</div>
						<TabsList className="hidden">
							<TabsTrigger value="members">Members</TabsTrigger>
							<TabsTrigger value="performance">Performance</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="members">
						<div className="flex justify-between items-center my-3 2xl:w-2/3">
							<div className="flex flex-row gap-3 w-1/3 tems-center">
								<HYCombobox
									label={"Order"}
									unSelectable={false}
									options={orderFilterOption}
									defaultValue={teamsPageInfo?.order_filter_value}
									onValueChange={(value) => dispatch(setTeamsData(value, "order_filter_value"))}
								/>
								<HYCombobox
									label={"Role"}
									unSelectable={false}
									defaultValue={teamsPageInfo?.role_filter_value}
									options={[{ label: "All", value: "all" }, ...userRolesOptions]}
									onValueChange={(value) => dispatch(setTeamsData(value, "role_filter_value"))}
								/>
							</div>

							<div className="flex gap-3">
								<HYSearch />
								<MemberCreationForm><Button className="text-white">Add Member</Button></MemberCreationForm>
							</div>
						</div>

						<div className=" ">
							<ScrollArea className="flex flex-col gap-5 space-y-5  h-[calc(100vh-200px)] items-center 2xl:w-2/3">
								{userItems?.map(user => (
									<Card key={user?._id} className="flex flex-row justify-between items-center w-full dark:bg-[#151619] bg-[#F7F8F9] first:my-0 my-3" >
										<div className="flex items-center">
											<HYAvatar className="size-12 ml-6 " url="https://github.com/shadcn.png" />
											<CardHeader className="gap-y-0 p-3">
												<CardTitle className="text-base">{user?.user_name}</CardTitle>
												<CardDescription className="capitalize">{user?.role}</CardDescription>
											</CardHeader>
										</div>
										<div className="flex dark:text-slate-400 gap-2 items-center ">
											<Label className="" htmlFor="email">
												{user?.email}
											</Label>
											<LuMoreVertical className="mr-3 size-7" />
										</div>
									</Card>
								))}
							</ScrollArea>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Team;
