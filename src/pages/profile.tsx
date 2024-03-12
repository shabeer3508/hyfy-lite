import { toast } from "sonner";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Urls from "@/redux/actions/Urls";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { clearUser, getAction, patchAction, reducerNameFromUrl, resetAppInfo, setCurrentUser } from "@/redux/actions/AppActions";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const profileReducerName = reducerNameFromUrl("profile", "GET");
	const profileReduxInfo = useSelector((state: any) => state?.[profileReducerName]);
	const profileInfo = profileReduxInfo?.data?.data

	/*  ######################################################################################## */

	const getProfileInfo = () => {
		dispatch(getAction({ profile: Urls.profile }));
	}

	const logoutUser = () => {
		Cookies.remove("hyfy_auth_token");
		navigate("/login");
		dispatch(clearUser())
		dispatch(resetAppInfo())
	};

	const handleOrganizationChange = async (selectedOrgId: string) => {
		const resp = (await dispatch(
			patchAction({ organization: Urls.organization + "/switch" }, {}, selectedOrgId)
		)) as any;

		const success = resp.payload.status == 200;
		if (success) {
			Cookies.set('hyfy_auth_token', resp.payload?.data?.data?.token, { expires: 2, secure: true })
			dispatch(setCurrentUser(resp?.payload?.data?.data?.user));
			dispatch(resetAppInfo())
			getProfileInfo();
			toast.success("Organization Changed Successfully");
		}
	}

	/*  ######################################################################################## */

	useEffect(() => {
		getProfileInfo();
	}, []);

	/*  ######################################################################################## */


	return (
		<div className="dark:text-foreground flex flex-col h-full items-center px-6 pb-5 ">
			<Card className="w-full flex-1 flex py-14 dark:bg-[#16181D] bg-[#F7F8F9]">
				<div className="w-1/3 flex flex-col justify-center items-center flex-1 border-r">
					<HYAvatar
						className="size-32"
						url="https://github.com/shadcn.png"
						name={profileInfo?.user_name}
					/>
					<h1 className="text-2xl font-bold mt-6">{profileInfo?.user_name}</h1>
					<p className="text-base font-bold text-gray-500">{profileInfo?.email}</p>
					<p className="text-sm text-gray-500 mt-1 capitalize">
						({profileInfo?.role})
					</p>
					<Button
						onClick={logoutUser}
						variant="destructive"
						className="text-xl mt-10 p-5 border dark:border-destructive hover:dark:text-destructive rounded"
					>
						Logout
					</Button>
				</div>
				<div className="w-2/3 flex gap-5 flex-col justify-center p-10">
					<div className="text-xl text-primary">My Organizations</div>
					<div className="flex flex-col gap-3 max-h-[50vh] overflow-auto pr-2">
						{profileInfo?.organizations?.map((org) =>
							<Card
								key={`ORG_${org?._id}`}
								className="p-7 flex justify-between items-center cursor-pointer"
								onClick={() => profileInfo?.org_id !== org?._id && handleOrganizationChange(org?._id)}
							>
								<div>
									<div className="text-sm">{org?.name}</div>
									<div className="text-xs">{org?.branch}</div>
								</div>
								<div>
									{profileInfo?.org_id === org?._id && <HiOutlineCheckCircle className="w-6 h-6 text-primary" />}
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
