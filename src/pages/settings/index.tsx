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
    <div className="dark:text-foreground flex flex-col m-8 gap-y-4">
      <Label htmlFor="">Settings</Label>

      <div className="flex flex-col gap-5">
        <Card className="flex w-4/6 h-16 dark:bg-[#131417]">
          <div className="flex w-full items-center">
            <img className=" w-5 h-5 m-5  " src={icon_org} alt="org_icon" />
            <div className="flex flex-row gap-20 items-center">
              <Label className="flex w-20 text-[#737377] text-sm">
                Organization
              </Label>
              <Label className=" text-sm flex gap-5">
                <span className="text-[#737377] text-sm">Active</span>
                <span>ABC Software LLP</span>
              </Label>
            </div>
          </div>
          <div className="flex ">
            <img className=" justify-items-end" src={icon_arrow} alt=""></img>
          </div>
        </Card>

        <Card className="flex w-4/6 h-16 dark:bg-[#131417]">
          <div className="flex w-full items-center">
            <img className="flex w-5 h-5 m-5  " src={icons_billing} alt="" />
            <div className="flex flex-row gap-20 items-center">
              <Label className="flex w-20 text-[#737377] text-sm">
                Billing
              </Label>
              <Label className=" text-sm flex gap-2">
                <span className="text-sm">Platimum</span>
                <span className="text-[#737377]">|</span>
                <span className="text-[#737377]">Plan valid till</span>
                <span className="text-[#737377]">24 jun 2024</span>
              </Label>
            </div>
            <div className="flex gap-3 pl-16">
              <Button
                className="w-32 text-[#737377]"
                type="reset"
                variant="outline"
              >
                <img className="p-3" src={icons_dwnld} alt=""></img> Invoice
              </Button>
              <Button
                className="border-sky-700 w-32 text-sky-700"
                type="reset"
                variant="outline"
              >
                Upgrade
              </Button>
            </div>
          </div>
          <div className="flex ">
            <img className=" justify-items-end" src={icon_arrow} alt=""></img>
          </div>
        </Card>

        <Card className="flex w-4/6 h-16 dark:bg-[#131417]">
          <div className="flex w-full items-center">
            <img
              className=" w-5 h-5 m-5  "
              src={icon_settingsnotification}
              alt="org_icon"
            />
            <div className="flex flex-row gap-20 items-center">
              <Label className="text-[#737377] text-sm">Notifications</Label>
            </div>
          </div>
          <div className="flex ">
            <img className=" justify-items-end" src={icon_arrow} alt=""></img>
          </div>
        </Card>

        <Card className="flex w-4/6 h-16 dark:bg-[#131417]">
          <div className="flex w-full items-center">
            <img
              className=" w-5 h-5 m-5  "
              src={icon_userRoles}
              alt="org_icon"
            />
            <div className="flex flex-row gap-20 items-center">
              <Label className="text-[#737377] text-sm">User Roles</Label>
            </div>
          </div>
          <div className="flex ">
            <img className=" justify-items-end" src={icon_arrow} alt=""></img>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
