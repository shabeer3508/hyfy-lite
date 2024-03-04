import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { HiMail } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import { HYCombobox } from "@/components/HYComponents/HYCombobox";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const AddMembersPage: React.FC = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({ inputUser: { email: "", role: "employee" }, inviteList: [] })

    /*  ######################################################################################## */

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
        console.log("🚀 ~ formData:", formData)
    }

    /*  ######################################################################################## */

    const rolesOptions = [
        { label: 'Manager', value: "manager" },
        { label: "Employee", value: "employee" }
    ]

    /*  ######################################################################################## */


    return (
        <div className="flex justify-center h-screen items-center dark:bg-background">
            <Card className="w-[600px] dark:bg-[#23252A]">
                <CardHeader>
                    <CardTitle className="text-primary mb-5">Hyfy</CardTitle>
                    <CardDescription className="">Add Members</CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form onSubmit={handleAddMembers}>
                        <div className="flex flex-col gap-3">
                            <div className="flex w-full justify-between items-center gap-2">
                                <div className="flex items-center dark:bg-[#23252A] flex-1 rounded px-3 border dark:border-[#FFFFFF1A] border-border ">
                                    <HiMail className="mr-2" />
                                    <Input
                                        required
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

                                <Button type="submit" className="text-primary bg-[#23252A] border-primary border" variant="outline">Add</Button>
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
                                                        buttonClassName="dark:bg-[#23252A]  dark:border-[#FFFFFF1A]"
                                                        onValueChange={(value) => handleUserRoleChange(user?.id, value)}
                                                    />
                                                </div>
                                                <div className="px-2 text-red-500 cursor-pointer"><HiMiniXMark onClick={() => handleDeleteUser(user?.id)} /></div>
                                            </div>
                                        </div>
                                    })}

                                </div>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-1 ">
                    <Button
                        className="w-full text-white hover:bg-primary"
                        onClick={() => handleInviteUsers()}>
                        Invite Members
                    </Button>
                    <div
                        className="text-center text-sm my-2 cursor-pointer min-w-max dark:text-primary"
                        onClick={() => { }}>
                        Skip for now
                    </div>
                </CardFooter>
            </Card >
        </div >)
}


export default AddMembersPage;