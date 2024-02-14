import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import userIcon from "../assets/icons/header-icons/icon_user.svg";
import helpIcon from "../assets/icons/header-icons/icon_help.svg";
import notiIcon from "../assets/icons/header-icons/icon_notification.svg";

interface TheHeaderProps {
	onClickMenu: () => void;
}

const TheHeader = ({ onClickMenu }: TheHeaderProps) => {
	return (
		<div className="w-full transition-all duration-200 ease-in ">
			<div className="flex h-20 items-center px-6">
				{/* <Button
					variant="link"
					onClick={onClickMenu}
					className=" cursor-pointer"
				></Button> */}
				<div className="font-semibold  flex items-center  dark:text-foreground">
					Project Name
				</div>
				<div className="flex grow items-center justify-end gap-5 dark:text-foreground">
					<div className="flex items-center bg-background pr-3 rounded border">
						<Input
							className=" outine-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
							placeholder="Search"
						/>
						<IoIosSearch />
					</div>
					<img
						src={notiIcon}
						alt="notification icon"
						className="h-5 cursor-pointer"
					/>
					<img
						src={helpIcon}
						alt="help icon"
						className="h-5 cursor-pointer"
					/>
					<img
						src={userIcon}
						alt="user icon"
						className="h-5 cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default TheHeader;
