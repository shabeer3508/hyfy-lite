import { useEffect } from "react";
import ReleaseCard from "./ReleaseCard";
import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReleaseCreationForm from "@/components/HYComponents/forms/release-creation";
import {
	getAction,
	patchAction,
	reducerNameFromUrl,
} from "@/redux/actions/AppActions";



const Releases = () => {
	const dispatch = useDispatch();

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const itemsList = useSelector((state: any) => state?.[releaseReducerName]);
	const releaseItems = itemsList?.data?.items

	/*  ######################################################################################## */

	const getReleases = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ release: Urls.release + query }));
	}

	const updateItemStatus = async (id: string, stage: string) => {
		const resp = (await dispatch(patchAction({ release: Urls.release }, { status: stage }, id))) as any;
		const success = resp.payload.status == 200;
		if (success) {
			getReleases();
		}
	}

	const getReleasesByStatus = (status: "planning" | "ongoing" | "released") => releaseItems?.filter((item: any) => item?.status === status);

	/*  ######################################################################################## */

	useEffect(() => {
		getReleases();
	}, []);

	/*  ######################################################################################## */

	return (
		<div className=" flex flex-col h-full">
			<Tabs defaultValue="board" className=" px-6">
				<div className="flex items-center justify-between my-4">
					<div className="flex items-center gap-5">
						<div className="text-xl">Releases</div>
						<TabsList>
							<TabsTrigger value="board">Board</TabsTrigger>
							<TabsTrigger value="timeline">Timeline</TabsTrigger>
						</TabsList>
					</div>
					<ReleaseCreationForm>
						<Button className="text-white">Add Release</Button>
					</ReleaseCreationForm>
				</div>
				<TabsContent value="board">
					<div className="flex gap-2">
						<HYSelect
							id=""
							options={["Recent", "Old"]}
						/>
						<HYSelect
							id=""
							options={["done", "in-progress", "pending", "open"]}
						/>
						<HYSearch />
					</div>
					<div className="h-full">
						<div className="grid grid-cols-3 gap-6 mt-4">
							<div
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "planning");
								}}
								className="space-y-2"
							>
								<p className="text-lg">Planing</p>
								<ScrollArea className="max-h-[calc(100vh-260px)] h-full">
									<div className="space-y-3 pr-5">
										{getReleasesByStatus("planning")?.map((item: any) => (
											<ReleaseCard key={`${item?.id}`} item={item} />
										))}
									</div>
								</ScrollArea>
							</div>
							<div
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "ongoing");
								}}
								className="space-y-2"
							>
								<p className="text-lg">Ongoing</p>
								<ScrollArea className="max-h-[calc(100vh-260px)] h-full">
									<div className="space-y-3 pr-5">
										{getReleasesByStatus("ongoing")?.map((item: any) => (
											<ReleaseCard key={`${item?.id}`} item={item} />
										))}
									</div>
								</ScrollArea>
							</div>
							<div
								onDragOver={(e) => e.preventDefault()}
								onDrop={(e) => {
									e.preventDefault();
									updateItemStatus(e?.dataTransfer?.getData("id"), "released");
								}}
								className="space-y-2"
							>
								<p className="text-lg">Released</p>
								<ScrollArea className="max-h-[calc(100vh-260px)] h-full">
									<div className="space-y-3 pr-5">
										{getReleasesByStatus("released")?.map((item: any) => (
											<ReleaseCard key={`${item?.id}`} item={item} />
										))}
									</div>
								</ScrollArea>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Releases;
