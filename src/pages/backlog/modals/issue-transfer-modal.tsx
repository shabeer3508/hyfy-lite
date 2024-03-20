import { toast } from "sonner";
import { useState } from "react";
import { BiDirections } from "react-icons/bi";
import { HiViewBoards, } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { Button } from "@/components/ui/button";
import HYSearch from "@/components/hy-components/HYSearch";
import { EpicTypes, IssueStatusTypes, SprintTypes, } from "@/interfaces";
import { patchAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface IssueTransferModalProps {
    data: any,
    handleClose: () => void
    getIssues: () => void
}


const IssueTransferModal: React.FC<IssueTransferModalProps> = ({ data, handleClose, getIssues }) => {

    const dispatch = useDispatch();
    const epicReducerName = reducerNameFromUrl("epic", "GET");
    const epicsListData = useSelector((state: any) => state?.[epicReducerName])?.data?.items as EpicTypes[];
    const sprintListData = useSelector((state: any) => state?.GetSprints)?.data?.items as SprintTypes[];

    const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
    const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];


    const [search, setSearch] = useState("");
    const [targetId, setTargetId] = useState<any>({ epic_id: null, sprint_id: null });

    const handleApplyTransfer = (type: "epic" | "sprint") => {
        let postData: any = { issue_ids: data?.selectedIssues }

        if (type === "epic") {
            if (!targetId?.epic_id) toast.error("Please select a epic from the  list");
            else { postData = { ...postData, epic_id: targetId?.epic_id } }
        } else {
            if (!targetId?.sprint_id) toast.error("Please select a sprint from the  list");
            else {
                postData = {
                    ...postData,
                    sprint_id: targetId?.sprint_id,
                    status_id: issueStatusList?.find(issueStatus => issueStatus?.name === "Todo")?._id
                }
            }
        }

        (dispatch(patchAction({ issues: Urls.issues + `/moveIssues` }, postData, type)) as any).then(res => {
            if (res.payload?.status == 200) {
                toast.success("Issue moved successfully");
                getIssues();
                handleClose();
            }
        })

    }

    return (
        <div className="flex flex-col">
            <div className="text-xl mb-3">Move Issues to</div>
            <Tabs defaultValue="epic" className="">
                <TabsList className="rounded">
                    <TabsTrigger value="epic" className="flex gap-1 rounded">
                        <HiViewBoards className="w-4 h-4" />
                        Epic
                    </TabsTrigger>
                    <TabsTrigger value="sprint" className="flex gap-1 rounded">
                        <BiDirections className="w-4 h-4" />
                        Sprint
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="epic" >
                    <div className="flex flex-col gap-3">
                        <div className="w-full">
                            <HYSearch className="w-full max-w-full" />
                        </div>
                        <div className="border p-3 rounded  flex flex-col gap-2 max-h-[300px] overflow-auto">
                            {epicsListData?.map(epic =>
                                <div
                                    key={epic?._id}
                                    onClick={() => setTargetId({ epic_id: epic?._id })}
                                    className={`${targetId?.epic_id === epic?._id && "dark:bg-[#2E3035] bg-gray-300"} py-1 px-3 border rounded cursor-pointer text-sm`}
                                >
                                    {epic?.name}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="w-1/2 text-primary" onClick={() => handleClose()}>Cancel</Button>
                            <Button className="w-1/2 text-white" onClick={() => handleApplyTransfer("epic")}>Move</Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="sprint" >
                    <div className="flex flex-col gap-3">
                        <div className="w-full">
                            <HYSearch className="w-full max-w-full" />
                        </div>
                        <div className="border p-3 rounded flex flex-col gap-2 max-h-[300px] overflow-auto">
                            {sprintListData?.map(sprint =>
                                <div
                                    key={sprint?._id}
                                    onClick={() => setTargetId({ sprint_id: sprint?._id })}
                                    className={`${targetId?.sprint_id === sprint?._id && "dark:bg-[#2E3035] bg-gray-300"} py-1 px-3 border rounded cursor-pointer text-sm`}
                                >
                                    {sprint?.name}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="w-1/2 text-primary" onClick={() => handleClose()}>Cancel</Button>
                            <Button className="w-1/2 text-white" onClick={() => handleApplyTransfer("sprint")}> Move</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

        </div >
    )
}


export default IssueTransferModal