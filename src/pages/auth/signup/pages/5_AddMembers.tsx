import InviteUsers from "@/pages/team/forms/invite-members";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Urls from "@/redux/actions/Urls";
import { postAction } from "@/redux/actions/AppActions";
import { toast } from "sonner";

const AddMembersPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authInfo = useSelector((state: any) => state.UserReducer);

	const handleSkipInvitaion = () => {
		(dispatch(postAction({ invitations_skip: Urls.invitations_skip }, {})) as any).then((res) => {
			if (res.payload?.status === 200) {
				toast.success(`${res.payload?.data?.message}`);
				navigate("/board");
			}
		});
	};

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
						className="text-center text-sm cursor-pointer min-w-max dark:text-primary"
					>
						Skip for now
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AddMembersPage;
