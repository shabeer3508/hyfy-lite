import { useEffect } from "react";
import { HiCalendarDays } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import HYEditableDiv from "@/components/hy-components/HYEditableDiv";
import HYAlertDialog from "@/components/hy-components/HYAlertDialog";
import { CommentsTypes, ProjectType, UsersTypes } from "@/interfaces";
import CommentCard from "@/components/hy-components/cards/comment-card";
import CommentCreation from "@/components/hy-components/forms/comment-creation";
import { deleteAction, getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const ProjectDetailView = ({ data }: { data: ProjectType }) => {
    const dispatch = useDispatch()

    const authInfo = useSelector((state: any) => state.UserReducer);

    const commentsReducerName = reducerNameFromUrl("comments", "GET");
    const commentsList = useSelector((state: any) => state?.[commentsReducerName]);
    const commentsItems = commentsList?.data?.items as CommentsTypes[];

    const usersReducerName = reducerNameFromUrl("users", "GET");
    const usersListData = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];


    const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

    /*  ######################################################################################## */

    const getComments = () => {
        let query = `?expand=created_by&sort=-createdAt&filter=project_id=${data?._id}`;
        dispatch(getAction({ comments: Urls.comments + query }));
    }

    const getProjects = () => {
        let query = "?perPage=300&expand=owner";
        dispatch(getAction({ project: Urls.project + query }));
    }

    const isCurrentUser = (userId: string) => {
        return authInfo?.user?._id === userId;
    }

    const handleProjectEdit = (value, field: "status" | "title" | "description") => {
        (dispatch(patchAction({ project: Urls.project }, { [field]: value }, data?._id)) as any).then((res) => {
            if (res.payload?.status === 200) {
                getProjects();
            }
        })
    }

    const handleProjectDelete = () => {
        (dispatch(deleteAction(Urls.project, data?._id)) as any).then((res) => {
            if (res.payload?.status === 200) {
                getProjects();
            }
        })
    }

    /*  ######################################################################################## */

    const statusOptions = [
        { label: "Open", value: "open" },
        { label: "In-progress", value: "in-progress" },
        { label: "Pending", value: "pending" },
        { label: "Done", value: "done" }
    ]

    const logoColors = [
        "bg-[#71A4FF]",
        "bg-[#4C4878]",
        "bg-[#A4599A]",
        "bg-[#E2A766]",
        "bg-[#389C98]",
        "bg-[#FF6481]",
    ];

    /*  ######################################################################################## */

    useEffect(() => {
        getComments()
    }, [])

    /*  ######################################################################################## */


    return (
        <div className="overflow-auto max-h-[70vh] pr-2">
            <div className="flex gap-2 text-xl capitalize mx-1 ">
                <HYEditableDiv className="text-xl dark:bg-card" defaultText={data?.title} handleChange={(value) => handleProjectEdit(value, "title")} />
            </div>
            <div className="flex justify-between py-3 text-xs items-center my-3 mx-1">
                <div className="flex gap-2 items-center">
                    <HiCalendarDays className="text-[#707173]" />{data?.start_date && formatter.format(new Date(data?.start_date))} to
                    <HiCalendarDays className="text-[#707173]" />{data?.end_date && formatter.format(new Date(data?.end_date))}
                </div>
                <HYAlertDialog submitAction={handleProjectDelete} >
                    <Button
                        type="button"
                        variant="ghost"
                        className="border border-destructive text-destructive hover:text-destructive"
                    >
                        Delete
                    </Button>
                </HYAlertDialog>
            </div>
            <div className="grid grid-cols-5 pb-1 mx-1">
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Project Owner</div>
                        <div className=" flex flex-1 items-center">
                            <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={typeof data?.owner !== "string" && data?.owner?.[0]?.user_name}
                            />
                            <span className="mx-2 truncate w-[150px] text-xs">{typeof data?.owner !== "string" && (isCurrentUser(data?.owner?.[0]?._id) ? "You" : data?.owner?.[0]?.user_name)}</span>
                        </div>
                    </div>
                    <Separator orientation="vertical" className="dark:bg-[#FFFFFF1A]" />
                </div>
                <div className="flex justify-between pr-3 flex-1 col-span-4">
                    <div className="flex flex-col gap-3 w-full ">
                        <div className="text-xs text-[#9499A5]">Team</div>
                        <div className="flex flex-1 items-center gap-4">
                            {data?.members?.length > 0 && data?.members?.map((member, i) => {
                                const currentUser = usersListData?.find(user => user._id === member);
                                return (
                                    <div className="flex gap-1 text-xs items-center">
                                        <HYAvatar
                                            key={member}
                                            className="size-6 text-white"
                                            name={currentUser?.user_name}
                                            color={`${logoColors[i]}`}
                                        />
                                        {currentUser?.user_name}
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pr-5">
                <Separator className="my-3 dark:bg-[#FFFFFF1A]" />
            </div>

            {/* <ScrollArea className="max-h-[calc(100vh-500px)] overflow-auto pr-5 "> */}
            <div className="space-y-2 mx-1">
                <div className="text-xs text-[#9499A5]">Description</div>
                <div className="min-h-2 py-3">
                    <HYEditableDiv
                        defaultText={data?.description}
                        className="text-base dark:bg-card"
                        handleChange={(value) => handleProjectEdit(value, "description")}
                    />
                </div>

                <div className="text-xs text-[#9499A5]">Status</div>
                <div className="">
                    <HYCombobox
                        options={statusOptions}
                        defaultValue={data?.status}
                        buttonClassName="dark:bg-card dark:border-[#FFFFFF1A]"
                        onValueChange={(value) => handleProjectEdit(value, "status")}
                    />
                </div>
            </div>
            <Separator className="my-3 dark:bg-[#FFFFFF1A]" />
            <div className="space-y-3 ">
                <div className="space-y-2 mx-1">
                    <div>Comments</div>
                    <CommentCreation projectId={data?._id} />
                </div>
                <div className="space-y-3 mx-1">
                    {commentsItems?.map((comment, i) => <CommentCard key={`${comment?._id}_${i}`} data={comment} />)}
                </div>
            </div>
            {/* </ScrollArea> */}
        </div>
    );
};

export default ProjectDetailView;

