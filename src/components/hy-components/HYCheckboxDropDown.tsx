import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const HYDropdownMenuCheckbox = ({
	children,
	showInnerLabel = false,
	innerLabel,
}: {
	children: React.ReactNode;
	showInnerLabel?: boolean;
	innerLabel?: string;
}) => {
	const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
	const [showPanel, setShowPanel] = React.useState<Checked>(false);
	const [showPanel2, setShowPanel2] = React.useState<Checked>(false);
	const [showPanel3, setShowPanel3] = React.useState<Checked>(false);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 dark:bg-[#111215]" >
				{showInnerLabel && (
					<>
						<DropdownMenuLabel>{innerLabel}</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				)}

				<DropdownMenuCheckboxItem
					className="cursor-pointer"
					checked={showStatusBar}
					onCheckedChange={setShowStatusBar}
				>
					All
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					className="cursor-pointer"
					checked={showPanel}
					onCheckedChange={setShowPanel}
				>
					In Progress
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					className="cursor-pointer"
					checked={showPanel2}
					onCheckedChange={setShowPanel2}
				>
					Open
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					className="cursor-pointer"
					checked={showPanel3}
					onCheckedChange={setShowPanel3}
				>
					Closed
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default HYDropdownMenuCheckbox;
