import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";

interface MenuOption {
	label: string;
	value: string;
}

export function HYCombobox({
	id,
	options,
	name,
	buttonClassName,
	optionsClassName,
	onValueChange,
	showSearch = false,
	label,
	defaultValue,
	form,
}: {
	id?: string;
	label?: any;
	options: MenuOption[];
	name?: string;
	buttonClassName?: string;
	optionsClassName?: string;
	onValueChange?: any;
	showSearch?: boolean;
	defaultValue?: string;
	disableUnSelect?: boolean;
	form?: UseFormReturn<any>;
	updateList?: () => void; // TODO: use this for updating the paginated list
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleOnSelect = (currentValue: string) => {
		setValue(currentValue === value ? "" : currentValue);
		onValueChange?.(currentValue === value ? "" : currentValue);
		form?.setValue(id, currentValue);
		setOpen(false);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-[200px] px-3 justify-between dark:bg-[#111215] ${buttonClassName} `}
				>
					{label && (
						<span className="whitespace-nowrap text-[#9499A5]">
							{label}
						</span>
					)}
					<span className="w-1/2 truncate capitalize">
						{value
							? options.find((opt) => opt.value === value)?.label
							: `Select ${name ?? ""}..`}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={`w-[200px] p-0 ${optionsClassName}`}>
				<Command>
					{showSearch && (
						<CommandInput placeholder={`Search  ${name ?? ""}..`} />
					)}
					<CommandEmpty>No options found.</CommandEmpty>
					<CommandGroup>
						<ScrollArea
							className={`${options?.length > 6 && "max-h-[20vh] h-[20vh]"
								}`}
						>

							{options?.length === 0 && <CommandItem className="text-center w-full">No options found</CommandItem>}

							{options.map((opt) => (
								<CommandItem
									className="capitalize"
									key={opt.value}
									value={opt.value}
									onSelect={(currentValue) => handleOnSelect(currentValue)}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === opt.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									{opt.label}
								</CommandItem>
							))}
						</ScrollArea>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
