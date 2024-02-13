// import { Bars3Icon, Bars3BottomLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
// import HeaderDropdown from "./Header/HeaderDropdown";
import { useLocation, useNavigate } from "react-router-dom";
// import { setDarkMode, setDirection } from "../redux/actions/AppActions";
// import { AppState } from "../redux/reducers/AppReducer";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TheHeaderProps {
	variant?: "" | "ghost" | "outline";
	age?: number;
	onClick?: () => void;
	onClickMenu: () => void;
}

const TheHeader = ({ onClickMenu }: TheHeaderProps) => {
	const dispatch = useDispatch();
	const sidebar = useSelector((state: any) => state.SidebarReducer);
	// const appData = useSelector((state: any) => state.AppReducer) as AppState;
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className="w-full transition-all duration-200 ease-in ">
			<div className="flex h-12 items-center border-b border-border_line pl-2 pr-6 dark:border-line_dark">
				<Button
					variant="link"
					onClick={onClickMenu}
					className=" cursor-pointer"
				>
					{/* <Bars3Icon className="h-5  " /> */}
				</Button>
				{/* <div className=" flex items-center text-sm">
          <Button variant="link" onClick={() => navigate("/dashboard")} className="cursor-pointer select-none capitalize">
            {t("dashboard")}
          </Button>
          <Button variant="link" onClick={() => navigate("/settings")} className="cursor-pointer capitalize">
            {t("settings")}
          </Button>
        </div> */}
				<div className="flex grow items-center justify-end gap-3 ">
					{/* <Button
            className="hover:animate-pulse h-9 px-1"
            variant="outline"
            onClick={() => dispatch(setDirection(appData.dir === "ltr" ? "rtl" : "ltr"))}
          >
            {appData.dir === "rtl" ? (
              <Bars3BottomLeftIcon className="aspect-square h-4" />
            ) : (
              <Bars3BottomRightIcon className="aspect-square h-4" />
            )}
          </Button> */}
					{/* <LocaleSelector /> */}
					<Button
						variant="link"
						title="Toggle dark mode"
						onClick={
							() => {}
							// dispatch(
							// 	setDarkMode(
							// 		appData.mode === "dark" ? "light" : "dark"
							// 	)
							// )
						}
						className="hover:animate-pulse h-9 "
					>
						{/* {appData.mode === "dark" ? (
							<SunIcon className=" text-white h-4 w-4" />
						) : (
							<MoonIcon className="h-4 w-4" />
						)} */}
					</Button>
					{/* <HeaderDropdown /> */}
				</div>
			</div>
			{/* <div className=" bg-orange-600 text-white text-xs  text-center font-medium py-[2px]">You are offline</div> */}
			{/* <Breadcrumbs /> */}
		</div>
	);
};

export default TheHeader;
