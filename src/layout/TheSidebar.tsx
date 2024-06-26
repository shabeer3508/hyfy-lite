import _nav from "./_nav";
import { memo, useState } from "react";
import logo from "../assets/hyfy_logo.svg";
import { NavItem } from "./sidebar-nav-items/NavItems";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";


interface TheSidebarProps {
	onClickClose: () => void;
}

const TheSidebar = ({ onClickClose }: TheSidebarProps) => {
	const dispatch = useDispatch();

	const [index, setIndex] = useState(3);

	const sidebar = useSelector((state: any) => state.SidebarReducer);
	const minimize = sidebar.minimize;

	const navItems = _nav?.filter((navItm: any) => {
		return true;
	});

	return (
		<div className={`flex h-screen flex-col ltr:border-r-1 rtl:border-l-1 dark:bg-[#16181D]`}>
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
				{/* <div className="visible md:invisible absolute  ">
					<Button variant="outline" className=" w-5 h-5 p-0 rounded-full " onClick={onClickClose}>
						<ChevronLeft />
					</Button>
				</div> */}
			</div>

			<div className="   flex-1 overflow-y-auto border-r scrollbar-hide">
				{/* <div className=" mx-2 -mt-[1px]"></div> */}
				<div className={`${minimize ? "items-center p-0 px-0" : ""} flex flex-col gap-2 `}>
					{navItems.map((item, idx) => <NavItem onClick={() => setIndex(idx)} key={`ni_${idx}`} item={item} minimize={minimize} />)}
				</div>
			</div>
			<div className="relative border-r  flex h-11 flex-shrink-0 items-center justify-center  p-5 dark:border-line_dark">
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
