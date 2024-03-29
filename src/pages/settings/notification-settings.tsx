import { useNavigate } from "react-router-dom";
import { TbSettingsFilled } from "react-icons/tb";
import { MdKeyboardArrowRight } from "react-icons/md";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const NotificationSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-auto max-h-[calc(100vh-100px)]">
      <div className="dark:text-foreground flex flex-col  gap-6  w-full  px-6">

        <div className="flex items-center min-h-10 gap-3">
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
            <MdKeyboardArrowRight className="size-5 text-[#737377]" />
          </div>
          <div className="text-xl">Notifications</div>
        </div>

        <Card className="flex xl:w-1/2 w-full flex-col gap-6 dark:bg-[#131417]  ">
          <div className="flex flex-col m-4 gap-6">
            <div className="flex ">Email Notification</div>
            {/* 
            <div className="flex flex-col  gap-y-4 ">
              <div className="flex text-[#737377] text-sm">Story</div>
              <div className="flex flex-col gap-y-2 text-sm">
                <div className="flex justify-between ">
                  <span>Story Assigned</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Story Status Changed</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Story Edited</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
              </div>
            </div> */}

            <div className="flex flex-col  gap-y-4">
              <div className="flex text-[#737377] text-sm">Task</div>
              <div className="flex flex-col gap-y-2 text-sm">
                <div className="flex justify-between ">
                  <span>Task Assigned</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Task Status Changed</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Task Edited</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col  gap-y-4">
              <div className="flex text-[#737377] text-sm">Bug</div>
              <div className="flex flex-col gap-y-2 text-sm">
                <div className="flex justify-between ">
                  <span>Bug Raised</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span>Bug Assigned</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bug Status Changed</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span>Bug Edited</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
              </div>
            </div> */}

            {/* <div className="flex flex-col  gap-y-4">
              <div className="flex text-[#737377] text-sm">Sprint</div>
              <div className="flex flex-col gap-y-2 text-sm">
                <div className="flex justify-between ">
                  <span>Upcoming Sprint</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Upcoming Retro</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sprint Finished</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
              </div>
            </div> */}

            {/* <div className="flex flex-col  gap-y-4">
              <div className="flex text-[#737377] text-sm">Release</div>
              <div className="flex flex-col gap-y-2 text-sm">
                <div className="flex justify-between ">
                  <span>Release Due</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Release Status Changed</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Release Edited</span>
                  <span className="flex items-centre gap-2">
                    <Switch />
                    <span>on</span>
                  </span>
                </div>
              </div>
            </div> */}

          </div>
        </Card>
      </div>
    </div>
  );
};
export default NotificationSettings;
