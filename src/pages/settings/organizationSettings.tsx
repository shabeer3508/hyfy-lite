import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OrganizationSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex  text-lg ml-6 mt-2 items-center ">
      <MdKeyboardArrowLeft
        onClick={() => navigate("/settings")}
        className="h-7 w-7 cursor-pointer  "
      />
      <h5 className="text-[#737377] text-xl">Settings</h5>
      <MdKeyboardArrowRight className="w-7 h-7 " />
      <h5 className=" text-xl">Organization</h5>
    </div>
  );
};
export default OrganizationSettings;
