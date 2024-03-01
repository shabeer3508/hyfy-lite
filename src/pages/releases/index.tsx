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
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { HiViewBoards } from "react-icons/hi";
import { BiDirections } from "react-icons/bi";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";



const Releases = () => {
	const dispatch = useDispatch();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const itemsList = useSelector((state: any) => state?.[releaseReducerName]);
	const releaseItems = itemsList?.data?.items

	/*  ######################################################################################## */

	const getReleases = (prams?: string) => {
		let query = `?filter=project_id="${appProfileInfo.project_id}"`;
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
	}, [appProfileInfo.project_id]);

	/*  ######################################################################################## */

	return (
		<div className=" flex flex-col h-full">
			<Tabs defaultValue="board" className=" px-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-8">
						<div className="text-xl">Releases</div>
						<TabsList className="hidden">
							<TabsTrigger value="board" className="flex gap-1">
								<HiViewBoards className="w-4 h-4" />
								Board
							</TabsTrigger>
							<TabsTrigger value="timeline" className="flex gap-1">
								<BiDirections className="w-4 h-4" />
								Timeline
							</TabsTrigger>
						</TabsList>
					</div>
					<ReleaseCreationForm>
						<Button className="text-white">Add Release</Button>
					</ReleaseCreationForm>
				</div>
				<TabsContent value="board">
					<div className="flex gap-2">
						<HYCombobox defaultValue="recent" options={[{ label: "Recent", value: "recent" }, { label: "Old", value: "old" }]} />
						<HYCombobox defaultValue="hp" options={[{ label: "Highest Points", value: "hp" }, { label: "Lowest Points", value: "lp" }]} />

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
								<p className="text-base">Planing</p>
								<ScrollArea className="max-h-[calc(100vh-260px)] h-[calc(100vh-260px)]">
									<div className="space-y-3 pr-5">
										{getReleasesByStatus("planning")?.map((item: any) => (
											<ReleaseCard key={`${item?._id}`} item={item} />
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
								<p className="text-base">Ongoing</p>
								<ScrollArea className="max-h-[calc(100vh-260px)] h-[calc(100vh-260px)]">
									<div className="space-y-3 pr-5">
										{getReleasesByStatus("ongoing")?.map((item: any) => (
											<ReleaseCard key={`${item?._id}`} item={item} />
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
								<p className="text-base">Released</p>
								<ScrollArea className="max-h-[calc(100vh-260px)] h-[calc(100vh-260px)]">
									<div className="space-y-3 pr-5">
										{getReleasesByStatus("released")?.map((item: any) => (
											<ReleaseCard key={`${item?._id}`} item={item} />
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
