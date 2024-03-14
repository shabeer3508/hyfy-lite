
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import HYDialog from "@/components/hy-components/HYDialog";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IssueDetailView from "@/components/hy-components/detail-views/Issue-detail-view";
import { HiOutlineArrowNarrowUp, HiDatabase } from "react-icons/hi";



interface IssueCardProps {
    issue: any;
    index: number;
    showSelection?: boolean;
    handleSelection?: (issueId: string, isChecked: boolean) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, index, showSelection = false, handleSelection }) => {

    const handleIssueSelection = (checked) => {
        handleSelection?.(issue?._id, checked);
    }

    return (
        <Card
            draggable
            key={issue?._id}
            onDragStart={(e) => e.dataTransfer.setData("id", issue?._id)}
            className=" border rounded card-gradient cursor-pointer dark:bg-[#151619]"
        >
            <HYDialog
                className="max-w-6xl"
                content={<IssueDetailView data={issue} />}
            >
                <div className={`flex gap-3 justify-between items-center text-sm px-3 ${showSelection ? "py-1" : "py-2.5"}`}>
                    <div className="flex gap-1 items-center">
                        {showSelection &&
                            <div className="mr-2 flex items-center p-2" onClick={e => e.stopPropagation()} >
                                <Checkbox className="rounded dark:text-white" onCheckedChange={handleIssueSelection} />
                            </div>
                        }

                        {issue.type === "story" && (
                            <img src="/story_icon.svg" alt="Project" />
                        )}

                        {issue.type === "task" && (
                            <img src="/task_icon.svg" alt="Project" />
                        )}

                        {issue.type === "bug" && (
                            <img src="/bug_icon.svg" alt="Project" />
                        )}

                        <div className="text-[#737377]">{issue?.name}</div>
                        <div className="bg-[#4C4878] text-white text-[10px] px-1 rounded mx-1">{issue?.epic_id}</div>
                    </div>
                    <div className="flex gap-4 items-center text-[#737377]">
                        <div className="">
                            <Avatar className="h-5 w-5">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>user</AvatarFallback>
                            </Avatar>
                        </div>
                        {index % 2 === 0 && (
                            <HiOutlineArrowNarrowUp className="text-red-500" />
                        )}
                        <PiLinkSimpleHorizontalBold />
                        <div className="flex gap-1 items-center">
                            <HiDatabase className="" /> {issue?.points}
                        </div>
                    </div>
                </div>
            </HYDialog>
        </Card>
    );
};