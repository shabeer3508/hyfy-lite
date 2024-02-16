import userIcon from "../assets/icons/header-icons/icon_user.svg";
import helpIcon from "../assets/icons/header-icons/icon_help.svg";
import notiIcon from "../assets/icons/header-icons/icon_notification.svg";
import ModeToggle from "@/components/mode-toggle";
import HYSearch from "@/components/HYComponents/HYSearch";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import { LogOut, Settings, User } from "lucide-react";
import pb from "@/lib/pocketbase";
import { useNavigate } from "react-router-dom";

interface TheHeaderProps {
	onClickMenu?: () => void;
}

const TheHeader = ({ onClickMenu }: TheHeaderProps) => {
	const navigate = useNavigate();
	const logoutUser = () => {
		pb.authStore.clear();
		navigate("/login");
	};

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

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<img
								src={userIcon}
								alt="user icon"
								className="h-5 cursor-pointer"
							/>
						</DropdownMenuTrigger>
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
