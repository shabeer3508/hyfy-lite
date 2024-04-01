import HYAvatar from "@/components/hy-components/HYAvatar";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { ReleaseTypes } from "@/interfaces";
import dayjs from "dayjs";
import { release } from "os";
import React from "react";
import { HiDocument } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";
import { RiCloseLine } from "react-icons/ri";
import { RxDownload } from "react-icons/rx";

export default function ReleaseItem({ data }: { data: ReleaseTypes }) {
  return (
    <div className="">
      <div className="flex w-full flex-col  gap-8">
        <div className="flex  mt-8 justify-between">
          <div className="flex flex-col ">
            <span className="text-sm font-medium text-[#9499A5]">
              Release 1
            </span>
            <span className="text-2xl font-normal">{data.name}</span>
          </div>

          <DialogClose asChild>
            <Button variant="outline" className="border border-[#696B70] mr-8 ">
              <RiCloseLine className="w-5 h-5" />
            </Button>
          </DialogClose>
        </div>
        <div className="flex items-center border border-[#3E3E51] rounded bg-[#111112]  w-52">
          <div className="flex  items-center gap-1">
            <HYAvatar></HYAvatar>
            <div className="flex flex-col ">
              <span className="text-sm">{}</span>
              <span className="text-xs font-medium text-[#737377]">
                Flutter dev
              </span>
            </div>
          </div>
        </div>
        <div className="flex  gap-16 ">
          <div className="flex flex-col gap-4">
            <div className="flex text-sm text-[#737377]">project</div>
            <div className="flex text-base">{}</div>
          </div>
          <div className="border border-y-2"></div>
          <div className="flex flex-col gap-4">
            <div className="flex text-sm text-[#737377]">Tag</div>
            <div className="flex text-base text-[#FF6481]">
              {data.version_name}
            </div>
          </div>
          <div className="flex border border-y-2"></div>
          <div className="flex flex-col gap-4">
            <div className="flex text-sm text-[#737377]">status</div>
            <div className="flex">
              <HYCombobox options={[]} />
            </div>
          </div>
        </div>
        <div className="flex  text-sm gap-2 ">
          <span>{dayjs(data.to_date).format("D MMM YYYY")}</span>
          <span className="text-[#389C98]"> 4 Months 2 weeks left</span>
        </div>
      </div>
      <div className="border mt-4"></div>
      <div className="flex flex-col  my-4 gap-4 ">
        <div className="flex text-sm text-[#9499A5]">{data.description}</div>
        <div className="flex text-lg  ">
          <div>Release Notes -{data.version_name}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex text-sm">New Features:</div>
          <ul className="list-disc text-xs font-light ml-5 leading-relaxed ">
            <li>
              Customizable Themes: Now you can personalize your interface with a
              range of themes to suit your preferences.
            </li>
            <li>
              Enhanced Collaboration: Introducing real-time collaboration
              features, allowing multiple users to work on the same document
              simultaneously.
            </li>
            <li>
              Advanced Search Functionality: Find what you need faster with our
              improved search capabilities, including filters and sorting
              options.
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex text-sm"> Improvements:</div>
          <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
            <li>
              Performance Optimization: We've fine-tuned the software to run
              smoother and faster, ensuring a more efficient user experience.
            </li>
            <li>
              Bug Fixes: Addressed several reported issues and resolved bugs to
              enhance stability and reliability.
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex text-sm"> User Interface Enhancements:</div>
          <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
            <li>
              Streamlined Navigation: The user interface has been redesigned for
              better navigation and ease of use.
            </li>
            <li>
              Visual Updates:Updated icons and visual elements for a modern look
              and feel.
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex text-sm"> Miscellaneous:</div>
          <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
            <li>
              Documentation Updates: Updated documentation with comprehensive
              guides and resources for easier reference.
            </li>
            <li>
              Security Enhancements: Implemented additional security measures to
              protect user data and privacy.
            </li>
          </ul>
        </div>
      </div>
      <div className="border mb-4 "></div>
      <div className="flex flex-col  mb-6 gap-6">
        <div className="flex  justify-between ">
          <div className="flex text-base text-[#9499A5]">Attachments</div>
          <div className="flex w-32 text-[#9499A5]  mr-8">
            <Button
              variant="outline"
              className="border border-[#696B70] rounded w-[174px] gap-2 "
            >
              <LuPaperclip />
              <div>Upload</div>
            </Button>
          </div>
        </div>
        <div className="flex  gap-6">
          <Card className="flex w-auto h-[72px] dark:bg-[#1a1b1e] border dark:border-[#FFFFFF1A]">
            <div className="flex mx-4 my-[14px] items-center gap-[136px] ">
              <div className="flex items-center gap-4">
                <div className="flex">
                  <HiDocument className="w-8 h-8" />
                </div>
                <div className="flex flex-col  ">
                  <div className="flex text-base">Code</div>
                  <div className="flex text-[#737377] text-sm">Zip</div>
                </div>
              </div>
              <div className="flex  text-[#969696] ">
                <Button variant="ghost">
                  <RxDownload className="w-6 h-6 " />
                </Button>
              </div>
            </div>
          </Card>
          <Card className="flex w-auto h-[72px] dark:bg-[#1a1b1e] border dark:border-[#FFFFFF1A]">
            <div className="flex mx-4 my-[14px] items-center gap-[136px]">
              <div className="flex items-center gap-4">
                <div className="flex">
                  <HiDocument className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <div className="flex">version</div>
                  <div className="flex text-[#737377] text-sm">apk</div>
                </div>
              </div>
              <div className="flex  text-[#969696]">
                <Button variant="ghost">
                  <RxDownload className="w-6 h-6 " />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
