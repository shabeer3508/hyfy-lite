import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HYDialog from "./HYDialog";

interface DropdownMenuOption {
	label: string;
	action?: () => void;

	isTriggerDialog?: boolean;
	dialogContent?: any;
	dialogClassName?: string;
}

const HYDropDown = ({
	children,
	options,
}: {
	children: any;
	options: DropdownMenuOption[];
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{options?.map((opt, index) => {
					if (opt?.isTriggerDialog) {
						return (
							<HYDialog content={opt?.dialogContent} className={opt?.dialogClassName}>
								<DropdownMenuItem
									key={`_${index}_`}
									onSelect={(event) => event.preventDefault()}
									className="cursor-pointer"
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
								className="cursor-pointer"
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
