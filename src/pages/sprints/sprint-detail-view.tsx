
import { useEffect } from "react";
import { HiBookOpen, HiCalendarDays } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IssueTypes, SprintTypes } from "@/interfaces";
import IssueMiniCard from "@/pages/issues/issue-card-2";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYAvatar from "@/components/hy-components/HYAvatar";
import HYSearch from "@/components/hy-components/HYSearch";
import HYAlertDialog from "@/components/hy-components/HYAlertDialog";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import HYEditableDiv from "@/components/hy-components/HYEditableDiv";
import { deleteAction, getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const SprintDetailView = ({ data }: { data: SprintTypes }) => {
    const dispatch = useDispatch();

    const authInfo = useSelector((state: any) => state.UserReducer);
    const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
    const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

    const issuesReducerName = reducerNameFromUrl("issues", "GET");
    const issueListData = useSelector((state: any) => state?.[issuesReducerName]);
    const issueListItems = issueListData?.data?.items as IssueTypes[];


    const sprintMembersReducerName = reducerNameFromUrl("sprintMembers", "GET");
    const memberslist = useSelector((state: any) => state?.[sprintMembersReducerName])?.data?.data;

    /*  ######################################################################################## */

    const getIssues = () => {
        let query = `?perPage=300&filter=project_id=${appProfileInfo?.project_id}`;
        dispatch(getAction({ issues: Urls.issues + query }));
    };

    const getSprints = () => {
        let query = `?perPage=300&expand=created_by&filter=project_id=${appProfileInfo?.project_id}`;
        dispatch(getAction({ sprints: Urls.sprints + query }));
    };

    const getMembersList = () => {
        dispatch(getAction({ sprintMembers: Urls.sprint_members + `/${data?._id}` }));
    }

    const updateSprintInfo = async (key: string | number, value: string | boolean) => {
        const resp = (await dispatch(patchAction({ sprints: Urls.sprints }, { [key]: value }, data?._id))) as any
        const success = resp.payload?.status == 200;
        if (success) {
            getSprints();
        }
    }


    const handleSprintDelete = () => {
        (dispatch(deleteAction(Urls.sprints, data?._id)) as any).then((res) => {
            if (res.payload?.status === 200) {
                getSprints();
            }
        })
    }

    /*  ######################################################################################## */

    const filteredIssues = issueListItems?.filter(
        (sprnt) => sprnt?.sprint_id === data?._id
    );


    const findIssueCount = (type: "bug" | "story" | "task") => {
        return filteredIssues?.filter((issue) => issue.type === type).length;
    };

    const isCurrentUser = (userId: string) => {
        return authInfo?.user?._id === userId;
    }

    /*  ######################################################################################## */

    useEffect(() => {
        getIssues();
        getMembersList();
    }, []);

    /*  ######################################################################################## */

    return (
        <div className="">
            <div className="text-xl">
                <HYEditableDiv className="text-xl dark:bg-card" defaultText={data?.name} handleChange={(value) => updateSprintInfo("name", value)} />
            </div>
            <div className="flex justify-between py-3 text-xs items-center">
                <div className="flex gap-2 items-center">
                    <HiCalendarDays className="text-[#707173]" />{data?.start_date && formatter.format(new Date(data?.start_date))} to
                    <HiCalendarDays className="text-[#707173]" />{data?.end_date && formatter.format(new Date(data?.end_date))}
                </div>
                <div className="space-x-2">
                    <HYAlertDialog submitAction={handleSprintDelete} >
                        <Button
                            type="button"
                            variant="ghost"
                            className="border border-destructive text-destructive hover:text-destructive"
                        >
                            Delete
                        </Button>
                    </HYAlertDialog>
                    {data?.is_started ?
                        <Button onClick={() => updateSprintInfo("is_started", false)} className="w-[100px] text-white bg-gray-500 hover:bg-gray-500" >Stop</Button> :
                        <Button onClick={() => updateSprintInfo("is_started", true)} className="w-[100px] text-white">Start</Button>}
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
                                name={typeof data?.created_by !== "string" && data?.created_by?.[0]?.user_name}
                            />
                            <span className="mx-2 truncate w-[150px] text-xs">
                                {typeof data?.created_by !== "string" &&
                                    (isCurrentUser(data?.created_by?.[0]?._id) ? "You" : data?.created_by?.[0]?.user_name)}
                            </span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
                </div>
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Assigned to</div>
                        <div className="flex flex-1 items-center">
                            { /* TODO : sprint members user data for the avatars according to response */}
                            {/* {memberslist > 0 && memberslist?.map(member => */}
                            <HYAvatar
                                // key={member?._id}
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={"Jhon"}
                            />
                            {/* )} */}
                        </div>
                    </div>
                    <Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
                </div>
                <div className="flex pr-3 col-span-3">
                    <div className="flex flex-col">
                        <div className="text-xs text-[#9499A5]">
                            Description
                        </div>
                        <div className="flex flex-1 items-center">
                            <HYEditableDiv className="text-base dark:bg-card" defaultText={data?.description} handleChange={(value) => updateSprintInfo("description", value)} />
                        </div>
                    </div>
                </div>


            </div>
            <Separator className="my-2 dark:bg-[#FFFFFF1A]" />
            <div className="flex justify-between items-center my-2">
                <div className="flex  gap-3 align-middle">
                    <div>Stories</div>
                    <div className="flex gap-3 text-xs items-center">
                        <div className="border flex items-center">{`(`}</div>
                        <div className="flex gap-1 ">
                            <HiBookOpen className="w-4 h-4" />
                            <span>{findIssueCount("story")}</span>
                        </div>
                        <div className="flex gap-1">
                            <img src="/task_icon.svg" alt="task" />
                            <span>{findIssueCount("task")}</span>
                        </div>
                        <div className="flex gap-1">
                            <img src="/bug_icon.svg" alt="bug" />
                            <span>{findIssueCount("bug")}</span>
                        </div>
                        {`)`}
                    </div>
                </div>
                <div className="pr-5">
                    <HYSearch className="dark:bg-card dark:border-[#FFFFFF1A]" inputClassName="dark:bg-card" />
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
                        return <IssueMiniCard data={issue} key={issue?._id} />;
                    })}
                </div>
            </ScrollArea>

        </div>
    );
};

export default SprintDetailView;
