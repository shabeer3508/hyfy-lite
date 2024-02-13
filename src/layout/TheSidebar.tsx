// import { ChevronLeftIcon, ChevronRightIcon, CogIcon } from "@heroicons/react/24/outline";
import { memo, useEffect, useState } from "react";
import _nav from "./_nav";
// import {
// 	NavItem,
// 	NavItemTitle,
// 	NavItemDivider,
// 	NavItemDropdown,
// } from "./SidebarNavItems/NavItems";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { getUserComapanies } from "../redux/actions/NetworkActions";
// import { getUserProfile } from "../redux/actions/NetworkActions";
// import { getAction, setCurrency } from "../redux/actions/AppActions";
// import { onShotKeyDown } from "../utils/ShortKeyManager";
// import Urls from "../redux/actions/Urls";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
// import logo from "../assets/logo.svg";
// import SidebarReducer from "../redux/reducers/SidebarReducer";

interface TheSidebarProps {
	onClickClose: () => void;
}

const TheSidebar = ({ onClickClose }: TheSidebarProps) => {
	const dispatch = useDispatch();
	const sidebar = useSelector((state: any) => state.SidebarReducer);
	const comapanies = useSelector((state: any) => state?.GetUserCompanies);
	const minimize = sidebar.minimize;
	const [index, setIndex] = useState(3);
	const navigate = useNavigate();
	const profile = useSelector((state: any) => state.GetProfile);

	//   useEffect(() => {
	//     // dispatch(getAction({ profile: Urls.profile }));
	//   }, []);

	//   const user = profile?.data?.items?.[0];
	//   const currentOganization = user?.expand?.currentOganization;

	//   const logUrl = `${Urls.cdnUrl}/${currentOganization?.collectionId}/${currentOganization?.id}/${currentOganization?.logo}`;

	let navItems = _nav;

	//   if (user?.role === "driver") {
	//     const driverpaths = ["/vehicles", "/requests", "/profile", "/odometer-readings", "/photo-docs", "/notifications"];
	//     navItems = _nav.filter((item: any) => driverpaths.includes(item.path));
	//   }

	return (
		<div className={`flex h-screen flex-col ltr:border-r-1 rtl:border-l-1`}>
			<div
				className={`flex h-12 flex-shrink-0 relative  border-b border-r flex-col  items-center justify-center  dark:text-white`}
			>
				<div className="h-7 relative">
					{/* {minimize ? (
						<img className=" h-7 w-7 ml-2" src={logo} alt="logo" />
					) : (
						<img className=" h-7 w-7" src={logo} alt="logo" />
					)} */}
				</div>
				<div className=" visible md:invisible  absolute right-3 ">
					<Button
						variant="outline"
						className=" w-8 h-8 p-0 rounded-full "
						onClick={onClickClose}
					>
						<ChevronLeft />
					</Button>
				</div>
			</div>

			<div className="   flex-1 overflow-y-auto border-r scrollbar-hide">
				{/* {!minimize && (
          <div
            onClick={() => navigate("/profile")}
            className={`flex border-b h-14 cursor-pointer items-center gap-3 text-black hover:bg-highlight  dark:text-white`}
          >
            {!minimize && (
              <div className=" flex flex-1 flex-col justify-center px-4">
                <div className=" text-[10px] md:text-sm font-semibold">{user?.name || user?.username}</div>
                <div className="truncate text-[10px]">
                  <a className="truncate">{user?.email}</a>
                </div>
              </div>
            )}
          </div>
        )} */}
				<div className=" mx-2 -mt-[1px] border-b-1 dark:border-line_dark"></div>
				<div
					className={`${
						minimize ? "items-center p-0 px-0 pt-4" : "p-4 px-3"
					} flex flex-col gap-2 `}
				>
					{/* {navItems.map((item, idx) => {
						if (item._tag === "NavItemDropdown") {
							return (
								<NavItemDropdown
									show={idx === index}
									onClick={() => {
										setIndex(index == idx ? -1 : idx);
									}}
									key={`ni_${idx}`}
									item={item}
									minimize={minimize}
								/>
							);
						}
						if (item._tag === "NavDivider") {
							return <NavItemDivider key={`ni_${idx}`} />;
						}
						if (item?._tag === "NavTitle") {
							return (
								<NavItemTitle
									key={`nit_${idx}`}
									item={item}
									minimize={minimize}
								/>
							);
						}
						return (
							<NavItem
								onClick={() => setIndex(idx)}
								key={`ni_${idx}`}
								item={item}
								minimize={minimize}
							/>
						);
					})} */}
				</div>
			</div>
			<div className="relative border-r border-t flex h-11 flex-shrink-0 items-center justify-center border-t-1 p-5 dark:border-line_dark">
				{!minimize && (
					<div className="text-slate-80 rounded-full bg-slate-400/10 px-3 py-1 text-[10px] md:text-xs font-semibold dark:text-slate-400">
						v1.0.0
					</div>
				)}
				<div
					onClick={() =>
						dispatch({ type: "minimize", minimize: !minimize })
					}
					className={`${
						!minimize && "right-2"
					} dark:text-white absolute cursor-pointer rounded-lg  p-1`}
				>
					{/* {minimize ? (
						<ChevronRightIcon className="h-4 w-4" />
					) : (
						<ChevronLeftIcon className="h-4 w-4" />
					)} */}
				</div>
			</div>
		</div>
	);
};

export default memo(TheSidebar);
