import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";

import { Button } from "@/components/ui/button";
import {
	getAction,
	patchAction,
	reducerNameFromUrl,
} from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReleaseCard from "./ReleaseCard";
import ReleaseCreationForm from "@/components/HYComponents/forms/release-creation";

const Releases = () => {
	const dispatch = useDispatch();
	const reducerName = reducerNameFromUrl("release", "GET");
	const itemsRes = useSelector((state: any) => state?.[reducerName]);

	useEffect(() => {
		loadAction();
	}, []);

	function loadAction(prams?: string) {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ release: Urls.release + query }));
	}

	async function updateItemStage(id: string, stage: string) {
		const resp = (await dispatch(
			patchAction({ release: Urls.release }, { status: stage }, id)
		)) as any;
		const success = resp.payload.status == 200;
		if (success) {
			loadAction();
		}
	}

	const items = itemsRes?.data?.items?.map((val: any) => ({
		...val,
		...val?.expand,
	}));
	const PlaningItems = items?.filter(
		(item: any) => item?.status === "planning"
	);
	const OngoingItems = items?.filter(
		(item: any) => item?.status === "ongoing"
	);
	const ReleasedItems = items?.filter(
		(item: any) => item?.status === "released"
	);

	return (
		<div className=" flex flex-col h-full">
			<div className=" flex justify-between items-end mx-8">
				<div className="flex flex-col gap-4">
					<p className=" text-xl ">Releases</p>
					<ReleaseCreationForm>
						<Button size="sm">Create Release</Button>
					</ReleaseCreationForm>
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
			<div className="h-full overflow-auto px-8 ">
				<div className="grid grid-cols-3 gap-8 mt-4">
					<div
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							updateItemStage(
								e?.dataTransfer?.getData("id"),
								"planning"
							);
						}}
						className="space-y-2"
					>
						<p className="text-lg">Planing</p>
						{PlaningItems?.map((item: any) => (
							<ReleaseCard key={`${item?.id}`} item={item} />
						))}
					</div>
					<div
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							updateItemStage(
								e?.dataTransfer?.getData("id"),
								"ongoing"
							);
						}}
						className="space-y-2"
					>
						<p className="text-lg">Ongoing</p>
						{OngoingItems?.map((item: any) => (
							<ReleaseCard key={`${item?.id}`} item={item} />
						))}
					</div>
					<div
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							updateItemStage(
								e?.dataTransfer?.getData("id"),
								"released"
							);
						}}
						className="space-y-2"
					>
						<p className="text-lg">Released</p>
						{ReleasedItems?.map((item: any) => (
							<ReleaseCard key={`${item?.id}`} item={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Releases;
