import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { Value } from "@radix-ui/react-select";
import { UseFormReturn } from "react-hook-form";

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
	label?: string;
	options: any;
	name?: string;
	buttonClassName?: string;
	optionsClassName?: string;
	onValueChange?: any;
	showSearch?: boolean;
	defaultValue?: string;
	form?: UseFormReturn<any>;
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-[200px] px-3 justify-between ${buttonClassName} `}
				>
					{label && (
						<span className="whitespace-nowrap text-[#9499A5]">
							{label}
						</span>
					)}
					<span className="w-1/2 truncate">
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
						{options.map((opt) => (
							<CommandItem
								key={opt.value}
								value={opt.value}
								onSelect={(currentValue) => {
									setValue(
										currentValue === value
											? ""
											: currentValue
									);
									onValueChange?.(
										currentValue === value
											? ""
											: currentValue
									);
									form?.setValue(id, currentValue);
									setOpen(false);
								}}
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
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
