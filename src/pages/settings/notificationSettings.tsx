import { Card } from "@/components/ui/card";
import { LuChevronRight } from "react-icons/lu";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const NotificationSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-auto max-h-[calc(100vh-100px)]">
      <div className="dark:text-foreground flex flex-col  gap-6  w-full  px-6  ">
        <div className="flex w-4/6 mt-2 items-center ">
          <MdKeyboardArrowLeft
            onClick={() => navigate("/settings")}
            className="h-7 w-7 cursor-pointer  "
          />
          <h5 className="text-[#737377] font-medium hover:cursor-pointer text-xl">
            Settings
          </h5>
          <MdKeyboardArrowRight className="w-7 h-7" />
          <h5 className=" text-xl">Notifications</h5>
        </div>
        <Card className="flex w-3/6 flex-col gap-6 dark:bg-[#131417]  ">
          <div className="flex flex-col m-4 gap-6">
            <div className="flex ">Email Notification</div>
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
            </div>

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

            <div className="flex flex-col  gap-y-4">
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
            </div>

            <div className="flex flex-col  gap-y-4">
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
            </div>

            <div className="flex flex-col  gap-y-4">
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default NotificationSettings;
