import HYAvatar from "@/components/hy-components/HYAvatar";
import { Card } from "@/components/ui/card";
import { HiRocketLaunch } from "react-icons/hi2";
import { HiOutlineDownload } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { HiDocument } from "react-icons/hi";

const HistoryCard = () => {
  return (
    <div className=" w-full overflow-auto max-h-[calc(100vh-200px)]">
      <Card className="flex w-full flex-col dark:bg-[#131417]">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 mx-6 mt-6 items-center text-sm">
            <HiRocketLaunch className="text-[#969696] size-5" />
            <span>Release 1 </span>
            <span className="text-[#434448]">on</span>
            <span>1 jun 2024</span>
            <span className="flex gap-1">
              <span className="text-[#737377]">Tags</span>
              <span className="text-[#E2A766]">V1.1,</span>
              <span className="text-[#71A4FF]">testing</span>
            </span>
          </div>
          <div className="flex items-center gap-[2.5px] mx-6">
            <div className="flex m-2 items-center gap-1">
              <HYAvatar></HYAvatar>
              <div className="flex flex-col ">
                <span className="text-sm">Roshan Titus</span>
                <span className="text-xs text-[#737377]">Flutter dev</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border mt-4 mx-6"></div>
        <div className="flex flex-col mx-6 my-4 gap-4 ">
          <div className="flex text-lg ">Release Notes - Version 1.0.0</div>
          <div className="flex flex-col">
            <div className="flex text-sm">New Features:</div>
            <ul className="list-disc text-xs font-light ml-5 leading-relaxed ">
              <li>
                Customizable Themes: Now you can personalize your interface with
                a range of themes to suit your preferences.
              </li>
              <li>
                Enhanced Collaboration: Introducing real-time collaboration
                features, allowing multiple users to work on the same document
                simultaneously.
              </li>
              <li>
                Advanced Search Functionality: Find what you need faster with
                our improved search capabilities, including filters and sorting
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
                Bug Fixes: Addressed several reported issues and resolved bugs
                to enhance stability and reliability.
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="flex text-sm"> User Interface Enhancements:</div>
            <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
              <li>
                Streamlined Navigation: The user interface has been redesigned
                for better navigation and ease of use.
              </li>
              <li>
                Visual Updates:Updated icons and visual elements for a modern
                look and feel.
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
                Security Enhancements: Implemented additional security measures
                to protect user data and privacy.
              </li>
            </ul>
          </div>
        </div>
        <div className="border mb-4 mx-6"></div>
        <div className="flex flex-col mx-6 mb-6 gap-6">
          <div className="flex text-base text-[#9499A5]">Attachments</div>
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
                  <HiOutlineDownload className="w-6 h-6 " />
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
                    <div className="flex">v1.1</div>
                    <div className="flex text-[#737377]">apk</div>
                  </div>
                </div>
                <div className="flex  text-[#969696]">
                  <HiOutlineDownload className="w-6 h-6 " />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default HistoryCard;
