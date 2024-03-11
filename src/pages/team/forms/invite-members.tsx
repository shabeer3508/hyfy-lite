import { toast } from "sonner";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { HiMail } from "react-icons/hi";
import Urls from "@/redux/actions/Urls";
import { HiMiniXMark } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { useLocation, useNavigate } from "react-router-dom";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { postAction, updateUserStage } from "@/redux/actions/AppActions";

interface InviteUserProps { }

const InviteUsers: React.FC<InviteUserProps> = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state, pathname } = useLocation();

    const authInfo = useSelector((state: any) => state.UserReducer);
    const [formData, setFormData] = useState({ inputUser: { email: "", role: "employee" }, inviteList: [] })

    /*  ######################################################################################## */

    const handleAddMembers = () => {
        if (formData?.inputUser?.email == "") {
            toast.error("Enter email address")
        } else {
            setFormData((prevData) => ({
                inputUser: { email: "", role: "employee" },
                inviteList: [...prevData?.inviteList, { id: uuidv4(), email: prevData?.inputUser?.email, role: prevData?.inputUser?.role }]
            }))
        }
    }

    const handleDeleteUser = (id: string) => {
        setFormData((prevData) => ({ ...prevData, inviteList: prevData?.inviteList?.filter(user => user?.id !== id) }))
    }

    const handleUserRoleChange = (id: string, newRole: string) => {
        const updatedInviteList = formData?.inviteList?.map(item => {
            if (item.id === id) { return { ...item, role: newRole } }
            return item;
        });
        setFormData(prevState => ({ ...prevState, inviteList: updatedInviteList }));
    }

    const handleInviteUsers = (e) => {
        e.preventDefault();

        const postData = {
            user_id: authInfo?.user?._id ?? state?.authInfo?.user?._id,
            members: formData?.inviteList?.map((user) => ({ email: user.email, role: user.role }))
        }
        if (postData?.members?.length == 0) {
            toast.error("Please add atleast one member details");
        } else {
            (dispatch(postAction({ invite: Urls.invite_user }, postData)) as any).then((res) => {
                const success = res.payload?.status == 200;
                if (success) {
                    toast.success("Invitations sent successfully!");
                    setFormData({ inputUser: { email: "", role: "employee" }, inviteList: [] });

                    if (pathname === "/signup/invite-members") {
                        dispatch(updateUserStage("completd"));
                        navigate("/board");
                    }
                }
            })
        }
    }


    /*  ######################################################################################## */

    const rolesOptions = [
        { label: 'Manager', value: "manager" },
        { label: "Employee", value: "employee" }
    ]

    /*  ######################################################################################## */


    return (
        <div className="">
            <form onSubmit={handleInviteUsers}>
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-between items-center gap-2">
                        <div className="flex items-center dark:bg-[#23252A] flex-1 rounded px-3 border dark:border-[#FFFFFF1A] border-border ">
                            <HiMail className="mr-2" />
                            <Input
                                autoFocus
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                value={formData?.inputUser?.email}
                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 dark:bg-[#23252A] h-[38px]"
                                onChange={({ target }) => setFormData((prevData) => ({ ...prevData, inputUser: { ...prevData?.inputUser, email: target.value } }))}
                            />
                        </div>

                        <HYCombobox
                            unSelectable={false}
                            options={rolesOptions}
                            defaultValue={formData?.inputUser?.role}
                            buttonClassName="dark:bg-[#23252A]  dark:border-[#FFFFFF1A]   border w-1/3"
                            onValueChange={(value) => setFormData((prevData) => ({ ...prevData, inputUser: { ...prevData?.inputUser, role: value } }))}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleAddMembers()}
                            className="text-primary dark:bg-[#23252A] border-primary border"
                        >
                            Add
                        </Button>
                    </div>

                    {formData?.inviteList?.length > 0 &&
                        <div className=" flex flex-col gap-3 border dark:border-[#FFFFFF1A] p-2 rounded max-h-[300px] overflow-auto">

                            {formData?.inviteList?.map(user => {
                                return <div key={user?.id} className="flex justify-between items-center border dark:border-[#FFFFFF1A] p-1 rounded">
                                    <div className="flex items-center">
                                        <div className="mx-2 border border-gray-700 rounded-full"><HYAvatar name={user?.email} /></div>
                                        <div className="truncate w-[200px] px-1 text-sm">{user?.email}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div>
                                            <HYCombobox
                                                unSelectable={false}
                                                options={rolesOptions}
                                                defaultValue={user?.role}
                                                buttonClassName="dark:bg-[#23252A] dark:border-[#FFFFFF1A]"
                                                onValueChange={(value) => handleUserRoleChange(user?.id, value)}
                                            />
                                        </div>
                                        <div className="px-2 text-red-500 cursor-pointer">
                                            <HiMiniXMark onClick={() => handleDeleteUser(user?.id)} />
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    }
                    <Button
                        className="w-full text-white hover:bg-primary">
                        Invite Members
                    </Button>
                </div>
            </form >
        </div >
    )
}

export default InviteUsers