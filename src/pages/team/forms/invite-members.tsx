import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { HiMail } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { postAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";


interface InviteUserProps {
    setModalOpen?: any
}


const InviteUsers: React.FC<InviteUserProps> = ({ setModalOpen }) => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const authInfo = useSelector((state: any) => state.UserReducer);
    const [formData, setFormData] = useState({ inputUser: { email: "", role: "employee" }, inviteList: [] })

    // const inviteReducername = reducerNameFromUrl(Urls.invite_user, "POST")



    const handleAddMembers = (e) => {
        e?.preventDefault()
        setFormData((prevData) => ({
            inputUser: { email: "", role: "employee" },
            inviteList: [...prevData?.inviteList, { id: uuidv4(), email: prevData?.inputUser?.email, role: prevData?.inputUser?.role }]
        }))
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

    const handleInviteUsers = () => {

        const postData = {
            user_id: authInfo?.user?._id ?? state?.authInfo?.user?._id,
            members: formData?.inviteList?.map((user) => ({ email: user.email, role: user.role }))
        }

        // console.log("🚀 ~ formData:", postData)

        if (postData?.members?.length == 0) {
            toast.error("Please add atleast one member details")
        } else {
            (dispatch(postAction(Urls.invite_user, postData)) as any).then((res) => {
                console.log("🚀 ~ res:", res)
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
        <div>
            <form onSubmit={handleAddMembers}>
                <div className="flex flex-col gap-3">
                    <div className="flex w-full justify-between items-center gap-2">
                        <div className="flex items-center dark:bg-background flex-1 rounded px-3 border dark:border-[#FFFFFF1A] border-border ">
                            <HiMail className="mr-2" />
                            <Input
                                required
                                autoFocus
                                type="email"
                                autoComplete="off"
                                placeholder="Email"
                                value={formData?.inputUser?.email}
                                className="outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0  dark:bg-background h-[38px]"
                                onChange={({ target }) => setFormData((prevData) => ({ ...prevData, inputUser: { ...prevData?.inputUser, email: target.value } }))}
                            />
                        </div>

                        <HYCombobox
                            unSelectable={false}
                            options={rolesOptions}
                            defaultValue={formData?.inputUser?.role}
                            buttonClassName="dark:bg-background  dark:border-[#FFFFFF1A]   border w-1/3"
                            onValueChange={(value) => setFormData((prevData) => ({ ...prevData, inputUser: { ...prevData?.inputUser, role: value } }))}
                        />

                        <Button type="submit" className="text-primary dark:bg-background border-primary border" variant="outline">Add</Button>
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
                                                buttonClassName="dark:bg-background dark:border-[#FFFFFF1A]"
                                                onValueChange={(value) => handleUserRoleChange(user?.id, value)}
                                            />
                                        </div>
                                        <div className="px-2 text-red-500 cursor-pointer"><HiMiniXMark onClick={() => handleDeleteUser(user?.id)} /></div>
                                    </div>
                                </div>
                            })}

                        </div>
                    }
                    <Button
                        type="button"
                        className="w-full text-white hover:bg-primary"
                        onClick={() => handleInviteUsers()}>
                        Invite Members
                    </Button>
                </div>
            </form></div>
    )
}

export default InviteUsers