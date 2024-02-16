import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import EpicCreationForm from "@/components/HYComponents/forms/epic-creation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getAction } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { Separator } from "@radix-ui/react-select";
import { useEffect } from "react";

import {
	HiPlus,
	HiFilter,
	HiBookOpen,
	HiOutlineDotsVertical,
} from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const EpicsColumn = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const epicsListData = useSelector((state: any) => state?.GetEpics);

	const epicItems = epicsListData?.data?.items;

	const dispatch = useDispatch();

	const getEpics = (prams?: string) => {
		let query = "?expand=releases,project_id";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ epics: Urls.epics + query }));
	};

	useEffect(() => {
		getEpics();
	}, []);

	const logoColors = [
		"text-[#71A4FF]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
		"text-[#FF6481]",
	];

	return (
		<div className="flex flex-col h-full px-6">
			<div className="flex items-center justify-between w-full">
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
			<div className="flex border-b w-full justify-between py-3">
				<div className="flex gap-3">
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 cursor-pointer">
						<HiOutlineArrowsUpDown className="h-8 w-8 text-[#707173]" />
					</div>
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10  cursor-pointer">
						<HiFilter className="h-5 w-5 text-[#707173]" />
					</div>
				</div>
				<div className="">
					<HYSelect
						id=""
						label="Release"
						options={["release-1", "release-2", "release-3"]}
					/>
				</div>
			</div>
			<div className="flex items-center border-b h-14 w-full">
				<Checkbox
					id="terms"
					checked={!searchParams.get("selected_epic")}
					onCheckedChange={() => {
						setSearchParams({});
					}}
				/>
				<label
					htmlFor="terms"
					className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-2 cursor-pointer select-none"
				>
					No Epic
				</label>
			</div>
			<div className="">
				{epicItems?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-250px)] w-full">
						<div className="py-4 pr-4">
							{epicItems.map((epic, i) => (
								<>
									<div
										onClick={() =>
											setSearchParams({
												selected_epic: epic?.id,
											})
										}
										key={epic?.id}
										className={`flex gap-3 justify-between items-center text-sm border px-3 py-3 rounded hover:border-primary cursor-pointer ${
											searchParams.get(
												"selected_epic"
											) === epic.id
												? "border-primary"
												: ""
										}`}
									>
										<div className="flex items-center gap-2">
											<HiBookOpen
												className={`w-5 ${
													logoColors[i % 6]
												}`}
											/>
											<div>{epic?.name}</div>
										</div>
										<div className="text-[#737377]">
											{epic?.expand?.releases?.name}
										</div>
										<div className=" text-[#737377]">|</div>
										<div className="text-[#737377]">
											{epic?.issues?.length} Issues
										</div>
										<HiOutlineDotsVertical className="text-[#737377]" />
									</div>
									<Separator className="my-2" />
								</>
							))}
						</div>
					</ScrollArea>
				)}
				{epicItems?.length === 0 && (
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
							<Button
								variant="outline"
								className="flex gap-3 border-primary text-primary hover:text-primary"
							>
								<HiPlus />
								Add
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EpicsColumn;
