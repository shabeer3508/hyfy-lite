import Cookies from "js-cookie"
import Urls from "@/redux/actions/Urls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InviteUsers from "@/pages/team/forms/invite-members";
import { patchAction, postAction, updateUserStage } from "@/redux/actions/AppActions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AddMembersPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSkipInvitaion = () => {
		(dispatch(postAction({ invitations_skip: Urls.invitations_skip }, {})) as any).then((res) => {
			if (res.payload?.status === 200) {
				dispatch(updateUserStage("completd"));
				Cookies.set('hyfy_auth_token', res.payload?.data?.data?.token, { expires: 2, secure: true })
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
