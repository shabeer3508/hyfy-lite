import { useState } from "react"
import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
    value: string
    label: string
    icon?: IconType | LucideIcon
}

interface ComboboxPopoverProps {
    options: Status[],
    placeholder?: string,
    children: React.ReactNode,
    onChange: (data: Status | null) => void,
}

const ComboboxPopover: React.FC<ComboboxPopoverProps> = ({ children, placeholder, options, onChange }) => {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    {children}
                </PopoverTrigger>
                <PopoverContent className="p-0" side="right" align="start">
                    <Command >
                        <CommandInput className="text-xs" placeholder={placeholder} />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        className="cursor-pointer"
                                        value={`${option.label} value=${option.value}`}
                                        onSelect={(currentValue) => {
                                            const value = currentValue?.split('value=')[1];

                                            setSelectedStatus(options.find((priority) => priority.value === value) || null);
                                            onChange(options.find((priority) => priority.value === value) || null);
                                            setOpen(false)
                                        }}
                                    >
                                        {option?.icon && <option.icon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                option.value === selectedStatus?.value
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            )}
                                        />
                                        }
                                        <span className="capitalize text-xs">
                                            {option.label}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div >
    )
}

export default ComboboxPopover
