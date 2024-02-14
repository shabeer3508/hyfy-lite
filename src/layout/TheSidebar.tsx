import { memo, useEffect, useState } from "react";
import _nav from "./_nav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { NavItem, NavItemDivider, NavItemDropdown, NavItemTitle } from "./SidebarNavItems/NavItems";
import logo from "../assets/hyfy_logo.svg";
// import SidebarReducer from "../redux/reducers/SidebarReducer";

interface TheSidebarProps {
	onClickClose: () => void;
}

const TheSidebar = ({ onClickClose }: TheSidebarProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [index, setIndex] = useState(3);

	const sidebar = useSelector((state: any) => state.SidebarReducer);
	const minimize = sidebar.minimize;

	let navItems = _nav;

	return (
		<div className={`flex h-screen flex-col ltr:border-r-1 rtl:border-l-1 bg-[#16181D]`}>
			<div
				className={`flex h-20 flex-shrink-0 relative  border-r flex-col  items-center justify-center  dark:text-white`}
			>
				<div className="h-7 relative mb-1 flex">
					{minimize ? (
						<img className=" h-9 w-10 " src={logo} alt="logo" />
					) : (
						<img className=" h-9 w-20 " src={logo} alt="logo" />
					)}
				</div>
				<div className="visible md:invisible absolute  ">
					<Button variant="outline" className=" w-5 h-5 p-0 rounded-full " onClick={onClickClose}>
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
				<div className=" mx-2 -mt-[1px]"></div>
				<div className={`${minimize ? "items-center p-0 px-0 pt-4" : ""} flex flex-col gap-2 `}>
					{navItems.map((item, idx) => {
						// if (item._tag === "NavItemDropdown") {
						// 	return (
						// 		<NavItemDropdown
						// 			show={idx === index}
						// 			onClick={() => {
						// 				setIndex(index == idx ? -1 : idx);
						// 			}}
						// 			key={`ni_${idx}`}
						// 			item={item}
						// 			minimize={minimize}
						// 		/>
						// 	);
						// }
						// if (item._tag === "NavDivider") {
						// 	return <NavItemDivider key={`ni_${idx}`} />;
						// }
						// if (item?._tag === "NavTitle") {
						// 	return (
						// 		<NavItemTitle
						// 			key={`nit_${idx}`}
						// 			item={item}
						// 			minimize={minimize}
						// 		/>
						// 	);
						// }
						return (
							<NavItem onClick={() => setIndex(idx)} key={`ni_${idx}`} item={item} minimize={minimize} />
						);
					})}
				</div>
			</div>
			<div className="relative border-r  flex h-11 flex-shrink-0 items-center justify-center  p-5 dark:border-line_dark">
				{/* {!minimize && (
					<div className="text-slate-80 rounded-full bg-slate-400/10 px-3 py-1 text-[10px] md:text-xs font-semibold dark:text-slate-400">
						v1.0.0 - beta
					</div>
				)} */}
				<div
					onClick={() => dispatch({ type: "minimize", minimize: !minimize })}
					className={`${!minimize && "right-2"} dark:text-foreground  cursor-pointer text-xs rounded-lg  p-1`}
				>
					{minimize ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
				</div>
			</div>
		</div>
	);
};

export default memo(TheSidebar);
