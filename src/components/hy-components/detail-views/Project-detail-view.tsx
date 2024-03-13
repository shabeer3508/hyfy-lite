import { useEffect } from "react";
import HYAvatar from "../HYAvatar";
import Urls from "@/redux/actions/Urls";
import { HYCombobox } from "../HYCombobox";
import HYEditableDiv from "../HYEditableDiv";
import { HiCalendarDays } from "react-icons/hi2";
import { CommentCard } from "./Issue-detail-view";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import CommentCreation from "../forms/comment-creation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAction, patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const ProjectDetailView = ({ data }: { data: any }) => {
    const dispatch = useDispatch()

    const authInfo = useSelector((state: any) => state.UserReducer);
    const commentsReducerName = reducerNameFromUrl("comments", "GET");
    const commentsList = useSelector((state: any) => state?.[commentsReducerName]);
    const commentsItems = commentsList?.data?.items


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

    /*  ######################################################################################## */

    const statusOptions = [
        { label: "Open", value: "open" },
        { label: "In-progress", value: "in-progress" },
        { label: "Pending", value: "pending" },
        { label: "Done", value: "done" }
    ]

    /*  ######################################################################################## */

    useEffect(() => {
        getComments()
    }, [])

    /*  ######################################################################################## */


    return (
        <div className="">
            <div className="flex gap-2 text-xl capitalize mx-1">
                <HYEditableDiv className="text-xl" defaultText={data?.title} handleChange={(value) => handleProjectEdit(value, "title")} />
            </div>
            <div className="flex justify-between py-3 text-xs items-center my-3 mx-1">
                <div className="flex gap-2 items-center">
                    <HiCalendarDays className="text-[#707173]" />{data?.start_date && formatter.format(new Date(data?.start_date))} to
                    <HiCalendarDays className="text-[#707173]" />{data?.end_date && formatter.format(new Date(data?.end_date))}
                </div>
            </div>
            <div className="grid grid-cols-5 pb-1 mx-1">
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Project Owner</div>
                        <div className=" flex flex-1 items-center">
                            <HYAvatar
                                className="size-6"
                                url="https://github.com/shadcn.png"
                                name={data?.owner?.[0]?.user_name}
                            />
                            <span className="mx-2 truncate w-[150px]">{isCurrentUser(data?.owner?.[0]?._id) ? "You" : data?.owner?.[0]?.user_name}</span>
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                </div>
                <div className="flex justify-between pr-3">
                    <div className="flex flex-col gap-3">
                        <div className="text-xs text-[#9499A5]">Team</div>
                        <div className="flex flex-1 items-center">
                            { /* TODO : update  user data for the avatars according to response */}
                            {data?.members?.length > 0 && data?.members?.map(member =>
                                <HYAvatar
                                    key={member?._id}
                                    className="size-6"
                                    url="https://github.com/shadcn.png"
                                    name={"Jhon"}
                                />
                            )}
                        </div>
                    </div>
                    <Separator orientation="vertical" />
                </div>
            </div>
            <div className="pr-5">
                <Separator className="my-3" />
            </div>

            <ScrollArea className="max-h-[500px] overflow-auto pr-5 ">
                <div className="space-y-2 mx-1">
                    <div className="text-xs text-[#9499A5]">Description</div>
                    <div className="min-h-2 py-3">
                        <HYEditableDiv className="text-base" defaultText={data?.description} handleChange={(value) => handleProjectEdit(value, "description")} />
                    </div>

                    <div className="text-xs text-[#9499A5]">Status</div>
                    <div className="">
                        <HYCombobox
                            options={statusOptions}
                            defaultValue={data?.status}
                            onValueChange={(value) => handleProjectEdit(value, "status")}
                        />
                    </div>
                </div>
                <Separator className="my-3 " />
                <div className="space-y-3 ">
                    <div className="space-y-2 mx-1">
                        <div>Comments</div>
                        <CommentCreation projectId={data?._id} />
                    </div>
                    <div className="space-y-3 mx-1">
                        {commentsItems?.map((comment, i) => <CommentCard key={`${comment?._id}_${i}`} data={comment} />)}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

export default ProjectDetailView;

