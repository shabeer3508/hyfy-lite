import { Label } from "@/components/ui/label";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import icons_dwnld from "@/assets/icons/header-icons/icons_dwnld.svg";
import icon_arrow from "@/assets/icons/header-icons/icon_arrow.svg";
import icon_org from "@/assets/icons/header-icons/icon_org.svg";
import icons_billing from "@/assets/icons/header-icons/Icons_billing.svg";
import icon_settingsnotification from "@/assets/icons/header-icons/Icons_settingsnotification.svg";
import icon_userRoles from "@/assets/icons/header-icons/Icons_userRoles.svg";

const Settings = () => {
  return (
    <div className="dark:text-foreground flex flex-col m-8 gap-y-6">
      <div>Settings</div>

      <div className="flex flex-col gap-4">
        <Card className="flex w-4/6  dark:bg-[#131417] p-4">
          <div className="flex  w-full items-center justify-between   ">
            <div className="flex w-[169px] h-6 items-center gap-4 py-[10px] ">
              <img className=" w-6 h-6 " src={icon_org} alt="org_icon" />
              <div className=" w-[86px] h-6 text-[#737377] ">Organization</div>
            </div>

            <div className=" flex gap-4 whitespace-nowrap w-[253.66px] h-6 items-center  ">
              <span className="w-[43px] h-6 text-[#737377] text-sm ">
                Active
              </span>
              <span className=" w-[123px] h-6 text-sm">ABC Software LLP</span>
            </div>
            <div className=" flex w-[332px] h-11 justify-end items-center ">
              <img className="w-5 h-5" src={icon_arrow} alt=""></img>
            </div>
          </div>
        </Card>

        <Card className="flex w-4/6  dark:bg-[#131417] p-4 ">
          <div className="flex flex-wrap p- w-full items-center justify-between  ">
            <div className="flex w-[169px] h-6 items-center gap-4 py-[10px] ">
              <img className=" w-6 h-6 " src={icons_billing} alt="" />
              <div className=" w-[41px] h-6 text-[#737377] ">Billing</div>
            </div>
            <div className="flex whitespace-nowrap w-[253.66px] h-6 items-center gap-2  ">
              <span className="text-sm">Platimum</span>
              <span className="text-[#737377]">|</span>
              <span className="text-[#737377]">Plan valid till</span>
              <span className="text-[#737377]">24 jun 2024</span>
            </div>
            <div className="flex w-[289px] h-11 justify-end items-center gap-4 ">
              <Button
                className="w-[140px] h-[44px] text-[#737377] gap-2"
                type="reset"
                variant="outline"
              >
                <img className="" src={icons_dwnld} alt=""></img> Invoice
              </Button>
              <Button
                className="border-[#3E72F8] w-32 text-[#3E72F8]"
                type="reset"
                variant="outline"
              >
                Upgrade
              </Button>
            </div>
            <div className="flex justify-end items-center">
              <img className=" w-5 h-5" src={icon_arrow} alt=""></img>
            </div>
          </div>
        </Card>

        <Card className="flex w-4/6  dark:bg-[#131417] p-4">
          <div className="flex  w-full items-center justify-between">
            <div className="flex w-[169px] h-6 items-center gap-4 py-[10px]">
              <img
                className=" w-6 h-6"
                src={icon_settingsnotification}
                alt="org_icon"
              />
              <div className="text-[#737377] w-[86px] h-6">Notifications</div>
            </div>

            <div className="flex flex-row w-[332px] h-11 items-center justify-end">
              <img className="w-5 h-5 " src={icon_arrow} alt=""></img>
            </div>
          </div>
        </Card>

        <Card className="flex w-4/6  dark:bg-[#131417] p-4">
          <div className="flex  w-full items-center justify-between">
            <div className="flex w-[169px] h-6 items-center gap-4 py-[10px]">
              <img className=" w-6 h-6  " src={icon_userRoles} alt="" />
              <div className="flex whitespace-nowrap text-[#737377] w-[72px] h-6">
                User Roles
              </div>
            </div>
            <div className="flex flex-row w-[332px] h-11 items-center justify-end">
              <img className=" w-5 h-5 " src={icon_arrow} alt=""></img>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
