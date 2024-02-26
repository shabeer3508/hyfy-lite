import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { LuMoreVertical } from "react-icons/lu";

const Team = () => {

	const [memberInfo, setMemberInfo] = useState({
		showSideBar: false,
		showAddMembers: false,
		showManageMembers: false,
	})

	return (
		<div className="dark:text-foreground mx-6 h-screen">
			<div className="gap-3">
				<Tabs defaultValue="members" className=" ">

					<div className="flex items-center justify-between">
						<Label className="" htmlFor="team">Teams</Label>
						<TabsList>
							<TabsTrigger value="members">Members</TabsTrigger>
							<TabsTrigger value="performance">Performance</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="members">

						<div className="flex justify-between items-center my-3 2xl:w-2/3">
							<div className="flex flex-row gap-3 w-1/3 tems-center">
								<HYSelect className="w-full" label="Recent" options={["Recent", "Old"]} id={"filter"} />
								<HYSelect className="w-full" label="Roles" options={["all", "admin", "manager", "employee"]} id={"user"} />
							</div>

							<div className="flex gap-3">
								<HYSearch />
								<Button className="text-white">Add Member</Button>
							</div>
						</div >

						<div className="flex flex-col gap-y-3  items-center 2xl:w-2/3 ">
							<Card className="flex flex-row h-16 justify-between items-center  w-full  ">
								<div className="flex items-center">
									<HYAvatar className="size-12 ml-6" url="https://github.com/shadcn.png" />
									<CardHeader className="gap-y-0" >
										<CardTitle className="">Roshan</CardTitle>
										<CardDescription className="">Flutter Dev</CardDescription>
									</CardHeader>
								</div>
								<div className="flex dark:text-slate-400 gap-2 items-center ">
									<Label className="" htmlFor="email">roshan@gmail.com</Label>
									<LuMoreVertical className="mr-3 size-7"/>
								</div>

							</Card>
						</div>

					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Team;

