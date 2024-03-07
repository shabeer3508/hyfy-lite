import Cookies from "js-cookie"
import { useEffect } from "react";
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";
import TheContent from "./TheContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const TheLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = Cookies.get("hyfy_auth_token");
	const sidebar = useSelector((state: any) => state.SidebarReducer);

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [])

	if (!token) {
		return <></>
	}

	return (
		<div className="flex h-screen transform-gpu scrollbar-hide dark:bg-[#111215] ">
			<div
				className={`hidden md:block 
					${sidebar.sidebarShow ? "translate-x-0" : " -translate-x-full md:translate-x-0"}  
					absolute shadow-2xl md:shadow-none z-50 bg-white dark:bg-slate-950 md:dark:bg-black  md:relative print:hidden  
					${sidebar.minimize ? "w-16" : "w-[219px]"} 
					transform-gpu transition-all duration-300 ease-in 
					${sidebar.sidebarShow ? "ml-0" : `${sidebar.minimize ? "-ml-16" : "-ml-[219px]"}`}`
				}
			>
				<TheSidebar onClickClose={() => dispatch({ type: "set", sidebarShow: false })} />
			</div>
			<div className="relative flex grow flex-col ">
				<div className=" left-0 right-0 top-0 z-40 print:hidden ">
					<TheHeader />
				</div>
				<div className="flex grow transform-gpu flex-col overflow-clip">
					<TheContent />
				</div>
			</div>
		</div>
	);
};

export default TheLayout;
