import HYSearch from "@/components/HYComponents/HYSearch";
import HYSelect from "@/components/HYComponents/HYSelect";
import EpicCreationForm from "@/components/HYComponents/forms/epic-creation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";

import {
	HiPlus,
	HiDatabase,
	HiBookOpen,
	HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
	IoIosSearch,
	IoIosFlash,
	IoMdListBox,
	IoLogoFreebsdDevil,
} from "react-icons/io";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import IssueCreationCardMini from "@/components/HYComponents/forms/issue-creation-mini";

const SprintsColumn = () => {
	const tags = Array.from({ length: 5 }).map(
		(_, i, a) => `Sprint - ${a.length - i}`
	);

	const subTasks = Array.from({ length: 3 }).map((_, i, a) => ({
		id: i + 100,
		name: `Task - ${i + 1}`,
		type: "bug",
		assignees: [],
		points: 25,
	}));

	const [searchParams, setSearchParams] = useSearchParams();
	const sprintListData = useSelector((state: any) => state?.GetSprints);

	const sprintItems = sprintListData?.data?.items;

	const dispatch = useDispatch();

	const getSprints = (prams?: string) => {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ sprints: Urls.sprints + query }));
	};

	useEffect(() => {
		getSprints();
	}, []);

	const logoColors = [
		"text-[#71A4FF]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
		"text-[#FF6481]",
	];

	const badgeColor = ["bg-[#56972E]", "bg-[#DF8430]", "bg-[#5F5F5F]"];

	return (
		<div className="flex flex-col h-full px-6">
			<div className="flex items-center justify-between w-full">
				<div className="mr-3">Sprints</div>
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
				</div>
				<div className="">
					<HYSelect
						id=""
						label="Status"
						options={["all", "ongoing", "retro", "backlog"]}
					/>
				</div>
			</div>
			<div>
				{sprintItems?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-200px)] w-full">
						<div className="py-4 pr-4">
							{sprintItems.map((sprint, i) => (
								<>
									<div
										key={sprint.id}
										className="flex gap-3 justify-between items-center text-sm border  px-3 rounded hover:border-primary cursor-pointer"
									>
										<Accordion
											type="single"
											collapsible
											className="w-full border-0 p-0 m-0"
										>
											<AccordionItem
												value="item-1"
												className="border-0 p-0 m-0"
											>
												<div className="flex justify-between w-full items-center ">
													<div className="flex gap-1 items-center">
														<IoIosFlash
															className={`w-5 text-[#707173]`}
														/>
														<div className="">
															{sprint.name}
														</div>
													</div>
													<div>
														<div
															className={`${
																badgeColor[
																	i % 3
																]
															}  text-white px-3 py-0.5 rounded-full text-xs`}
														>
															Ongoing
														</div>
													</div>
													<div className="flex gap-2 items-center text-[#737377]">
														<div className="text-xs">
															4 Apr - 12 Apr
														</div>
														<div className="flex gap-1 items-center">
															<HiDatabase className="" />{" "}
															{(i + (1 % 6)) * 10}
														</div>
														<div>
															<AccordionTrigger></AccordionTrigger>
															{/* <HiChevronRight className="w-5 h-5" /> */}
														</div>
													</div>
												</div>
												<AccordionContent className="flex flex-col gap-2">
													{sprint.issues?.map(
														(itm, i2) => {
															return (
																<div
																	draggable
																	key={itm}
																	className="flex gap-3 justify-between items-center text-sm border border-[#696B70] hover:border-[#696B70]/50 px-3 py-3 rounded cursor-pointer"
																>
																	<div className="flex gap-1 items-center">
																		<HiBookOpen
																			className={`w-5 ${
																				logoColors[
																					i2 %
																						6
																				]
																			}`}
																		/>
																		<div className="text-[#737377]">
																			{
																				sprint.name
																			}
																		</div>
																	</div>
																	<div className="flex gap-4 items-center text-[#737377]">
																		<div className="">
																			<Avatar className="h-5 w-5">
																				<AvatarImage
																					src="https://github.com/shadcn.png"
																					alt="@shadcn"
																				/>
																				<AvatarFallback>
																					user
																				</AvatarFallback>
																			</Avatar>
																		</div>
																		{i %
																			2 ===
																			0 && (
																			<HiOutlineArrowNarrowUp className="text-red-500" />
																		)}
																		<PiLinkSimpleHorizontalBold />
																		<div className="flex gap-1 items-center">
																			<HiDatabase className="" />{" "}
																			{i2 +
																				(1 %
																					6)}
																		</div>
																	</div>
																</div>
															);
														}
													)}

													<IssueCreationCardMini />
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</div>
									<Separator className="my-2" />
								</>
							))}
						</div>
					</ScrollArea>
				)}
				{sprintItems?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-200px)] items-center mt-[30px]">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								3
							</div>
							<div className="text-primary font-bold text-xl">
								Add sprints here
							</div>
							<div className="w-2/3 text-center text-[#F8F8F8]">
								Sprints are week long and help you get things
								done
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

export default SprintsColumn;
