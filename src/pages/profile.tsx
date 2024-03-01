import { toast } from "sonner";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import { clearUser, getAction, patchAction, reducerNameFromUrl, resetAppInfo, setCurrentUser } from "@/redux/actions/AppActions";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const authInfo = useSelector((state: any) => state.UserReducer);
	const orgReducerName = reducerNameFromUrl("organization", "GET");
	const orgList = useSelector((state: any) => state?.[orgReducerName]);
	const orgItems = orgList?.data?.items

	/*  ######################################################################################## */

	const getOrganizations = (prams?: string) => {
		let query = "?perPage=300";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ organization: Urls.organization + query }));
	}

	const logoutUser = () => {
		Cookies.remove("hyfy_auth_token");
		navigate("/login");
		dispatch(clearUser())
		dispatch(resetAppInfo())
	};

	const handleOrganizationChange = async (orgId: string) => {
		const resp = (await dispatch(
			patchAction({ users: Urls.users }, { current_organization: orgId, }, authInfo?.user?._id)
		)) as any;

		const success = resp.payload.status == 200;
		if (success) {
			dispatch(setCurrentUser(resp?.payload?.data));
			dispatch(resetAppInfo())
			toast.success("Organization Changed Successfully");
		}
	}

	/*  ######################################################################################## */

	useEffect(() => {
		getOrganizations();
	}, []);

	/*  ######################################################################################## */


	return (
		<div className="dark:text-foreground flex flex-col h-full items-center px-6 pb-5 ">
			<Card className="w-full flex-1 flex py-14 dark:bg-[#16181D]">
				<div className="w-1/3 flex flex-col justify-center items-center flex-1 border-r">
					<HYAvatar
						className="size-32"
						url="https://github.com/shadcn.png"
						name={authInfo?.user?.user_name}
					/>
					<h1 className="text-2xl font-bold mt-6">{authInfo?.user?.user_name}</h1>
					<p className="text-sm text-gray-500 mt-1 capitalize">
						{authInfo?.user?.role}
					</p>
					<Button
						onClick={logoutUser}
						variant="outline"
						className="text-xl text-red-500 hover:text-red-500 mt-10 p-5"
					>
						Logout
					</Button>
				</div>
				<div className="w-2/3 flex gap-5 flex-col justify-center p-10">
					<div className="text-xl text-primary">My Organizations</div>
					<div className="flex flex-col gap-3 max-h-[50vh] overflow-auto pr-2">
						{orgItems?.map((org) =>
							<Card
								className="p-7 flex justify-between items-center cursor-pointer"
								onClick={() => authInfo?.user?.current_organization !== org?._id && handleOrganizationChange(org?._id)}
							>
								<div>
									<div className="text-sm">{org?.name}</div>
									<div className="text-xs">{org?.email}</div>
								</div>
								<div>
									{authInfo?.user?.current_organization === org?._id && <HiOutlineCheckCircle className="w-6 h-6 text-primary" />}
								</div>
							</Card>
						)}
					</div>
				</div>
			</Card >
		</div >
	);
};

export default Profile;
