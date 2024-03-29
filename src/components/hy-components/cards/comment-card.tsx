import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { HiDotsVertical, } from "react-icons/hi";

import HYDropDown from "../HYDropDown";
import Urls from "@/redux/actions/Urls";
import { CommentsTypes } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { deleteAction, getAction } from "@/redux/actions/AppActions";

const CommentCard = ({ data }: { data: CommentsTypes }) => {

    const dispatch = useDispatch();

    const getComments = () => {
        let query = `?expand=created_by&sort=-createdAt${data?.issue_id ? `&filter=issue_id=${data?.issue_id}` : ""}${data?.project_id ? `&filter=project_id=${data?.project_id}` : ""}`;
        dispatch(getAction({ comments: Urls.comments + query }));
    }

    const handleCommentDelete = () => {
        (dispatch(deleteAction(Urls.comments, data?._id)) as any).then((res) => {
            if (res.payload?.status == 200) {
                getComments();
            }
        });
    }

    const commentOptions = [
        { label: "Delete", action: () => handleCommentDelete(), isAlertDialog: true },
    ];

    return (
        <Card className="dark:bg-card dark:border-[#FFFFFF1A]">
            <CardContent className="p-3 text-xs">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2">
                        <HYAvatar
                            url="https://github.com/shadcn.png"
                            name={typeof data?.created_by !== "string" && data?.created_by?.[0]?.user_name}
                        />
                        <div className="flex flex-col capitalize">
                            <a className="text-xs">{typeof data?.created_by !== "string" && data?.created_by?.[0]?.user_name}</a>
                            <a className="text-xs text-[#9499A5]">
                                {typeof data?.created_by !== "string" && data?.created_by?.[0]?.role}
                            </a>
                        </div>
                    </div>
                    <div>
                        <HYDropDown options={commentOptions}>
                            <Button size="sm" variant="ghost">
                                <HiDotsVertical />
                            </Button>
                        </HYDropDown>
                    </div>
                </div>
                <div className="my-1">{data?.message}</div>
                <div className="text-[#9499A5]">On  {dayjs(data?.createdAt).format("DD/MM/YYYY")}</div>
            </CardContent>
        </Card>
    );
};


export default CommentCard