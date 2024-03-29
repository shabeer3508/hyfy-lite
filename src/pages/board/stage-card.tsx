import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDotsHorizontal, } from "react-icons/hi";

import Urls from "@/redux/actions/Urls";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import BoardCard, { BoardCardSkeleton } from "./board-card";
import HYDropDown from "@/components/hy-components/HYDropDown";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import HYEditableDiv from "@/components/hy-components/HYEditableDiv";
import IssueCreationCardMini from "../issues/forms/issue-creation-mini";
import { IssueStatusTypes, IssueTypes, ProjectType, } from "@/interfaces";
import { deleteAction, patchAction, postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";



interface StageCardProps {
    stage: IssueStatusTypes
    getIssues?: () => void;
    getStages?: () => void;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, getIssues, getStages }) => {

    const dispatch = useDispatch();

    const issuesListData = useSelector((state: any) => state?.GetIssues);
    const issueListItems = issuesListData?.data?.items as IssueTypes[];

    const stagesReducerName = reducerNameFromUrl("stagesList", "GET");
    const stagesData = useSelector((state: any) => state?.[stagesReducerName]);
    const stagesItems = stagesData?.data?.data?.stages as IssueStatusTypes[];

    const reducerName = reducerNameFromUrl("project", "GET");
    const projectList = useSelector((state: any) => state?.[reducerName])?.data?.items as ProjectType[];

    const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
    const boardInfo = appProfileInfo?.board;

    /*  ######################################################################################## */

    const isUserIncludes = (issueInfo: IssueTypes) => {
        if (boardInfo?.task_filter_value === "all") {
            return true
        } else if (boardInfo?.task_filter_value === "unassigned") {
            return issueInfo?.assign_to?.length == 0;
        } else {
            return issueInfo?.assign_to?.some(user => user === boardInfo?.task_filter_value);
        }
    }

    const getIssuesByStageId = (stageId: string) => {
        return issueListItems?.filter((issue) =>
            issue?.status === stagesItems?.find(stage => stage?._id === stageId)?._id && isUserIncludes(issue));
    };

    const updateStageInfo = async (id: string, key: string, value: string) => {
        const resp = (await dispatch(patchAction({ stages: Urls.stages }, { [key]: value }, id))) as any;
        const success = resp.payload?.status == 200;
        if (success) {
            getStages()
        }
    }

    const updateItemStatus = async (id: string, stageId: string) => {
        const resp = (await dispatch(patchAction({ issues: Urls.issues }, { status: stageId }, id))) as any;
        const success = resp.payload?.status == 200;
        if (success) { getIssues() }
    };

    const handleStageDelete = () => {
        const template_id = projectList?.find(project => project._id === appProfileInfo?.project_id).template;

        if (getIssuesByStageId(stage?._id)?.length > 0) {
            toast.error("Unable to delete column",
                { description: "Deletion of column containing tasks is not possible at the moment. Please remove tasks from the column before deleting it.", duration: 3000 });
        } else {
            (dispatch(deleteAction(Urls.stages, `${stage?._id}/${template_id}`)) as any).then(res => {
                if (res.payload?.status === 200) {
                    getStages();
                }
            })
        }
    }

    /*  ######################################################################################## */

    const issueOptions = [
        { label: "Delete", action: () => handleStageDelete() },
    ];

    /*  ######################################################################################## */

    return (
        <div
            // draggable
            className="text-center dark:bg-[#131417] bg-[#F7F8F9] rounded mx-1 min-w-[300px] mb-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                updateItemStatus(e?.dataTransfer?.getData("id"), stage?._id);
            }}
        >
            <div className="flex justify-between items-center px-3 py-2">
                <div className="p-1 px-2 font-medium text-sm">
                    <HYEditableDiv
                        placeholder="Column name"
                        className="bg-[#F7F8F9] pr-2 font-normal"
                        defaultText={stage?.name}
                        handleChange={(value) => updateStageInfo(stage?._id, "name", value)} />
                </div>

                <div className="flex items-center">
                    <HYDropDown options={issueOptions}>
                        <Button className="" size="icon" variant="ghost">
                            <HiOutlineDotsHorizontal />
                        </Button>
                    </HYDropDown>
                </div>

            </div>
            <ScrollArea className="h-[calc(100vh-240px)] ">
                <div className="flex flex-col px-5 py-2 gap-3">
                    <div className=" w-full  bg-[#F7F8F9] dark:bg-[#111215] ">
                        <div className="flex items-center">
                            <IssueCreationCardMini statusId={stage?._id} />
                        </div>
                    </div>
                    {getIssuesByStageId(stage?._id)?.map((tdInfo) => <BoardCard data={tdInfo} key={tdInfo?._id} getIssues={getIssues} />)}
                    {issuesListData?.loading && <BoardCardSkeleton />}
                </div>
            </ScrollArea>
        </div>
    )
}


export const StageCreation = ({ setStageCreation, getStages }: any) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const stagesReducerName = reducerNameFromUrl("stagesList", "GET");
    const stagesData = useSelector((state: any) => state?.[stagesReducerName]);
    const stagesItems = stagesData?.data?.data?.stages as IssueStatusTypes[];

    const reducerName = reducerNameFromUrl("project", "GET");
    const projectList = useSelector((state: any) => state?.[reducerName])?.data?.items as ProjectType[];

    const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

    /*  ######################################################################################## */

    const handleStageCreation = (data: any) => {
        if (data?.name !== "") {
            let postData = {
                stage: {
                    name: data?.name, order: (stagesItems?.length + 1).toString()
                },
                template_id: projectList?.find(project => project._id === appProfileInfo?.project_id).template
            };

            (dispatch(postAction({ stages: Urls.stages }, postData)) as any).then((res) => {
                if (res.payload?.status === 200) {
                    getStages();
                    reset();
                }
            });
        }
    }

    /*  ######################################################################################## */

    return (
        <form onSubmit={handleSubmit(handleStageCreation)}>
            <div className="border rounded p-2 space-y-1">
                <Input
                    {...register("name")}
                    placeholder="Enter column name"
                    className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border min-w-[200px]"
                />
                <div className="flex items-center">
                    <Button className="py-0">Add</Button>
                    <Button
                        variant="ghost"
                        onClick={() => setStageCreation(false)}>
                        <HiXMark className="size-4" />
                    </Button>
                </div>
            </div>
        </form>
    )
}
