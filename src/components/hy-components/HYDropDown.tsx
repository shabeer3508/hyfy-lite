import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HYDialog from "./HYDialog";
import HYAlertDialog from "./HYAlertDialog";

interface DropdownMenuOption {
	label: string;
	action?: (e?: any) => void;

	// Alert Dialog
	isAlertDialog?: boolean;
	description?: string;
	closeText?: string;
	title?: string;

	// Custom Dialog
	isTriggerDialog?: boolean;
	dialogContent?: any;
	dialogClassName?: string;
}

const HYDropDown = ({
	children,
	options,
}: {
	children: React.ReactNode;
	options: DropdownMenuOption[];
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="dark:bg-[#111215]">
				{options?.map((opt, index) => {

					if (opt?.isAlertDialog) {
						return (
							<HYAlertDialog key={`_${index}_`} submitAction={() => opt?.action()} >
								<DropdownMenuItem
									onSelect={(event) => {
										event.preventDefault();
									}}
									className="cursor-pointer text-xs"
								>
									{opt?.label}
								</DropdownMenuItem>
							</HYAlertDialog>
						)
					}
					else if (opt?.isTriggerDialog) {
						return (
							<HYDialog key={`_${index}_`} content={opt?.dialogContent} className={opt?.dialogClassName}>
								<DropdownMenuItem
									onSelect={(event) => {
										event.preventDefault();
									}}
									className="cursor-pointer text-xs"
								>
									{opt?.label}
								</DropdownMenuItem>
							</HYDialog>
						)
					} else
						return (
							<DropdownMenuItem
								key={`_${index}_`}
								onClick={opt?.action}
								className="cursor-pointer text-xs"
							>
								{opt?.label}
							</DropdownMenuItem>
						);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default HYDropDown;
