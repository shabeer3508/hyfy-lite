import InviteUsers from "@/pages/team/forms/invite-members";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";

const AddMembersPage: React.FC = () => {

    const authInfo = useSelector((state: any) => state.UserReducer);

    const handleSkipInvitaion = () => {
        //TODO : updates user stage value to "completed"
    }

    return (
        <div className="flex justify-center h-screen items-center dark:bg-background">
            <Card className="w-[600px] dark:bg-[#23252A]">
                <CardHeader>
                    <CardTitle className="text-primary mb-5">Hyfy</CardTitle>
                    <CardDescription className="">Add Members</CardDescription>
                </CardHeader>
                <CardContent>
                    <InviteUsers />
                </CardContent>
                <CardFooter className="flex flex-col gap-1 ">
                    <div
                        onClick={handleSkipInvitaion}
                        className="text-center text-sm cursor-pointer min-w-max dark:text-primary">
                        Skip for now
                    </div>
                </CardFooter>
            </Card >
        </div >
    )
}


export default AddMembersPage;