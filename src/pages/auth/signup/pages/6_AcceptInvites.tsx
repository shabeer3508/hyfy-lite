import Cookies from "js-cookie"
import Urls from "@/redux/actions/Urls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { getAction, patchAction, reducerNameFromUrl, setCurrentUser } from "@/redux/actions/AppActions";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AcceptInvitesPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [invites, setInvites] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const invitaionReducerName = reducerNameFromUrl("invitaions", "GET");
    const invitaionListData = useSelector((state: any) => state?.[invitaionReducerName]);

    /*  ######################################################################################## */

    const getInvitationList = () => {
        (dispatch(getAction({ invitaions: Urls.invitations })) as any).then(res => {
            setInvites(res?.payload?.data?.data?.invitations)
            setIsLoaded(true);
        })
    }

    /*  ######################################################################################## */

    const hasInvites = invites?.length > 0;
    const disableContinue = !invites?.some((invite) => invite.status === "accepted");

    /*  ######################################################################################## */

    useEffect(() => {
        getInvitationList();
    }, [])

    /*  ######################################################################################## */

    return (
        <div className="flex justify-center h-screen items-center dark:bg-background">
            <Card className="w-[500px] dark:bg-[#23252A]">
                <CardHeader className="pb-3">
                    <CardTitle className="text-primary mb-5">Hyfy</CardTitle>
                    <CardDescription className="text-white text-base">
                        {isLoaded && (hasInvites ? "You have been invited to" : "You don’t have an invite")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoaded && (hasInvites ?
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2 max-h-[200px] overflow-auto pr-1">
                                {invites?.map(org => <InvitationCard inviteInfo={org} getInvitationList={getInvitationList} />)}
                            </div>

                            <div className="text-[#737377] my-2 text-sm">Please make sure this is your organization</div>
                            <div>
                                <Button
                                    disabled={disableContinue}
                                    className="w-full text-white"
                                    onClick={() => navigate("/board")}
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                        :
                        <div className="text-[#9499A5] text-sm">
                            You have not received an invite yet. Only then you can access Hyfy.
                            Please wait until your management sends you an invite
                        </div>
                    )}
                </CardContent>
            </Card >
        </div >
    )
}

export default AcceptInvitesPage;







interface InvitationCardProps {
    inviteInfo: {
        _id: string;
        org_id?: {
            name: string;
            branch: string;
            address?: string;
            pin_code?: string;
            state?: string;
        };
        message?: string;
        sender?: string;
        status?: "pending" | "accepted" | "rejected";
    };
    getInvitationList: () => void
}

const InvitationCard: React.FC<InvitationCardProps> = ({ inviteInfo, getInvitationList }) => {

    const dispatch = useDispatch();

    const handleInvitationStatus = (inviteId: string, status: "accepted" | "rejected") => {
        (dispatch(patchAction({ invitationManage: Urls.invitations }, { status }, inviteId)) as any).then((res) => {
            if (res.payload?.status === 200) {
                Cookies.set('hyfy_auth_token', res?.payload?.data?.data?.token, { expires: 2, secure: true })
                dispatch(setCurrentUser(res?.payload?.data?.data?.user));
                getInvitationList();
            }
        })
    }

    return <div className="border dark:border-[#FFFFFF1A] rounded flex justify-between p-2 ">
        <div className="flex items-center gap-3">
            <HYAvatar className="size-10" name={inviteInfo?.org_id?.name} />
            <div>
                <div className="capitalize">{inviteInfo?.org_id?.name}</div>
                <div className="text-xs text-[#737377]">{inviteInfo?.org_id?.branch}</div>
            </div>
        </div>
        <div className="items-center flex gap-2">
            {inviteInfo?.status === "pending" &&
                <>
                    <Button
                        type="button"
                        variant="ghost"
                        className="text-[#737377]"
                        onClick={() => handleInvitationStatus(inviteInfo?._id, "rejected")}
                    >
                        Reject
                    </Button>
                    <Button
                        type="button"
                        className="text-white"
                        onClick={() => handleInvitationStatus(inviteInfo?._id, "accepted")}
                    >
                        Accept
                    </Button>
                </>
            }

            {inviteInfo?.status === "accepted" &&
                <Button type="button" className="bg-green-700 hover:bg-green-700 cursor-default text-white">Accepted</Button>
            }

            {inviteInfo?.status === "rejected" &&
                <Button type="button" className="bg-red-900 hover:bg-red-900 cursor-default text-white">Rejected</Button>
            }
        </div>
    </div>
}