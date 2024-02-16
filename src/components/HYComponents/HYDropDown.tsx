import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuOption {
	label: string;
	action: () => void;
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
				{options?.map((opt) => {
					return (
						<DropdownMenuItem
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
