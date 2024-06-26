import { useEffect } from "react";
import { HiViewBoards } from "react-icons/hi";
import { BiDirections } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Urls from "@/redux/actions/Urls";
import ReleaseCard from "./release-card";
import { ReleaseTypes } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import HYSearch from "@/components/hy-components/HYSearch";
import NoProjectScreen from "../empty-screens/NoProjectScreen";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReleaseCreationForm from "@/pages/releases/forms/release-creation";
import {
  getAction,
  patchAction,
  reducerNameFromUrl,
  setReleasePageData,
} from "@/redux/actions/AppActions";
import HistoryCard from "./history-card";
import { HiMiniClock } from "react-icons/hi2";
import { CiClock2 } from "react-icons/ci";

const Releases = () => {
  const dispatch = useDispatch();

  const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;
  const releasePageinfo = appProfileInfo.releases;

  const releaseReducerName = reducerNameFromUrl("release", "GET");
  const releaseList = useSelector((state: any) => state?.[releaseReducerName]);
  const releaseItems = releaseList?.data?.items as ReleaseTypes[];

  /*  ######################################################################################## */

  const getReleases = () => {
    let query = `?filter=project_id=${appProfileInfo.project_id}`;
    dispatch(getAction({ release: Urls.release + query }));
  };

  const updateItemStatus = async (id: string, stage: string) => {
    const resp = (await dispatch(
      patchAction({ release: Urls.release }, { status: stage }, id)
    )) as any;
    const success = resp.payload?.status == 200;
    if (success) {
      getReleases();
    }
  };

  const getReleasesByStatus = (status: "planning" | "ongoing" | "released") =>
    releaseItems?.filter((item) => item?.status === status);

  /*  ######################################################################################## */

  const orderFilterOption = [
    { label: "Recent", value: "recent" },
    { label: "Old", value: "old" },
  ];

  const pointsFilterOptions = [
    { label: "Highest Points", value: "hp" },
    { label: "Lowest Points", value: "lp" },
  ];

  /*  ######################################################################################## */

  useEffect(() => {
    if (appProfileInfo.project_id) {
      getReleases();
    }
  }, [appProfileInfo.project_id, releasePageinfo]);

  /*  ######################################################################################## */

  if (!appProfileInfo?.project_id) {
    return <NoProjectScreen />;
  }

  return (
    <div className=" flex flex-col h-full">
      <Tabs defaultValue="board" className=" px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl">Releases</div>
            <TabsList className="dark:bg-[#16181D]">
              <TabsTrigger
                value="history"
                className="flex gap-1  font-medium  "
              >
                <HiMiniClock className="w-5 h-5  fill-[#006EEF] " />
                History
              </TabsTrigger>
              <TabsTrigger value="board" className="flex gap-1 font-medium">
                <HiViewBoards className="w-4 h-4" />
                Board
              </TabsTrigger>
              {/* <TabsTrigger value="timeline" className="flex gap-1">
                <BiDirections className="w-4 h-4" />
                Timeline
              </TabsTrigger> */}
            </TabsList>
          </div>
          <ReleaseCreationForm>
            <Button className="text-white">Add Release</Button>
          </ReleaseCreationForm>
        </div>
        <TabsContent value="history">
          <HistoryCard />
        </TabsContent>
        <TabsContent value="board">
          <div className="flex gap-2">
            <HYCombobox
              label={"Order"}
              options={orderFilterOption}
              defaultValue={releasePageinfo?.order_filter_value}
              onValueChange={(value) =>
                dispatch(setReleasePageData(value, "order_filter_value"))
              }
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

          <div className="h-full">
            <div className="grid grid-cols-3 gap-5 mt-4">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  updateItemStatus(e?.dataTransfer?.getData("id"), "planning");
                }}
                className="space-y-2 dark:bg-[#131417] bg-[#F7F8F9] p-2 rounded"
              >
                <p className="text-sm">Planing</p>
                <ScrollArea className="max-h-[calc(100vh-260px)] h-[calc(100vh-260px)]">
                  <div className="space-y-3 pr-5">
                    {getReleasesByStatus("planning")?.map((release) => (
                      <ReleaseCard key={`${release?._id}`} data={release} />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  updateItemStatus(e?.dataTransfer?.getData("id"), "ongoing");
                }}
                className="space-y-2 dark:bg-[#131417] bg-[#F7F8F9] p-2 rounded"
              >
                <p className="text-sm">Ongoing</p>
                <ScrollArea className="max-h-[calc(100vh-260px)] h-[calc(100vh-260px)]">
                  <div className="space-y-3 pr-5">
                    {getReleasesByStatus("ongoing")?.map((release) => (
                      <ReleaseCard key={`${release?._id}`} data={release} />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  updateItemStatus(e?.dataTransfer?.getData("id"), "released");
                }}
                className="space-y-2 dark:bg-[#131417] bg-[#F7F8F9] p-2 rounded"
              >
                <p className="text-sm">Released</p>
                <ScrollArea className="max-h-[calc(100vh-260px)] h-[calc(100vh-260px)]">
                  <div className="space-y-3 pr-5">
                    {getReleasesByStatus("released")?.map((release) => (
                      <ReleaseCard key={`${release?._id}`} data={release} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Releases;
