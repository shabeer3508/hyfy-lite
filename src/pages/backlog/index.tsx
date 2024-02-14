import { Input } from "@/components/ui/input";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	IoIosSearch,
	IoLogoFreebsdDevil,
	IoMdListBox,
	IoIosFlash,
} from "react-icons/io";
import {
	HiPlus,
	HiFilter,
	HiOutlineDotsVertical,
	HiDatabase,
	HiOutlineArrowNarrowUp,
	HiChevronRight,
} from "react-icons/hi";
import { HiOutlineArrowsUpDown, HiBookOpen } from "react-icons/hi2";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const Backlog = () => {
	return (
		<div className="dark:text-foreground h-screen">
			<ResizablePanelGroup
				direction="horizontal"
				className=" rounded-lg "
			>
				<ResizablePanel defaultSize={30} maxSize={30} minSize={20}>
					<EpicsColumn />
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={70}>
					<ResizablePanelGroup
						direction="horizontal"
						className=" rounded-lg "
					>
						<ResizablePanel defaultSize={50}>
							<BacklogColumn />
						</ResizablePanel>
						{/* <ResizableHandle /> */}
						<ResizablePanel defaultSize={50}>
							<SprintsColumn />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default Backlog;

const EpicsColumn = () => {
	const tags = Array.from({ length: 50 }).map(
		(_, i, a) => `Epic - ${a.length - i}`
	);

	const logoColors = [
		"#71A4FF",
		"#4C4878",
		"#A4599A",
		"#E2A766",
		"#389C98",
		"#FF6481",
	];

	return (
		<div className="flex flex-col h-full px-6">
			<div className="flex items-center justify-between w-full">
				<div className="mr-3">Epics</div>
				<div className="flex gap-3">
					<div className="flex items-center bg-background pr-3 max-w-52 rounded border">
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
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10  cursor-pointer">
						<HiFilter className="h-5 w-5 text-[#707173]" />
					</div>
				</div>
				<div className="">
					<Select>
						<SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
							<div className="whitespace-nowrap text-[#9499A5]">
								Release
							</div>
							<SelectValue placeholder="" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="r-1">Release-1</SelectItem>
							<SelectItem value="r-2">Release-2</SelectItem>
							<SelectItem value="r-3">Release-3</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex items-center border-b h-14 w-full">
				<Checkbox id="terms" />
				<label
					htmlFor="terms"
					className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mx-2 cursor-pointer select-none"
				>
					No Epic
				</label>
			</div>
			<div className="">
				<ScrollArea className="h-[calc(100vh-250px)] w-full">
					<div className="py-4 pr-4">
						{tags.map((tag, i) => (
							<>
								<div
									key={tag}
									className="flex gap-3 justify-between items-center text-sm border px-3 py-3 rounded hover:border-primary cursor-pointer"
								>
									<HiBookOpen
										className={`w-5 text-[${
											logoColors[i % 6]
										}]`}
									/>
									<div>{tag}</div>
									<div className="text-[#737377]">
										Release {i + 1}
									</div>
									<div className=" text-[#737377]">|</div>
									<div className="text-[#737377]">
										{i + 1} Stories
									</div>
									<HiOutlineDotsVertical className="text-[#737377]" />
								</div>
								<Separator className="my-2" />
							</>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

const BacklogColumn = () => {
	const tags = Array.from({ length: 10 }).map(
		(_, i, a) => `Story - ${a.length - i}`
	);

	const logoColors = [
		"#71A4FF",
		"#4C4878",
		"#A4599A",
		"#E2A766",
		"#389C98",
		"#FF6481",
	];
	return (
		<div className="flex flex-col h-full  px-6 border-r">
			<div className="flex items-center justify-between w-full">
				<div className="mr-3">Backlog</div>
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
					<div className="flex justify-center items-center border p-2 rounded aspect-square h-10 w-10  cursor-pointer">
						<HiFilter className="h-5 w-5 text-[#707173]" />
					</div>
				</div>
				<div className="">
					<Select>
						<SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0">
							<div className="whitespace-nowrap text-[#9499A5]">
								Assigned to
							</div>
							<SelectValue placeholder="" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="zahid">Zahid</SelectItem>
							<SelectItem value="saranya">Saranya</SelectItem>
							<SelectItem value="roshan">Roshan</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex items-center border-b h-14 w-full">
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
			</div>

			<div className="">
				<ScrollArea className="h-[calc(100vh-250px)] w-full">
					<div className="py-4 pr-4">
						{tags.map((tag, i) => (
							<>
								<div
									key={tag}
									className="flex gap-3 justify-between items-center text-sm border px-3 py-3 rounded hover:border-primary cursor-pointer"
								>
									<div className="flex gap-1 items-center">
										<HiBookOpen
											className={`w-5 text-[${
												logoColors[i % 6]
											}]`}
										/>
										<div className="text-[#737377]">
											{tag}
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
													CN
												</AvatarFallback>
											</Avatar>
										</div>
										{i % 2 === 0 && (
											<HiOutlineArrowNarrowUp className="text-red-500" />
										)}
										<PiLinkSimpleHorizontalBold />
										<div className="flex gap-1 items-center">
											<HiDatabase className="" /> {i % 6}
										</div>
									</div>
								</div>
								<Separator className="my-2" />
							</>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

const SprintsColumn = () => {
	const tags = Array.from({ length: 5 }).map(
		(_, i, a) => `Sprint - ${a.length - i}`
	);

	const logoColors = [
		"#71A4FF",
		"#4C4878",
		"#A4599A",
		"#E2A766",
		"#389C98",
		"#FF6481",
	];

	const badgeColor = ["#56972E", "#DF8430", "#5F5F5F"];

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
				<ScrollArea className="h-[calc(100vh-250px)] w-full">
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
													<Badge
														className={`bg-[${
															badgeColor[i % 3]
														}] hover:bg-[${
															badgeColor[i % 3]
														}]  text-white`}
													>
														Badge
													</Badge>
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
											<AccordionContent>
												Yes. It adheres to the WAI-ARIA
												design pattern.
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
								<Separator className="my-2" />
							</>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
