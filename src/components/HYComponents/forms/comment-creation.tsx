import { toast } from "sonner";
import { useState } from "react";
import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAction, postAction } from "@/redux/actions/AppActions";

const CommentCreation = ({ issueId, projectId }: { issueId?: string, projectId?: string }) => {
    const dispatch = useDispatch();
    const authInfo = useSelector((state: any) => state.UserReducer);

    const [postData, setPostData] = useState({
        message: "",
        created_by: authInfo?.user?.id,
        issue_id: null,
    });

    const getComments = () => {
        let query = "";
        dispatch(getAction({ comments: Urls.comments + query }));
    }

    /*  ######################################################################################## */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (issueId) {
            setPostData((prevData) => ({ ...prevData, issue_id: issueId }));
        }

        if (projectId) {
            setPostData((prevData) => ({ ...prevData, project_id: projectId }));
        }

        (dispatch(postAction(Urls.comments, postData)) as any).then((res) => {
            const success = res.payload.status == 200;
            if (success) {
                setPostData({
                    message: "",
                    created_by: authInfo?.user?.id,
                    issue_id: null
                })
                getComments()
                toast.success("Comment created Successfully")
            }
        });

    };

    /*  ######################################################################################## */

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                    <Input
                        required
                        value={postData?.message}
                        className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Add Comment"
                        onChange={({ target }) => {
                            setPostData((prev) => ({ ...prev, message: target.value }));
                        }}
                    />
                    <Button
                        className="border-primary text-primary"
                        variant="outline"
                        type="submit"
                    >
                        Comment
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CommentCreation;
