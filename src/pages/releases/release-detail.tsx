import HYDropDown from "@/components/hy-components/HYDropDown";
import { Card } from "@/components/ui/card";
import { HiDocument } from "react-icons/hi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { RxDownload } from "react-icons/rx";
import { LuPaperclip } from "react-icons/lu";
import { LiaWindowCloseSolid } from "react-icons/lia";
import HYAvatar from "@/components/hy-components/HYAvatar";
import { HYCombobox } from "@/components/hy-components/HYCombobox";
import { Button } from "@/components/ui/button";
import { RiCloseLine } from "react-icons/ri";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppProfileTypes } from "@/redux/reducers/AppProfileReducer";
import { getAction, reducerNameFromUrl } from "@/redux/actions/AppActions";
import { ProjectType, ReleaseTypes, UsersTypes } from "@/interfaces";
import Urls from "@/redux/actions/Urls";
import { useEffect } from "react";
import { release, title } from "process";
import ReleaseItem from "./ReleaseItem";
import { url } from "inspector";
import dayjs from "dayjs";
import { User } from "lucide-react";

const ReleaseDetail = () => {
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

  const projectReducerName = reducerNameFromUrl("project", "GET");
  const projectListResponse = useSelector(
    (state: any) => state?.[projectReducerName]
  )?.data?.items as ProjectType[];

  const getUsers = () => {
    let query = ``;
    dispatch(getAction({ users: Urls.users + query }));
  };

  const getReleases = () => {
    let query = `?perPage=300 &expand=created_by,title `;
    dispatch(getAction({ release: Urls.release + query }));
  };

  const getProjects = () => {
    let query = ``;
    dispatch(getAction({ project: Urls.project + query }));
  };

  useEffect(() => {
    if (appProfileInfo.project_id) {
      getReleases();
    }
    getUsers();
    getProjects();
  }, [appProfileInfo.project_id, releasePageinfo]);

  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      {releaseItems?.length > 0 && (
        <div className=" ">
          {releaseItems?.map((release) => {
            const currentUser = usersListData?.find(
              (user) => user._id === release?.created_by
            );

            return <ReleaseItem data={release} />;
          })}
        </div>
      )}
      {releaseItems.length < 0 && (
        <div className=" w-full items-center justify-center max-h-[calc(100vh-200px)] flex">
          No Releases
        </div>
      )}
    </div>
  );
};

export default ReleaseDetail;
