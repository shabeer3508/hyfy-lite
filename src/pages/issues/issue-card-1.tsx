import { useSelector } from "react-redux";
import { HiBookOpen } from "react-icons/hi2";
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import { HiOutlineArrowNarrowUp, HiDatabase, HiOutlineUser } from "react-icons/hi";

import { Card } from "@/components/ui/card";
import IssueDetailView from "./issue-detail-view";
import { Checkbox } from "@/components/ui/checkbox";
import { IssueTypes, UsersTypes } from "@/interfaces";
import HYDialog from "@/components/hy-components/HYDialog";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { reducerNameFromUrl } from "@/redux/actions/AppActions";

interface IssueCardProps {
    issue: IssueTypes;
    index: number;
    showSelection?: boolean;
    showEpicName?: boolean;
    handleSelection?: (issueId: string, isChecked: boolean) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, index, showEpicName = true, showSelection = false, handleSelection }) => {

    const usersReducerName = reducerNameFromUrl("users", "GET");
    const usersList = useSelector((state: any) => state?.[usersReducerName]);
    const userItems = usersList?.data?.items as UsersTypes[];

    const logoColors = [
        "bg-[#71A4FF]",
        "bg-[#4C4878]",
        "bg-[#A4599A]",
        "bg-[#E2A766]",
        "bg-[#389C98]",
        "bg-[#FF6481]",
    ];

    const handleIssueSelection = (checked) => {
        handleSelection?.(issue?._id, checked);
    }

    return (
        <Card
            draggable
            key={issue?._id}
            onDragStart={(e) => {
                e.dataTransfer.setData("id", issue?._id);
                e.dataTransfer.setData("sprint_id", issue?.sprint_id);
            }}
            className=" border rounded card-gradient cursor-pointer dark:bg-[#151619]"
        >
            <HYDialog
                className="max-w-6xl  dark:bg-card"
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
                            <HiBookOpen className="w-4 h-4" />
                        )}

                        {issue.type === "task" && (
                            <img src="/task_icon.svg" alt="Project" />
                        )}

                        {issue.type === "bug" && (
                            <img src="/bug_icon.svg" alt="Project" />
                        )}

                        <div className="text-[#737377]">{issue?.name}</div>
                        {showEpicName &&
                            <div className="bg-[#4C4878] text-white text-[10px] px-1 rounded mx-1">{typeof issue?.epic_id !== "string" && issue?.epic_id?.[0]?.name}</div>
                        }
                    </div>
                    <div className="flex gap-4 items-center text-[#737377]">
                        <div className="flex">

                            {issue?.assign_to?.map((usr, i) => {
                                const currentUser = userItems?.find((u) => u?._id === usr)
                                return <HYAvatar
                                    key={usr}
                                    className="cursor-default size-6 first:ml-0 -ml-2 border text-white"
                                    name={currentUser?.user_name}
                                    color={`${logoColors[i]}`}
                                />
                            }
                            )}

                            {issue?.assign_to?.length === 0 &&
                                <div
                                    onClick={(e) => e?.stopPropagation()}
                                    title="Unassigned"
                                    className="cursor-default aspect-square border rounded-full flex justify-center items-center size-6 bg-gray-500" >
                                    <HiOutlineUser className="text-white" />
                                </div>
                            }
                        </div>

                        {issue?.priority === "critical" && <HiOutlineArrowNarrowUp title="Critical" className="text-red-500" />}

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