import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbSettingsFilled } from "react-icons/tb";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import Urls from "@/redux/actions/Urls";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";

const BoardTemplates = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reducerName = reducerNameFromUrl("boardTemplates", "GET");
    const templateList = useSelector((state: any) => state?.[reducerName]);

    console.log("🚀 ~ BoardTemplates ~ templateList:", templateList)

    const getTemplates = () => {
        dispatch(getAction({ boardTemplates: Urls.board_templates }));
    }

    useEffect(() => {
        getTemplates();
    }, [])

    return (
        <div>
            <div className="flex ml-6 items-center min-h-10 gap-3 ">
                <div
                    onClick={() => navigate("/settings")}
                    className="flex  hover:text-[#3E72F8] items-center gap-3 cursor-pointer"
                >
                    <div className="mt-0.5">
                        <TbSettingsFilled className="size-5" />
                    </div>
                    <div className="text-[#737377] text-xl font-medium">Settings</div>
                </div>

                <div className="items-center flex mt-1">
                    <MdKeyboardArrowRight className="size-5 text-[#737377] " />
                </div>
                <div className="text-xl">Board Templates</div>
            </div>
        </div>
    );
};
export default BoardTemplates;
