import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { LogOut, Settings, User } from "lucide-react";
import HYAvatar from "@/components/HYComponents/HYAvatar";
import helpIcon from "../assets/icons/header-icons/icon_help.svg";
import notiIcon from "../assets/icons/header-icons/icon_notification.svg";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HYSearch from "@/components/HYComponents/HYSearch";

const TheHeader = () => {
	const navigate = useNavigate();

	const logoutUser = () => {
		localStorage.removeItem("hyfy_auth_token");
		navigate("/login");
	};

	return (
		<div className="w-full transition-all duration-200 ease-in ">
			<div className="flex h-20 items-center px-6">
				<div className="font-semibold  flex items-center  dark:text-foreground">
					Project Name
				</div>
				<div className="flex grow items-center justify-end gap-5 dark:text-foreground">
					<HYSearch />
					<ModeToggle />
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
					<Button
						onClick={() => navigate("/profile")}
						variant="ghost"
					>
						<HYAvatar
							className=" size-8 "
							url="https://github.com/shadcn.png"
							name={"John Doe"}
						/>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild></DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
									<DropdownMenuShortcut>
										⇧⌘P
									</DropdownMenuShortcut>
								</DropdownMenuItem>

								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
									<DropdownMenuShortcut>
										⌘S
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => logoutUser()}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
};

export default TheHeader;
