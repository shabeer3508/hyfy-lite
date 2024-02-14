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
import { Separator } from "@radix-ui/react-select";

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
					<div className="flex items-center bg-background pr-3 rounded border">
						<Input
							className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
							placeholder="Search"
						/>
						<IoIosSearch />
					</div>
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 border-primary text-primary cursor-pointer">
						<HiPlus className="h-8 w-8 " />
					</div>
				</div>
			</div>
			<div className="flex border-b w-full justify-between py-3">
				<div className="flex gap-3">
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10 cursor-pointer">
						<HiOutlineArrowsUpDown className="h-8 w-8 text-[#707173]" />
					</div>
				</div>
				<div className="">
					<Select>
						<SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
							<div className="whitespace-nowrap text-[#9499A5]">
								Status
							</div>
							<SelectValue placeholder="" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="ongoing">Ongoing</SelectItem>
							<SelectItem value="retro">Retro</SelectItem>
							<SelectItem value="backlog">Backlog</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div>
				{tags?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-200px)] w-full">
						<div className="py-4 pr-4">
							{tags.map((tag, i) => (
								<>
									<div
										key={tag}
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
															{tag}
														</div>
													</div>
													<div>
														<div
															className={`${
																badgeColor[
																	i % 3
																]
															}  text-white px-3 rounded-full `}
														>
															Ongoing
														</div>
													</div>
													<div className="flex gap-6 items-center text-[#737377]">
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
													{subTasks?.map(
														(itm, i2) => {
															return (
																<div
																	key={tag}
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
																				tag
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

													<div className="flex items-center bg-background pr-3 w-full rounded border">
														<Input
															className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
															placeholder="Add Story"
														/>
														<Select defaultValue="story">
															<SelectTrigger className="w-[80px] focus:ring-0 focus:ring-offset-0 border-0 text-primary">
																<SelectValue placeholder="" />
															</SelectTrigger>
															<SelectContent className="w-1 ">
																<SelectItem value="story">
																	<IoIosFlash />
																</SelectItem>
																<SelectItem value="task">
																	<IoMdListBox />
																</SelectItem>
																<SelectItem value="bug">
																	<IoLogoFreebsdDevil />
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
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
				{tags?.length === 0 && (
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
