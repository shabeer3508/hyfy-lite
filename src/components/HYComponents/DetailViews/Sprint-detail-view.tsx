
import { useEffect } from "react";
import HYAvatar from "../HYAvatar";
import HYSearch from "../HYSearch";
import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { HiCalendarDays } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";
import IssueMiniCard from "@/pages/sprints/issueMiniCard";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const SprintDetailView = ({ data }: { data: any }) => {
    const dispatch = useDispatch();

    const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

    const issuesReducerName = reducerNameFromUrl("issues", "GET");
    const issueListData = useSelector((state: any) => state?.[issuesReducerName]);
    const issueListItems = issueListData?.data?.items;

    /*  ######################################################################################## */

    const getIssues = (prams?: string) => {
        let query = "";
        if (prams) {
            query = query + prams;
        }
        dispatch(getAction({ issues: Urls.issues + query }));
    };


    const filteredIssues = issueListItems?.filter(
        (sprnt) => sprnt?.sprint === data?.id
    );


    const findIssueCount = (type: "bug" | "story" | "task") => {
        return filteredIssues?.filter((issue) => issue.type === type).length;
    };

    /*  ######################################################################################## */

    useEffect(() => {
        getIssues();
    }, []);

    /*  ######################################################################################## */

    return (
        <div>
            <div>{data?.name}</div>
            <div className="flex justify-between py-3 text-xs items-center">
                <div className="flex gap-2 items-center">
                    <HiCalendarDays className="text-[#707173]" />{data?.start_date && formatter.format(new Date(data?.start_date))} to
                    <HiCalendarDays className="text-[#707173]" />{data?.end_date && formatter.format(new Date(data?.end_date))}
                </div>
                <div>
                    {data?.is_started ? <Button variant="destructive" className="w-[100px] text-white">Stop</Button> : <Button className="w-[100px] text-white">Start</Button>}
                </div>
            </div>
            <div className="grid grid-cols-5 pb-5">
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Sprint Created By</div>
                        <div className=" flex flex-1 items-center">
                            <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={"Jhon"}
                            />
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                </div>
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Assigned to</div>
                        <div className="flex flex-1 items-center">
                            <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={"Jhon"}
                            />
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                </div>
                <div className="flex pr-3 col-span-3">
                    <div className="flex flex-col">
                        <div className="text-xs text-[#9499A5]">
                            Description
                        </div>
                        <div className="flex flex-1 items-center">
                            {data?.description}
                        </div>
                    </div>
                </div>


            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-center my-2">
                <div className="flex  gap-3">
                    <div>Stories</div>
                    <div className="flex gap-3 text-xs items-center">
                        (
                        <div className="flex gap-1">
                            <img src="/story_icon.svg" alt="Project" />
                            <span>{findIssueCount("story")}</span>
                        </div>
                        <div className="flex gap-1">
                            <img src="/task_icon.svg" alt="Project" />
                            <span>{findIssueCount("task")}</span>
                        </div>
                        <div className="flex gap-1">
                            <img src="/bug_icon.svg" alt="Project" />
                            <span>{findIssueCount("bug")}</span>
                        </div>
                        )
                    </div>
                </div>
                <div className="pr-5">
                    <HYSearch />
                </div>
            </div>

            <div className="grid grid-cols-5 my-4 text-[#737377] text-xs">
                <div>Item</div>
                <div>Points</div>
                <div>Hours</div>
                <div>Status</div>
                <div>Assigned to</div>
            </div>

            <ScrollArea className="max-h-[40vh] h-auto w-full pr-5">
                <div className="space-y-2 text-xs">
                    {filteredIssues?.map((issue) => {
                        return <IssueMiniCard data={issue} key={issue?.id} />;
                    })}
                </div>
            </ScrollArea>

        </div>
    );
};

export default SprintDetailView;
