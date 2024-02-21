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
								<HYSelect className="w-full" label="" options={["Recent", "Old"]} id={"filter"} />
								<HYSelect className="w-full" label="Roles" options={["all", "admin", "manager", "employee"]} id={"user"} />
							</div>

							<div className="flex gap-3">
								<HYSearch />
								<Button className="text-white">Add Member</Button>
							</div>
						</div >

						<div className="flex flex-col gap-y-3  items-center 2xl:w-2/3 ">
							<Card className="flex flex-row items-center  w-full  ">
								<HYAvatar className="size-12 ml-6" url="https://github.com/shadcn.png" />
								<CardHeader >
									<CardTitle>Roshan</CardTitle>
									<CardDescription>Flutter developer</CardDescription>
								</CardHeader>

							</Card>
						</div>

					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Team;

