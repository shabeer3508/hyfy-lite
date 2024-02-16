import HYAvatar from "@/components/HYComponents/HYAvatar";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import HYStatusBadge from "@/components/HYComponents/HYStatusBadge";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { MoreVertical } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
	const dispatch = useDispatch();
	const reducerName = reducerNameFromUrl("project", "GET");
	const itemsRes = useSelector((state: any) => state?.[reducerName]);

	useEffect(() => {
		loadAction();
	}, []);

	function loadAction(prams?: string) {
		let query = "?expand=owner";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ project: Urls.project + query }));
	}

	const items = itemsRes?.data?.items?.map((val: any) => ({
		...val,
		...val?.expand,
	}));

	// const priorities = ["low", "medium", "high", "urgent"];

	console.log(`index,  : items`, items);
	console.log(`index,  : reducerName`, reducerName);

	return (
		<div className=" flex flex-col h-full">
			<div className=" flex justify-between items-end mx-8">
				<div className="flex flex-col gap-4">
					<p className=" text-xl ">Projects</p>
					<Button size="sm">Create Project</Button>
				</div>
				<div className="flex gap-2">
					<HYSearch />
					<div className="">
						<HYSelect
							id=""
							label="Status"
							options={["done", "in-progress", "pending", "open"]}
						/>
					</div>
				</div>
			</div>
			<div className=" overflow-auto px-8 ">
				<div className="flex flex-col gap-3 mt-4">
					{items?.map((item: any, index: number) => (
						<Card
							key={`pi_${index}`}
							className="flex justify-between items-center h-16 px-3 rounded-lg"
						>
							<div className="flex gap-3 items-center">
								<img src="/folder_icon.svg" alt="Project" />
								<div className="capitalize ">{item?.title}</div>
							</div>
							<div className="flex gap-4">
								<div className="flex items-center gap-4">
									<HYAvatar
										url="https://github.com/shadcn.png"
										name={item?.owner?.name}
									/>
									<a>{item?.owner?.name}</a>
								</div>
								<HYStatusBadge status={item?.status} />
								<Button variant="ghost" size="sm">
									<MoreVertical />
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default Index;
