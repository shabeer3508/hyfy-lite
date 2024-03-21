import { useEffect } from 'react';
import { BiDirections } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { HiBookOpen, HiFilter, HiOutlineDotsVertical } from 'react-icons/hi';
import { HiMiniListBullet, HiOutlineArrowsUpDown, HiOutlineInbox } from "react-icons/hi2";

import Urls from '@/redux/actions/Urls';
import { Button } from '@/components/ui/button'
import EpicDetailView from './epic-detail-view';
import { IssueCard } from '../issues/issue-card-1';
import { ScrollArea } from '@/components/ui/scroll-area';
import HYSearch from '@/components/hy-components/HYSearch'
import HYDialog from '@/components/hy-components/HYDialog';
import HYTooltip from '@/components/hy-components/HYTooltip';
import HYDropDown from '@/components/hy-components/HYDropDown';
import NoProjectScreen from '../empty-screens/NoProjectScreen';
import EpicCreationForm from '@/pages/epics/forms/epic-creation';
import { HYCombobox } from '@/components/hy-components/HYCombobox';
import { AppProfileTypes } from '@/redux/reducers/AppProfileReducer';
import IssueCreationCardMini from '../issues/forms/issue-creation-mini';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HYDropdownMenuCheckbox from '@/components/hy-components/HYCheckboxDropDown';
import { EpicTypes, IssueStatusTypes, IssueTypes, ReleaseTypes } from '@/interfaces';
import { getAction, patchAction, reducerNameFromUrl, setEpicData } from '@/redux/actions/AppActions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const EpicScreen = () => {
    const dispatch = useDispatch()

    const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

    const releaseReducerName = reducerNameFromUrl("release", "GET");
    const releaseList = useSelector((state: any) => state?.[releaseReducerName]);
    const releaseItems = releaseList?.data?.items as ReleaseTypes[]

    const epicsReducerName = reducerNameFromUrl("epic", "GET");
    const epicList = useSelector((state: any) => state?.[epicsReducerName]);
    const epicItems = epicList?.data?.items as EpicTypes[];

    const issuesListData = useSelector((state: any) => state?.GetIssues);
    const issuesItems = issuesListData?.data?.items as IssueTypes[];

    const issueStatusReducerName = reducerNameFromUrl("issueStatus", "GET");
    const issueStatusList = useSelector((state: any) => state?.[issueStatusReducerName])?.data?.items as IssueStatusTypes[];

    /*  ######################################################################################## */

    const getIssues = () => {
        let query = `?perPage=300&filter=project_id=${appProfileInfo.project_id}`;
        dispatch(getAction({ issues: Urls.issues + query }));
    };

    const getEpics = () => {
        let query = `?perPage=300&sort=${appProfileInfo?.epic?.sort_value}&filter=project_id=${appProfileInfo.project_id}`;
        dispatch(getAction({ epic: Urls.epic + query }));
    };


    const updateEpicData = async (epicId: string, key: string | number, value: string | boolean) => {
        const resp = (await dispatch(patchAction({ epic: Urls.epic }, { [key]: value !== "" ? value : null }, epicId))) as any
        const success = resp.payload?.status == 200;
        if (success) {
            getEpics();
        }
    }

    /*  ######################################################################################## */

    const epicFiltered = epicItems?.filter(epic => {
        if (appProfileInfo?.epic?.release_filter_value === "all") {
            return true
        }
        else {
            return epic?.release_id === appProfileInfo?.epic?.release_filter_value
        }
    })

    console.log("🚀 ~ epicFiltered ~ epicFiltered:", epicFiltered)

    const releaseOptions =
        releaseItems?.map((relse) => ({
            value: relse?._id,
            label: relse?.name,
        })) ?? [];

    const sortOptions = [
        { label: "New", action: () => dispatch(setEpicData("-createdAt", "sort_value")) },
        { label: "Oldest", action: () => dispatch(setEpicData("createdAt", "sort_value")) },
        { label: "Recently Edited", action: () => dispatch(setEpicData("-updatedAt", "sort_value")) },
        { label: "A-Z", action: () => dispatch(setEpicData("name", "sort_value")) },
        { label: "Z-A", action: () => dispatch(setEpicData("-name", "sort_value")) },
    ];

    const logoColors = [
        "text-[#71A4FF]",
        "text-[#4C4878]",
        "text-[#A4599A]",
        "text-[#E2A766]",
        "text-[#389C98]",
        "text-[#FF6481]",
    ];

    /*  ######################################################################################## */

    useEffect(() => {
        if (appProfileInfo.project_id) {
            getIssues();
        }
    }, [appProfileInfo.project_id]);


    useEffect(() => {
        if (appProfileInfo.project_id) {
            getEpics();
        }
    }, [appProfileInfo.project_id, appProfileInfo?.epic?.sort_value])

    /*  ######################################################################################## */

    if (!appProfileInfo?.project_id) {
        return <NoProjectScreen />
    }

    return (
        <div className=" flex flex-col h-full">

            {epicItems?.length === 0 && (<div className="dark:text-foreground flex justify-center h-full items-center">
                <div className="flex flex-col justify-center items-center text-center gap-3">
                    <div>
                        <HiOutlineInbox className="text-primary h-20 w-20 " />
                    </div>
                    <div className="text-primary text-4xl font-semibold">
                        Nothing here!
                    </div>
                    <div className="dark:text-foreground text-xl">
                        Create an epic  to start working!
                    </div>
                    <div className='my-3'>
                        <EpicCreationForm>
                            <Button className='text-white text-sm'>Create an Epic</Button>
                        </EpicCreationForm>
                    </div>
                </div>
            </div>)}


            {epicItems?.length > 0 && (<Tabs defaultValue="list" className="px-6">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-8">
                        <div className="text-xl">Epics</div>
                        <TabsList className='hidden'>
                            <TabsTrigger value="list" className="flex gap-1">
                                <HiMiniListBullet className="w-4 h-4" />
                                List
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="flex gap-1">
                                <BiDirections className="w-4 h-4" />
                                Timeline
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <div className='flex gap-5'>
                        <HYSearch />
                        <EpicCreationForm>
                            <Button className="text-white">Add Epic</Button>
                        </EpicCreationForm>
                    </div>
                </div>
                <TabsContent value="list">
                    <div className="flex gap-2">
                        <HYDropDown options={sortOptions}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="border aspect-square h-10 w-10"
                            >
                                <HiOutlineArrowsUpDown className="h-5 w-5 text-[#707173]" />
                            </Button>
                        </HYDropDown>
                        <HYDropdownMenuCheckbox>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="border aspect-square h-10 w-10"
                            >
                                <HiFilter className="h-5 w-5 text-[#707173]" />
                            </Button>
                        </HYDropdownMenuCheckbox>
                        <HYCombobox
                            label="Release "
                            defaultValue='all'
                            unSelectable={false}
                            buttonClassName="max-w-[200px]"
                            options={[{ label: "All", value: "all" }, ...releaseOptions]}
                            onValueChange={(value) => dispatch(setEpicData(value, "release_filter_value"))}
                        />
                    </div>
                    <div >

                        <ScrollArea className="h-[calc(100vh-200px)] w-full">

                            <div className="py-4 pr-4 space-y-2">
                                {epicFiltered.map((epic, i) => {

                                    const epicIssues = issuesItems?.filter(
                                        (issue) => {
                                            return typeof issue?.epic_id !== "string" ? issue?.epic_id?.[0]?._id === epic?._id : issue?.epic_id === epic?._id
                                        }
                                    );

                                    const pieceWidth = 100 / epicIssues?.length;

                                    const findStatusNameById = (statusId) => {
                                        return issueStatusList?.find((status) => status?._id === statusId)?.name
                                    }


                                    return (
                                        <div
                                            key={epic?._id}
                                            className="flex gap-3 justify-between items-center text-sm border rounded card-gradient dark:bg-[#131417] bg-[#F7F8F9]"
                                        >
                                            <Accordion
                                                type="single"
                                                collapsible
                                                className="w-full border-0 p-0 m-0"
                                            >
                                                <AccordionItem
                                                    value="item-1"
                                                    className="border-0 p-0 m-0"
                                                >
                                                    <div className="flex justify-between items-center w-full">
                                                        <div className="mr-1">
                                                            <AccordionTrigger className="p-3" />
                                                        </div>
                                                        <div className="flex justify-between items-center w-full">
                                                            <div className="flex gap-1 items-center">
                                                                <HiBookOpen className={`w-5 h-5 mr-2 ${logoColors[i % 6]}`} />
                                                                <HYDialog
                                                                    className="max-w-6xl dark:bg-card"
                                                                    content={<EpicDetailView data={epic} />}
                                                                >
                                                                    <div className="sm:w-[100px] md:w-[120px] 2xl:w-[200px] capitalize truncate cursor-pointer">
                                                                        {epic?.name}
                                                                    </div>
                                                                </HYDialog>
                                                            </div>
                                                            <div className='flex py-2 items-center'>
                                                                <div className="flex gap-2 items-center text-[#737377] px-4 border-r">
                                                                    <HYCombobox
                                                                        label={"Release : "}
                                                                        unSelectable={true}
                                                                        options={releaseOptions}
                                                                        defaultValue={typeof epic?.release_id === "string" && epic?.release_id}
                                                                        buttonClassName="max-w-[200px]"
                                                                        onValueChange={(value) => updateEpicData(epic?._id, "release_id", value)}
                                                                    />
                                                                </div>
                                                                <div className="flex gap-2 items-center text-[#737377] px-4 py-2 ">
                                                                    {epicIssues?.length} Issues
                                                                </div>
                                                                <div className="flex gap-1 w-[50px] sm:w-[100px] md:w-[200px] xl:w-[500px] h-2 overflow-hidden mr-3">
                                                                    {epicIssues?.map((itm => (
                                                                        <HYTooltip key={itm?._id} message={findStatusNameById(itm?.status)} className='capitalize'>
                                                                            <div
                                                                                className={`
                                                                                ${itm?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Done")?._id && "bg-[#56972E]"}
                                                                                ${itm?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Backlog")?._id && "bg-[#6D6E74]"} 
                                                                                ${itm?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Ongoing")?._id && "bg-cyan-500"} 
                                                                                ${itm?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Todo")?._id && "bg-[#006EEF]"} 
                                                                                ${itm?.status === issueStatusList?.find(issueStatus => issueStatus?.name === "Pending")?._id && "bg-[#D63B00]"} `}
                                                                                style={{ width: `${pieceWidth}%` }}>
                                                                            </div>
                                                                        </HYTooltip>
                                                                    )))}
                                                                </div>
                                                                <Button className='hover:bg-background' variant='ghost' type='button' size='icon'>
                                                                    <HiOutlineDotsVertical className='' />
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <AccordionContent className="flex flex-col gap-2 px-4 mt-2">
                                                        <IssueCreationCardMini epicId={epic?._id} />
                                                        {epicIssues?.map((itm, i2) => <IssueCard showEpicName={false} key={i2} issue={itm} index={i2} />)}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </TabsContent>
            </Tabs>)}
        </div >

    )
}

export default EpicScreen