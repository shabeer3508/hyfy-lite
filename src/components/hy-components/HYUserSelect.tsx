import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import Urls from "@/redux/actions/Urls";
import { UsersTypes } from "@/interfaces";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

export function HYUserSelect({
    id,
    label,
    onValueChange,
    buttonClassName,
    optionsClassName,
    showSearch = false,
}: {
    id?: string;
    label?: any;
    buttonClassName?: string;
    optionsClassName?: string;
    onValueChange?: any;
    showSearch?: boolean;
}) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
    const usersReducerName = reducerNameFromUrl("users", "GET");
    const usersListData = useSelector((state: any) => state?.[usersReducerName])?.data?.items as UsersTypes[];

    const options = usersListData?.map(user => ({ label: user?.user_name, value: user?._id, role: user?.role }))

    const getUsers = () => {
        let query = `?perPage=300`;
        dispatch(getAction({ users: Urls.users + query }));
    };

    const handleOnSelect = (currentValue: string) => {
        const currentUser = usersListData?.find(user => user._id === currentValue)
        currentUser && onValueChange?.(currentUser);
        setOpen(false);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    onClick={(e) => e.stopPropagation()}
                    className={`w-[200px] px-3 justify-between dark:bg-card border-border text-xs  ${buttonClassName} `}
                >
                    {label && (
                        <span className="whitespace-nowrap text-[#9499A5] mr-2">
                            {label}
                        </span>
                    )}
                    <span className="w-1/2 truncate capitalize text-start">
                        Select user
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-[400px] p-0 ${optionsClassName}`} onClick={e => e.stopPropagation()}>
                <Command>
                    {showSearch && (<CommandInput className="" placeholder={`Search User...`} />)}
                    <CommandEmpty>No options found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className={`${options?.length > 6 && "max-h-[20vh] h-[20vh]"}`}>

                            {options?.length === 0 && <CommandItem className="text-center w-full">No users found</CommandItem>}

                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.value}
                                    className="capitalize text-xs cursor-pointer flex justify-between"
                                    onSelect={(currentValue) => handleOnSelect(currentValue)}
                                >
                                    <span> {opt.label}</span>
                                    <span className="text-[10px]"> {opt.role}</span>
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
