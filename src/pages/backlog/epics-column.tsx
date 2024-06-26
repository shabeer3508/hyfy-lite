import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
	HiPlus,
	HiFilter,
	HiBookOpen,
	HiOutlineDotsVertical,
} from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EpicDetailView from "../epics/epic-detail-view";
import { EpicTypes, ReleaseTypes } from "@/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import HYDialog from "@/components/hy-components/HYDialog";
import HYDropDown from "@/components/hy-components/HYDropDown";
import EpicCreationForm from "@/pages/epics/forms/epic-creation";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import HYDropdownMenuCheckbox from "@/components/hy-components/HYCheckboxDropDown";

const EpicsColumn = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

	const epicReducerName = reducerNameFromUrl("epic", "GET");
	const epicsListData = useSelector((state: any) => state?.[epicReducerName]);
	const epicItems = epicsListData?.data?.items as EpicTypes[];

	const releaseReducerName = reducerNameFromUrl("release", "GET");
	const releaseList = useSelector((state: any) => state?.[releaseReducerName])?.data?.items as ReleaseTypes[];

	/*  ######################################################################################## */

	const getEpics = (prams?: string) => {
		let query = `?perPage=300
			&expand=release_id,project_id
			&filter=project_id=${appProfileInfo.project_id}`;

		if (prams) { query = query + prams }
		dispatch(getAction({ epic: Urls.epic + query }));
	};

	const getReleases = (prams?: string) => {
		let query = `?perPage=300
			&filter=project_id=${appProfileInfo.project_id}`;

		if (prams) { query = query + prams }
		dispatch(getAction({ release: Urls.release + query }));
	};

	/*  ######################################################################################## */

	const filteredEpicsItems = epicItems?.filter(epic => epic.project_id === appProfileInfo?.project_id)

	const releaseOptions =
		releaseList?.map((relse) => ({
			value: relse?._id,
			label: relse?.name,
		})) ?? [];

	const sortoptions = [
		{ label: "New", action: () => { } },
		{ label: "Oldest", action: () => { } },
		{ label: "Recently Edited", action: () => { } },
		{ label: "A-Z", action: () => { } },
		{ label: "Z-A", action: () => { } },
	];

	/*  ######################################################################################## */

	useEffect(() => {
		getReleases();
		getEpics();
	}, [appProfileInfo?.project_id]);

	/*  ######################################################################################## */

	return (
		<div className="flex flex-col h-full border-r ">
			<div className="flex items-center justify-between w-full px-6">
				<div className="mr-3">Epics</div>
				<div className="flex gap-3">
					<HYSearch />
					<EpicCreationForm>
						<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 border-primary text-primary cursor-pointer">
							<HiPlus className="h-8 w-8 " />
						</div>
					</EpicCreationForm>
				</div>
			</div>
			<div className="w-full px-6">
				<div className="flex justify-between border-b py-3">
					<div className="flex gap-3">
						<HYDropDown options={sortoptions}>
							<Button
								variant="ghost"
								size="icon"
								className="border aspect-square h-10 w-10"
							>
								<HiOutlineArrowsUpDown className="h-5 w-5 text-[#707173]" />
							</Button>
						</HYDropDown>
						<HYDropdownMenuCheckbox>
							<Button
								variant="ghost"
								size="icon"
								className="border aspect-square h-10 w-10"
							>
								<HiFilter className="h-5 w-5 text-[#707173]" />
							</Button>
						</HYDropdownMenuCheckbox>
					</div>
					<div className="">
						<HYCombobox
							label="Release "
							buttonClassName="max-w-[200px]"
							options={[{ label: "All", value: "all" }, ...releaseOptions]}
						/>
					</div>
				</div>
			</div>
			<div className="w-full px-6">
				<div className="flex items-center border-b h-14" >
					<Checkbox
						id="terms"
						checked={!searchParams.get("selected_epic")}
						onCheckedChange={() => setSearchParams({})}
					/>
					<label
						htmlFor="terms"
						className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-2 cursor-pointer select-none"
					>
						No Epic
					</label>
				</div>
			</div>
			<div className="">
				{filteredEpicsItems?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-250px)] w-full">
						<div className="py-4 px-6 space-y-2">
							{filteredEpicsItems.map((epic, i) => (
								<EpicCard epic={epic} key={epic?._id} index={i} />
							))}
						</div>
					</ScrollArea>
				)}
				{filteredEpicsItems?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-250px)] items-center ">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								1
							</div>
							<div className="text-primary font-bold text-xl">
								Add epics here
							</div>
							<div className="w-2/3 text-center text-[#F8F8F8]">
								Epics will be milestones that help you manage
								your project
							</div>
							<EpicCreationForm>
								<Button
									variant="outline"
									className="flex gap-3 border-primary text-primary hover:text-primary"
								>
									<HiPlus />
									Add
								</Button>
							</EpicCreationForm>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EpicsColumn;

const EpicCard = ({ epic, index }: { epic: EpicTypes; index: number }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const logoColors = [
		"text-[#71A4FF]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
		"text-[#FF6481]",
	];


	return (
		<Card
			key={epic?._id}
			onClick={() => setSearchParams({ selected_epic: epic?._id })}
			className={`dark:bg-[#151619] border  rounded card-gradient cursor-pointer ${searchParams.get("selected_epic") === epic?._id ? "border-primary" : ""}`}
		>
			<HYDialog
				className="max-w-6xl dark:bg-card"
				content={<EpicDetailView data={epic} />}
			>
				<div className="flex gap-3 justify-between items-center text-sm px-3 py-3">
					<div className="flex items-center gap-2">
						<HiBookOpen
							className={`w-5 ${logoColors[index % 6]}`}
						/>
						<div>{epic?.name}</div>
					</div>
					<div className="text-[#737377]">
						{typeof epic?.release_id !== "string" && epic?.release_id?.[0]?.name}
					</div>
					<div className=" text-[#737377]">|</div>
					<div className="text-[#737377]">
						{/* {epic?.issues?.length} Issues */}
					</div>
					<HiOutlineDotsVertical className="text-[#737377]" />
				</div>
			</HYDialog>
		</Card>
	);
};
