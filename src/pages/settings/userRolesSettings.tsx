import { Button } from "@/components/ui/button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TbSettingsFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const UserRolesSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex  text-lg ml-6 mt-2 items-end ">
      <Button
        onClick={() => navigate("/settings")}
        variant="ghost"
        className=" h-7 items-center hover:text-[#3E72F8]"
      >
        <TbSettingsFilled className="size-5" />
        <h5 className="ml-4 text-[#737377] text-xl">Settings</h5>
      </Button>
      <MdKeyboardArrowRight className="text-[#737377] size-5 " />
      <h5 className=" text-xl ml-2">User Roles</h5>
    </div>
  );
};
export default UserRolesSettings;
