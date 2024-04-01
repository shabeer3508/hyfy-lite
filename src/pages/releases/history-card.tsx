import HYAvatar from "@/components/hy-components/HYAvatar";
import { Card } from "@/components/ui/card";
import { HiRocketLaunch } from "react-icons/hi2";
import { RxDownload } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { HiDocument } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import {
  getAction,
  reducerNameFromUrl,
  setReleasePageData,
} from "@/redux/actions/AppActions";
import { ReleaseTypes, UsersTypes } from "@/interfaces";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import HYSearch from "@/components/hy-components/HYSearch";
import Urls from "@/redux/actions/Urls";
import { useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dayjs from "dayjs";

const HistoryCard = () => {
  const dispatch = useDispatch();
  const appProfileInfo = useSelector(
    (state: any) => state.AppProfile
  ) as AppProfileTypes;
  const releasePageinfo = appProfileInfo.releases;
  const releaseReducerName = reducerNameFromUrl("release", "GET");
  const releaseList = useSelector((state: any) => state?.[releaseReducerName]);
  const releaseItems = releaseList.data?.items as ReleaseTypes[];

  const usersReducerName = reducerNameFromUrl("users", "GET");
  const usersListData = useSelector((state: any) => state?.[usersReducerName])
    ?.data?.items as UsersTypes[];

  const getUsers = () => {
    let query = `?perPage=300`;
    dispatch(getAction({ users: Urls.users + query }));
  };

  const getReleases = () => {
    let query = `?filter=project_id=${appProfileInfo.project_id}`;
    dispatch(getAction({ release: Urls.release + query }));
  };

  const getReleasesByStatus = (status: "planning" | "ongoing" | "released") =>
    releaseItems?.filter((item) => item?.status === status);

  const statusFilterOption = [
    { label: "planning", value: "planning" },
    { label: "ongoing", value: "ongoing" },
    { label: "released", value: "released" },
  ];

  const orderFilterOption = [
    { label: "Recent", value: "recent" },
    { label: "Old", value: "old" },
  ];

  const pointsFilterOptions = [
    { label: "Highest Points", value: "hp" },
    { label: "Lowest Points", value: "lp" },
  ];

  useEffect(() => {
    if (appProfileInfo.project_id) {
      getReleases();
    }
    getUsers();
  }, [appProfileInfo.project_id, releasePageinfo]);

  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)] ">
      <div className="flex gap-2 mt-6">
        <HYCombobox
          label={"Order"}
          options={orderFilterOption}
          defaultValue={releasePageinfo?.order_filter_value}
          onValueChange={(value) =>
            dispatch(setReleasePageData(value, "order_filter_value"))
          }
        />
        <HYCombobox
          label={"status"}
          options={statusFilterOption}
          // defaultValue={}
          //  onValueChange={(value) =>
          //   dispatch(getReleasesByStatus(value, ))}
        />
        <HYCombobox
          options={pointsFilterOptions}
          defaultValue={releasePageinfo?.points_filter_value}
          onValueChange={(value) =>
            dispatch(setReleasePageData(value, "points_filter_value"))
          }
        />
        <HYSearch />
      </div>
      {releaseItems?.length > 0 && (
        <div className=" w-full ">
          {releaseItems?.map((release) => {
            const currentUser = usersListData?.find(
              (user) => user._id === release?.created_by
            );
            const date = release?.to_date;

            const newdate = dayjs(date).format("D MMM YYYY");

            return (
              <Card
                key={release?._id}
                className="flex w-full mt-6 flex-col dark:bg-[#131417]"
              >
                <div className="flex flex-col gap-4 ">
                  <div className="flex gap-2 mx-6 mt-6 items-center text-sm">
                    <HiRocketLaunch className="text-[#969696] size-5" />
                    <span>{release?.name}</span>
                    <span className="text-[#434448] font-medium">on</span>
                    <span>{newdate}</span>
                    <span className="flex gap-1">
                      <span className="text-[#737377] font-medium">Tags</span>
                      <span className="text-[#E2A766]">version,</span>
                      <span className="text-[#71A4FF]">testing</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[2.5px] mx-6">
                    <div className="flex m-2 items-center gap-1">
                      <HYAvatar></HYAvatar>
                      <div className="flex flex-col ">
                        <span className="text-sm">{currentUser.user_name}</span>
                        <span className="text-xs font-medium text-[#737377]">
                          Flutter dev
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex border mx-6 mt-4"></div>
                <div className="flex flex-col mx-6 ">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex text-lg">
                          Release Notes - version
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <div className="flex flex-col">
                          <div className="flex text-sm">New Features:</div>
                          <ul className="list-disc text-xs font-light ml-5 leading-relaxed ">
                            <li>
                              Customizable Themes: Now you can personalize your
                              interface with a range of themes to suit your
                              preferences.
                            </li>
                            <li>
                              Enhanced Collaboration: Introducing real-time
                              collaboration features, allowing multiple users to
                              work on the same document simultaneously.
                            </li>
                            <li>
                              Advanced Search Functionality: Find what you need
                              faster with our improved search capabilities,
                              including filters and sorting options.
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-col">
                          <div className="flex text-sm"> Improvements:</div>
                          <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
                            <li>
                              Performance Optimization: We've fine-tuned the
                              software to run smoother and faster, ensuring a
                              more efficient user experience.
                            </li>
                            <li>
                              Bug Fixes: Addressed several reported issues and
                              resolved bugs to enhance stability and
                              reliability.
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-col">
                          <div className="flex text-sm">
                            {" "}
                            User Interface Enhancements:
                          </div>
                          <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
                            <li>
                              Streamlined Navigation: The user interface has
                              been redesigned for better navigation and ease of
                              use.
                            </li>
                            <li>
                              Visual Updates:Updated icons and visual elements
                              for a modern look and feel.
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-col">
                          <div className="flex text-sm"> Miscellaneous:</div>
                          <ul className="list-disc text-xs font-light ml-5 leading-relaxed">
                            <li>
                              Documentation Updates: Updated documentation with
                              comprehensive guides and resources for easier
                              reference.
                            </li>
                            <li>
                              Security Enhancements: Implemented additional
                              security measures to protect user data and
                              privacy.
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="flex flex-col mx-6  gap-6">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        {" "}
                        <div className="flex text-base text-[#9499A5]">
                          Attachments
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex  gap-6">
                          <Card className="flex w-auto h-[72px] dark:bg-[#1a1b1e] border dark:border-[#FFFFFF1A]">
                            <div className="flex mx-4 my-[14px] items-center gap-[136px] ">
                              <div className="flex items-center gap-4">
                                <div className="flex">
                                  <HiDocument className="w-8 h-8" />
                                </div>
                                <div className="flex flex-col  ">
                                  <div className="flex text-base">Code</div>
                                  <div className="flex text-[#737377] text-sm">
                                    Zip
                                  </div>
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
                                  <div className="flex text-[#737377] text-sm">
                                    apk
                                  </div>
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
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      {releaseItems?.length <= 0 && (
        <div className=" w-full items-center justify-center max-h-[calc(100vh-200px)] flex">
          No Releases
        </div>
      )}
    </div>
  );
};
export default HistoryCard;
