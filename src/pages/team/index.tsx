import Urls from "@/redux/actions/Urls";
import { UsersTypes } from "@/interfaces";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HiDotsVertical } from "react-icons/hi";
import InviteUsers from "./forms/invite-members";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import HYAvatar from "@/components/hy-components/HYAvatar";
import HYDialog from "@/components/hy-components/HYDialog";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAction, patchAction, reducerNameFromUrl, setTeamsData } from "@/redux/actions/AppActions";

const Team = () => {

	const dispatch = useDispatch();

	const usersReducerName = reducerNameFromUrl("users", "GET");
	const usersList = useSelector((state: any) => state?.[usersReducerName]);
	const userItems = usersList?.data?.items as UsersTypes[]

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
	const teamsPageInfo = appProfileInfo?.teams

	/*  ######################################################################################## */

	const getUsers = () => {
		let query = `?perPage=50
			&sort=${teamsPageInfo.order_filter_value === "recent" ? "-createdAt" : "createdAt"}
			${teamsPageInfo.role_filter_value !== "all" ? `&filter=role=${teamsPageInfo.role_filter_value}` : ""}`;

		dispatch(getAction({ users: Urls.users + query }));
	};

	/*  ######################################################################################## */

	const orderFilterOption = [
		{ label: "Recent", value: "recent" },
		{ label: "Old", value: "old" }
	]

	const userRolesOptions = [
		{ label: "Admin", value: "admin" },
		{ label: "Owner", value: "owner" },
		{ label: "Manager", value: "manager" },
		{ label: "Employee", value: "employee" },
	]

	/*  ######################################################################################## */

	useEffect(() => {
		getUsers();
	}, [teamsPageInfo, appProfileInfo.project_id]);

	/*  ######################################################################################## */

	return (
		<div className="dark:text-foreground ml-6 h-screen ">
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
						<div className="flex justify-between items-center my-3 xl:w-2/3 pr-6">
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
								<HYDialog
									title={"Add members"}
									className="dark:bg-card"
									content={<InviteUsers />}
								>
									<Button className="text-white">Invite Member</Button>
								</HYDialog>
							</div>
						</div>

						<div className="pr-3 ">
							{userItems?.length > 0 &&
								<ScrollArea className="flex flex-col gap-5 space-y-5  h-[calc(100vh-200px)] items-center xl:w-2/3 pr-3">
									{userItems?.map(user => (
										<Card key={user?._id} className="flex flex-row justify-between items-center w-full dark:bg-[#151619] hover:border-primary first:my-0 my-3" >
											<div className="flex items-center">
												<HYAvatar className="size-12 ml-6 my-2" url="https://github.com/shadcn.png" />
												<CardHeader className="gap-y-0 p-3">
													<CardTitle className="text-base capitalize">{user?.user_name || user?.email?.split("@")[0]}</CardTitle>
													<CardDescription className="capitalize">{user?.role}</CardDescription>
												</CardHeader>
											</div>
											<div className="flex dark:text-slate-400 gap-2 items-center mr-2">
												<Label className="" htmlFor="email">
													{user?.email}
												</Label>

												<HYDropDown options={[
													{
														label: "Manage Member",
														isTriggerDialog: true,
														dialogClassName: "max-w-xl",
														dialogContent: <ManageUserCard userInfo={user} updateUserList={getUsers} />
													},
													{
														label: "Remove Member",
														isTriggerDialog: true,
														dialogClassName: "max-w-xl",
														dialogContent: <RemoveUserCard userInfo={user} updateUserList={getUsers} />
													},
												]}>
													<Button size="icon" variant="ghost" className="" >
														<HiDotsVertical className="size-5" />
													</Button>
												</HYDropDown>
											</div>
										</Card>
									))}


								</ScrollArea>
							}

							{userItems?.length <= 0 && <div className=" w-full items-center justify-center h-[calc(100vh-200px)] flex">No members found</div>}
						</div>
					</TabsContent>
				</Tabs>


			</div>
		</div>
	);
};

export default Team;

const RemoveUserCard = ({ userInfo }: { userInfo: UsersTypes, updateUserList: any }) => {
	const dispatch = useDispatch();

	const handleRemoveMember = () => {
		dispatch(patchAction({ organization: Urls.organization + "/remove" }, {}, userInfo?._id));

		// TODO: handle what happen after remove member.

	}


	return <div className="flex flex-col gap-5">
		<div className="text-center flex flex-col gap-3">
			<div className="text-xl">Remove this member ?</div>
			<div className="text-[#9499A5]">They won’t be able to access the organizaion</div>
		</div>
		<div className="flex justify-between gap-3">
			<DialogClose asChild>
				<Button
					type="button"
					variant="destructive"
					className="w-full border hover:border-destructive"
					onClick={handleRemoveMember}>
					Delete
				</Button>
			</DialogClose>
			<DialogClose asChild>
				<Button type="button" variant="outline" className="w-full">
					Cancel
				</Button>
			</DialogClose>
		</div>
	</div>
}


const ManageUserCard = ({ userInfo, updateUserList }: { userInfo: UsersTypes, updateUserList: any }) => {

	const dispatch = useDispatch();
	const [managerInfo, setManagerInfo] = useState<any>({ role: userInfo?.role })

	const rolesOptions = [
		{ label: 'Manager', value: "manager" },
		{ label: 'Owner', value: "owner" },
		{ label: "Employee", value: "employee" }
	]

	const handleManageUser = () => {
		((dispatch(patchAction({ organization: Urls.users }, { role: managerInfo?.role, email: userInfo?.email }, userInfo?._id))) as any).then((res) => {
			if (res?.payload?.status == 200) {
				updateUserList()
			}
		})
	}

	return <div className="">
		<div className="flex flex-col gap-2 mb-2">
			<div className="text-xl">Manage Member</div>
			<Card className="dark:bg-[#101114]">
				<div className="flex items-center p-3 gap-3 text-xs">
					<div>
						<HYAvatar name={userInfo?.user_name} />
					</div>
					<div>
						<div className="text-sm">{userInfo?.user_name}</div>
						<div className="text-[#FFFFFF66]">{userInfo?.email}</div>
					</div>
				</div>
			</Card>

			<div className="mb-3">
				<div className="my-2 text-xs">Designation</div>
				<HYCombobox
					unSelectable={false}
					options={rolesOptions}
					defaultValue={userInfo?.role}
					buttonClassName="border w-full"
					onValueChange={(value) => setManagerInfo((prevData) => ({ ...prevData, role: value }))}
				/>
			</div>
		</div>
		<div className="flex justify-between gap-3">
			<DialogClose asChild>
				<Button type="button" variant="outline" className="w-full">
					Cancel
				</Button>
			</DialogClose>
			<DialogClose asChild>
				<Button disabled={userInfo?.role === managerInfo?.role} type="button" className="w-full text-white" onClick={handleManageUser}>
					Apply
				</Button>
			</DialogClose>
		</div>
	</div>
}