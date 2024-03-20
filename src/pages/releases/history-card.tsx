import HYAvatar from "@/components/hy-components/HYAvatar";
import { Card } from "@/components/ui/card";
import { HiRocketLaunch } from "react-icons/hi2";

const HistoryCard = () => {
  return (
    <div className="flex">
      <Card className="dark:bg-[#131417]">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 mx-6 mt-6 items-center text-sm">
            <HiRocketLaunch className="text-[#969696] size-5" />
            <span>Release 1 </span>
            <span className="text-[#434448]">on</span>
            <span>1 jun 2024</span>
            <span className="flex gap-1">
              <span className="text-[#434448]">Tags</span>
              <span className="text-[#E2A766]">V1.1,</span>
              <span className="text-[#71A4FF]">testing</span>
            </span>
          </div>
          <div className="flex items-center gap-[2.5px] mx-6">
            <div className="flex m-2 items-center">
              <HYAvatar></HYAvatar>
              <div className="flex flex-col">
                <span className="text-sm">Roshan Titus</span>
                <span className="text-xs">Flutter dev</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border my-4 mx-6"></div>
        <div className="flex flex-col mx-6 gap-4">
          <h1 className="flex ">Release Notes - Version 1.0.0 </h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col ">
              <h2 className="flex ">New Features:</h2>
              <div className="flex flex-col  ml-4 gap-2">
                <p className="flex ">
                  Customizable Themes: Now you can personalize your interface
                  with a range of themes to suit your preferences.
                </p>
                <p className="flex ">
                  Enhanced Collaboration: Introducing real-time collaboration
                  features, allowing multiple users to work on the same document
                  simultaneously.
                </p>
                <p className="flex ">
                  Advanced Search Functionality: Find what you need faster with
                  our improved search capabilities, including filters and
                  sorting options.
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex text-sm">
                Improvements:
                <div>
                  <div className="flex text-xs">
                    Performance Optimization: We've fine-tuned the software to
                    run smoother and faster, ensuring a more efficient user
                    experience.
                  </div>
                  <div className="flex text-xs">
                    Bug Fixes: Addressed several reported issues and resolved
                    bugs to enhance stability and reliability.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex text-sm">
                User Interface Enhancements:
                <div>
                  <div className="flex text-xs">
                    Streamlined Navigation: The user interface has been
                    redesigned for better navigation and ease of use.
                  </div>
                  <div className="flex text-xs">
                    Visual Updates:Updated icons and visual elements for a
                    modern look and feel.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-sm">
                Miscellaneous:
                <div>
                  <div className="flex text-xs">
                    Documentation Updates: Updated documentation with
                    comprehensive guides and resources for easier reference.
                  </div>
                  <div className="flex text-xs">
                    Security Enhancements: Implemented additional security
                    measures to protect user data and privacy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div>Attachments</div>
          <div>
            <Card>Code zip</Card>
            <Card>v1.1 apk</Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default HistoryCard;
