import HYAvatar from "@/components/SBComponents/HYAvatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import Urls from "@/redux/actions/Urls";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const reducerName = reducerNameFromUrl("profile", "GET");
	const profileRep = useSelector((state: any) => state?.[reducerName]);

	useEffect(() => {
		loadAction();
	}, []);

	function loadAction(prams?: string) {
		let query = "";
		if (prams) {
			query = query + prams;
		}
		dispatch(getAction({ profile: Urls.profile + query }));
	}

	const logoutUser = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	console.log(`profile,  : profileRep`, profileRep);

	return (
		<div className="dark:text-foreground flex flex-col h-full items-center p-10">
			<Card className=" w-2/3 flex-1 flex flex-col items-center justify-center p-14">
				<HYAvatar className=" size-32 " url="https://github.com/shadcn.png" name={"John Doe"} />
				<h1 className="text-2xl font-bold mt-6">John Doe</h1>
				<p className="text-sm text-gray-500 mt-1">Full Stack Developer</p>
				<Button onClick={logoutUser} variant="ghost" className="text-xl text-red-500 mt-10">
					Logout
				</Button>
			</Card>
		</div>
	);
};

export default Profile;
