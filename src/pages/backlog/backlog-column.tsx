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
	HiFilter,
	HiBookOpen,
	HiOutlineArrowNarrowUp,
	HiDatabase,
} from "react-icons/hi";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
	IoIosSearch,
	IoIosFlash,
	IoMdListBox,
	IoLogoFreebsdDevil,
} from "react-icons/io";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";

const BacklogColumn = () => {
	const tags = Array.from({ length: 30 }).map(
		(_, i, a) => `Story - ${a.length - i}`
	);

	const logoColors = [
		"text-[#71A4FF]",
		"text-[#4C4878]",
		"text-[#A4599A]",
		"text-[#E2A766]",
		"text-[#389C98]",
		"text-[#FF6481]",
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
				{tags?.length > 0 && (
					<ScrollArea className="h-[calc(100vh-250px)] w-full">
						<div className="py-4 pr-4">
							{tags.map((tag, i) => (
								<>
									<div
										key={tag}
										className="flex gap-3 justify-between items-center text-sm border px-3 py-3 rounded border-[#696B70] hover:border-primary cursor-pointer"
									>
										<div className="flex gap-1 items-center">
											<HiBookOpen
												className={`w-5 ${
													logoColors[i % 6]
												}`}
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
														user
													</AvatarFallback>
												</Avatar>
											</div>
											{i % 2 === 0 && (
												<HiOutlineArrowNarrowUp className="text-red-500" />
											)}
											<PiLinkSimpleHorizontalBold />
											<div className="flex gap-1 items-center">
												<HiDatabase className="" />{" "}
												{i % 6}
											</div>
										</div>
									</div>
									<Separator className="my-2" />
								</>
							))}
						</div>
					</ScrollArea>
				)}

				{tags?.length === 0 && (
					<div className="flex justify-center h-[calc(100vh-250px)] items-center ">
						<div className="flex gap-5 flex-col justify-center items-center">
							<div className="border rounded-full aspect-square h-10 w-10 flex justify-center items-center border-[#707173] text-[#707173]">
								2
							</div>
							<div className="text-primary font-bold text-xl">
								Add your stories here
							</div>
							<div className="w-2/3 text-center text-[#F8F8F8]">
								You can add stories here and then drag ‘n’ drop
								them to epics or stories.
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

export default BacklogColumn;
