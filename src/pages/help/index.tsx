import { useDispatch } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import HYSearch from "@/components/hy-components/HYSearch";
import { setHelpScreen } from "@/redux/actions/AppActions";


const HelpSidebar = ({ show }: { show: boolean }) => {

    const dispatch = useDispatch();
    const { pathname } = useLocation();

    if (!show) {
        return <></>
    }

    return (
        <div className="border mx-2 mb-2 rounded w-[300px] overflow-hidden text-foreground text-xs">
            <div className="bg-[#F1F2F4] dark:bg-[#23252A] p-1 flex flex-col items-center gap-2 pb-4">
                <div className="flex w-full justify-end">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer size-10"
                        onClick={() => dispatch(setHelpScreen(false))}
                    >
                        <HiMiniXMark className="size-4 " />
                    </Button>
                </div>
                <div>Help</div>
                <div>
                    <HYSearch className="bg-white" />
                </div>
            </div>

            <div className="flex justify-center h-full items-center w-full text-wrap px-4">
                {/* TODO: Create page wise help article screens components and display here  */}
                No content available for {pathname}
            </div>

            <div className="sticky bottom-0 h-20 bg-[#F1F2F4] dark:bg-[#23252A] flex flex-col justify-center space-y-2 text-[11px]">
                <div className="flex justify-around px-2 ">
                    <div className="cursor-pointer">About hyfy</div>
                    <div className="cursor-pointer">Terms of use</div>
                    <div className="cursor-pointer">Privacy policy</div>
                </div>
                <div className="flex justify-center">Version : 0.5 beta</div>
            </div>
        </div>
    )
}

export default HelpSidebar
