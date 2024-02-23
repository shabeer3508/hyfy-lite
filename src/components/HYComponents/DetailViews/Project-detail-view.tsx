import { useEffect } from "react";
import HYAvatar from "../HYAvatar";
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import { HiCalendarDays } from "react-icons/hi2";
import { CommentCard } from "./Issue-detail-view";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommentCreation from "../forms/comment-creation";
import { useDispatch, useSelector } from "react-redux";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const ProjectDetailView = ({ data }: { data: any }) => {
    const dispatch = useDispatch()

    const commentsReducerName = reducerNameFromUrl("comments", "GET");
    const commentsList = useSelector((state: any) => state?.[commentsReducerName]);
    const commentsItems = commentsList?.data?.items

    const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

    /*  ######################################################################################## */

    const getComments = () => {
        let query = "?expand=created_by&&sort=-created";
        dispatch(getAction({ comments: Urls.comments + query }));
    }

    /*  ######################################################################################## */

    const statusOptions = [
        { label: "Open", value: "open" }, { label: "In-progress", value: "in-progress" },
        { label: "Pending", value: "pending" }, { label: "Done", value: "done" }
    ]

    const filteredComments = commentsItems?.filter(comment => comment?.project_id === data?.id)?.map(comment => ({ ...comment, ...comment?.expand }))

    /*  ######################################################################################## */

    useEffect(() => {
        getComments()
    }, [])

    /*  ######################################################################################## */

    return (
        <div>
            <div className="flex gap-2 text-xl capitalize">
                {data?.title}
            </div>
            <div className="flex justify-between py-3 text-xs items-center my-3">
                <div className="flex gap-2 items-center">
                    <HiCalendarDays className="text-[#707173]" />{data?.start_date && formatter.format(new Date(data?.start_date))} to
                    <HiCalendarDays className="text-[#707173]" />{data?.end_date && formatter.format(new Date(data?.end_date))}
                </div>
            </div>
            <div className="grid grid-cols-5 pb-5">
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Project Owner</div>
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
                        <div className="text-xs text-[#9499A5]">Team</div>
                        <div className="flex flex-1 items-center">
                            <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={"Jhon"}
                            /> <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={"Jhon"}
                            /> <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={"Jhon"}
                            />
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                </div>
            </div>
            <ScrollArea className="max-h-[60vh] h-full pr-5 ">
                <div className="space-y-2">
                    <div className="text-xs text-[#9499A5]">Description</div>
                    <div >{data?.description}</div>
                    <div className="text-xs text-[#9499A5]">Status</div>
                    <div>
                        <HYCombobox options={statusOptions} />
                    </div>
                </div>
                <Separator className="my-3" />
                <div className="space-y-3">
                    <div className="space-y-2">
                        <div>Comments</div>
                        <CommentCreation projectId={data?.id} />
                    </div>
                    <div className="space-y-3">
                        {filteredComments?.map((comment) => <CommentCard data={comment} />)}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default ProjectDetailView;

