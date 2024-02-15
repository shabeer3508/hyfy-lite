import userIcon from "../assets/icons/header-icons/icon_user.svg";
import helpIcon from "../assets/icons/header-icons/icon_help.svg";
import notiIcon from "../assets/icons/header-icons/icon_notification.svg";
import ModeToggle from "@/components/mode-toggle";
import HYSearch from "@/components/SBComponents/HYSearch";

// interface TheHeaderProps {
// 	onClickMenu?: () => void;
// }

const TheHeader = () => {
	return (
		<div className="w-full transition-all duration-200 ease-in ">
			<div className="flex h-20 items-center px-6">
				{/* <Button
					variant="link"
					onClick={onClickMenu}
					className=" cursor-pointer"
				></Button> */}

				<div className="font-semibold  flex items-center  dark:text-foreground">Project Name</div>
				<div className="flex grow items-center justify-end gap-5 dark:text-foreground">
					<HYSearch />
					<ModeToggle />
					<img src={notiIcon} alt="notification icon" className="h-5 cursor-pointer" />
					<img src={helpIcon} alt="help icon" className="h-5 cursor-pointer" />
					<img src={userIcon} alt="user icon" className="h-5 cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

export default TheHeader;
