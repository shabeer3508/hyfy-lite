import { useState } from "react";
import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { getAction, postAction } from "@/redux/actions/AppActions";

const CommentCreation = ({ issueId, projectId }: { issueId?: string, projectId?: string }) => {
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        message: "",
        issue_id: issueId,
        project_id: projectId,
    });

    /*  ######################################################################################## */

    const getComments = () => {
        let query = `?expand=created_by&sort=-createdAt`;
        dispatch(getAction({ comments: Urls.comments + query }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        (dispatch(postAction({ comments: Urls.comments }, postData)) as any).then((res) => {
            const success = res.payload?.status == 200;
            if (success) {
                setPostData({
                    message: "",
                    issue_id: issueId,
                    project_id: projectId,
                })
                getComments()
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
                        placeholder="Add Comment"
                        className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-border"
                        onChange={({ target }) => setPostData((prev) => ({ ...prev, message: target.value }))}
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
