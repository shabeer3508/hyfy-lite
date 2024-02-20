import React from "react";
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"
import HYSearch from "@/components/HYComponents/HYSearch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

  
  


const Team = () => {
	return (
		<div className="dark:text-foreground flex flex-col  ml-4 h-screen gap-y-8 w-full ">
			<div className="flex flex-row w-full justify-between items-center mb-2 ">
				<Label className=" top-2 " htmlFor="team">Teams</Label>
			<div className="flex-row gap-3">
					<Tabs defaultValue="members" className="w-[400px]">
						<TabsList>
							<TabsTrigger value="members">Members</TabsTrigger>
							<TabsTrigger value="performance">performance</TabsTrigger>
						</TabsList>
					</Tabs>

				</div>
			</div>
				
			<div className="flex flex-row  gap-80 items-center">
				<div className="flex flex-row gap-3 w-64 items-center">
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Recent" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
					<Select>
						<SelectTrigger className="">
							<SelectValue placeholder="Roles All" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-row gap-3  w-64 ">
					<HYSearch ></HYSearch>
					<Button variant="outline">Add Member</Button>
				</div>
			</div>
			<div className="flex flex-col gap-y-3  items-center  ">
				<Card className="flex flex-row items-center  w-full  ">
					<Avatar className=" w-16 h-16 ml-3  ">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<CardHeader >
						<CardTitle>Roshan</CardTitle>
						<CardDescription>Flutter developer</CardDescription>
					</CardHeader>
					
				</Card>

				

			</div>
	</div>
		
	);
};

export default Team;	

