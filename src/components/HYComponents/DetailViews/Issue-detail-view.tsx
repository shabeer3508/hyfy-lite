import HYAvatar from "../HYAvatar";
import HYSelect from "../HYSelect";
import { HiDatabase } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { HiDotsVertical } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const IssueDetailView = ({ data }: { data: any }) => {
	return (
		<div>
			<div className="flex gap-2 text-xl">
				{data?.type === "story" && (
					<img
						src="/story_icon.svg"
						alt="Project"
						height={25}
						width={25}
					/>
				)}

				{data?.type === "task" && (
					<img
						src="/task_icon.svg"
						alt="Project"
						height={25}
						width={25}
					/>
				)}

				{data?.type === "bug" && (
					<img
						src="/bug_icon.svg"
						alt="Project"
						height={25}
						width={25}
					/>
				)}
				{data?.name}
			</div>
			<div className="grid grid-cols-6 pt-5">
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Epic</div>
						<div className=" flex flex-1 items-center">Epic 1</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Sprint</div>
						<div className=" flex flex-1 items-center">
							Sprint 1
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">
							Estimation Points
						</div>
						<div className=" flex flex-1 items-center gap-2">
							<HiDatabase />
							{data?.points}
						</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Hours</div>
						<div className=" flex flex-1 items-center">5 </div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Dependency</div>
						<div className=" flex flex-1 items-center">Story 5</div>
					</div>
					<Separator orientation="vertical" />
				</div>
				<div className="flex justify-between pr-3">
					<div className="flex flex-col">
						<div className="text-xs text-[#9499A5]">Status</div>
						<HYSelect
							id={"status"}
							className="my-2"
							field={{ onChange: () => { }, value: data?.status }}
							options={[
								"todo",
								"ongoing",
								"pending",
								"done",
								"backlog",
							]}
						/>
					</div>
				</div>
			</div>
			<Separator className="mt-5" />
			<ScrollArea className="max-h-[60vh] h-full pr-5 ">
				<div className="flex justify-between mt-5 items-center">
					<div className="flex flex-col gap-2">
						<div className="text-xs text-[#9499A5]">
							Assigned to
						</div>
						<div className="flex gap-2 ">
							<div className="flex gap-2 items-center">
								<HYAvatar
									url="https://github.com/shadcn.png"
									name={"Jhon"}
								/>
								<a className="text-xs">{"Jhon"}</a>
							</div>
						</div>
					</div>
					<div>
						<Button
							className="border-primary text-primary"
							variant="outline"
							type="button"
						>
							Manage
						</Button>
					</div>
				</div>
				<Separator className="my-5" />
				<div className="text-xs space-y-4">
					<div className="space-y-1">
						<div className="text-[#9499A5]">Description</div>
						<div>{data?.description}</div>
					</div>
					<div className="space-y-2">
						<div className="text-[#9499A5]">Sub Tasks</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Checkbox /> Kill Bugs 1
							</div>
							<div className="flex items-center gap-2">
								<Checkbox /> Kill Bugs 2
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-5" />
				<div className="space-y-3">
					<div className="space-y-2">
						<div>Comments</div>
						<div className="flex gap-3">
							<Input
								className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
								placeholder="Add Comment"
							/>
							<Button
								className="border-primary text-primary"
								variant="outline"
								type="button"
							>
								Comment
							</Button>
						</div>
					</div>
					<div className="space-y-3">
						<CommentCard />
						<CommentCard />
						<CommentCard />
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default IssueDetailView;

export const CommentCard = () => {
	return (
		<Card>
			<CardContent className="p-3 text-xs">
				<div className="flex justify-between items-center mb-3">
					<div className="flex gap-2">
						<HYAvatar
							url="https://github.com/shadcn.png"
							name={"Jhon"}
						/>
						<div className="flex flex-col">
							<a className="text-xs">{"Jhon"}</a>
							<a className="text-xs text-[#9499A5]">
								{"Flutter Dev"}
							</a>
						</div>
					</div>
					<div>
						<HiDotsVertical />
					</div>
				</div>
				<div>Added the feature but faced issues...</div>
				<div className="text-[#9499A5]">On 24/10/2023</div>
			</CardContent>
		</Card>
	);
};
