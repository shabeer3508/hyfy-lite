import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
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

interface MenuOption {
	label: string;
	value: string;
}

export function HYCombobox({
	id,
	name,
	label,
	form,
	options,
	defaultValue,
	onValueChange,
	buttonClassName,
	optionsClassName,
	showSearch = false,
	unSelectable = false,
	disable = false,
}: {
	id?: string;
	label?: any;
	disable?: boolean;
	name?: string;
	options: MenuOption[];
	buttonClassName?: string;
	optionsClassName?: string;
	onValueChange?: any;
	showSearch?: boolean;
	defaultValue?: string;
	form?: UseFormReturn<any>;
	updateList?: () => void; // TODO: use this for updating the paginated list
	unSelectable?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleOnSelect = (currentValue: string) => {
		if (unSelectable) {
			setValue(currentValue === value ? "" : currentValue);
			onValueChange?.(currentValue === value ? "" : currentValue);
			form?.setValue(id, currentValue);
		} else {
			setValue(currentValue);
			onValueChange?.(currentValue);
			form?.setValue(id, currentValue);
		}
		setOpen(false);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disable}
					variant={"outline"}
					role="combobox"
					aria-expanded={open}
					onClick={(e) => e.stopPropagation()}
					className={`w-[200px] px-3 justify-between dark:bg-[#111215] border-border text-xs  ${buttonClassName} `}
				>
					{label && (
						<span className="whitespace-nowrap text-[#9499A5] mr-2">
							{label}
						</span>
					)}
					<span className="w-1/2 truncate capitalize text-start">
						{value
							? options.find((opt) => opt.value === value)?.label
							: `Select ${name ?? ""}..`}
					</span>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={`w-[200px] p-0 ${optionsClassName}`} onClick={e => e.stopPropagation()}>
				<Command className="dark:bg-[#111215]">
					{showSearch && (<CommandInput placeholder={`Search  ${name ?? ""}..`} />)}
					<CommandEmpty>No options found.</CommandEmpty>
					<CommandGroup>
						<ScrollArea className={`${options?.length > 6 && "max-h-[20vh] h-[20vh]"}`}>

							{options?.length === 0 && <CommandItem className="text-center w-full">No options found</CommandItem>}

							{options.map((opt) => (
								<CommandItem
									key={opt.value}
									value={opt.value}
									className="capitalize text-xs cursor-pointer"
									onSelect={(currentValue) => handleOnSelect(currentValue)}
								>
									<Check className={cn("mr-2 h-4 w-4", value === opt.value ? "opacity-100" : "opacity-0")} />
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
