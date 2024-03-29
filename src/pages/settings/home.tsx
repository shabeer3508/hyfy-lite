import { HiBell } from "react-icons/hi";
import { BiColumns } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiUser, HiBuildingLibrary } from "react-icons/hi2";
import { TbReceipt, TbSettingsFilled } from "react-icons/tb";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="dark:text-foreground h-screen ml-6 gap-6">
      <div className="flex items-center min-h-10 gap-3 ">
        <div className="flex  hover:text-[#3E72F8] items-center gap-3 select-none">
          <div className="mt-0.5">
            <TbSettingsFilled className="size-5" />
          </div>
          <div className="text-[#737377] text-xl font-medium">Settings</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 my-6 xl:w-2/3 mr-6 xl:mr-0 ">
        <Card
          onClick={() => navigate("/settings/organization")}
          className="flex justify-between items-center  min-h-20  dark:bg-[#131417] p-4 gap-3 group hover:border-primary cursor-pointer"
        >
          <div className="grid grid-cols-3 w-full">
            <div className="flex gap-4 items-center">
              <HiBuildingLibrary className="h-6 w-6 text-[#737377] group-hover:text-primary" />
              <div className=" h-6 text-[#737377] ">Organization</div>
            </div>
            <div className="flex gap-2 col-span-2 items-center h-full">
              <div className=" text-[#737377] text-sm ">Active</div>
              <div className="text-sm">ABC Software LLP</div>
            </div>
            <div className=""></div>
          </div>
          <div>
            <MdKeyboardArrowRight className="h-5 w-5 " />
          </div>
        </Card>

        <Card
          onClick={() => navigate("/settings/billing")}
          className="flex  items-center justify-between min-h-20 dark:bg-[#131417] p-4 gap-3 group hover:border-primary cursor-pointer"
        >
          <div className="grid grid-cols-3 w-full">
            <div className="flex items-center gap-4 ">
              <TbReceipt className="w-7 h-7 text-background fill-[#737377]  group-hover:fill-primary" />
              <div className=" h-6 text-[#737377] ">Billing</div>
            </div>
            <div className=" flex flex-col xl:flex-row text-xs xl:items-center gap-2 items-left h-full">
              <div className="text-sm ">Platinum</div>
              <div className="text-[#737377] hidden xl:block">|</div>
              <div className="text-[#737377] ">Plan valid till 24 jun 2024</div>
            </div>
            <div className=" flex gap-1">
              <Button
                className=" text-[#737377] border-border gap-2 w-1/2 text-xs"
                type="reset"
                variant="outline"
              >
                {/* <RxDownload className="h-6 w-6" /> */}
                Invoice
              </Button>
              <Button
                className="border-[#3E72F8] w-1/2 text-[#3E72F8] text-xs"
                type="reset"
                variant="outline"
              >
                Upgrade
              </Button>
            </div>
          </div>
          <div>
            <MdKeyboardArrowRight className="h-5 w-5 cursor-pointer" />
          </div>
        </Card>

        <Card
          onClick={() => navigate("/settings/notification")}
          className="flex  items-center justify-between min-h-20 dark:bg-[#131417] p-4 gap-3 group hover:border-primary cursor-pointer"
        >
          <div className="grid grid-cols-3 w-full">
            <div className="flex gap-4 items-center col-span-2">
              <HiBell className="h-6 w-6 text-[#737377] group-hover:text-primary" />
              <div className="h-6 text-[#737377] ">Notifications</div>
            </div>
          </div>
          <div>
            <MdKeyboardArrowRight className="h-5 w-5 cursor-pointer" />
          </div>
        </Card>

        <Card
          onClick={() => navigate("/settings/roles")}
          className="flex items-center justify-between min-h-20 dark:bg-[#131417] p-4 gap-3 group hover:border-primary cursor-pointer"
        >
          <div className="grid grid-cols-3 w-full">
            <div className="flex gap-4 items-center">
              <HiUser className="h-6 w-6 text-[#737377] group-hover:text-primary" />
              <div className="h-6 text-[#737377] ">User Roles</div>
            </div>
            <div></div>
          </div>
          <div>
            <MdKeyboardArrowRight className="h-5 w-5 cursor-pointer" />
          </div>
        </Card>

        <Card
          onClick={() => navigate("/settings/board-templates")}
          className="flex items-center justify-between min-h-20 dark:bg-[#131417] p-4 gap-3 group hover:border-primary cursor-pointer"
        >
          <div className="grid grid-cols-3 w-full">
            <div className="flex gap-4 items-center">
              <BiColumns className="h-6 w-6 text-[#737377] group-hover:text-primary" />
              <div className="h-6 text-[#737377] ">Board Templates</div>
            </div>
            <div></div>
          </div>
          <div>
            <MdKeyboardArrowRight className="h-5 w-5 cursor-pointer" />
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Settings;
