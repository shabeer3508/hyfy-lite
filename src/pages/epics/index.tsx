import { useEffect } from 'react';
import Urls from '@/redux/actions/Urls';
import { BiDirections } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import { IssueCard } from '../backlog/backlog-column';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollArea } from '@/components/ui/scroll-area';
import HYSearch from '@/components/HYComponents/HYSearch'
import HYDialog from '@/components/HYComponents/HYDialog';
import HYTooltip from '@/components/HYComponents/HYTooltip';
import HYDropDown from '@/components/HYComponents/HYDropDown';
import { HYCombobox } from '@/components/HYComponents/HYCombobox';
import { AppProfileTypes } from '@/redux/reducers/AppProfileReducer';
import { getAction, reducerNameFromUrl } from '@/redux/actions/AppActions';
import EpicCreationForm from '@/components/HYComponents/forms/epic-creation';
import { HiBookOpen, HiFilter, HiOutlineDotsVertical } from 'react-icons/hi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HYDropdownMenuCheckbox from '@/components/HYComponents/HYCheckboxDropDown';
import EpicDetailView from '@/components/HYComponents/DetailViews/Epic-detail-view';
import { HiMiniListBullet, HiOutlineArrowsUpDown, HiOutlineInbox } from "react-icons/hi2";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const EpicScreen = () => {
    const dispatch = useDispatch()

    const appProfileInfo = useSelector((state: any) => state.AppProfile) as AppProfileTypes;

    const releaseReducerName = reducerNameFromUrl("release", "GET");
    const releaseList = useSelector((state: any) => state?.[releaseReducerName]);

    const epicsReducerName = reducerNameFromUrl("epic", "GET");
    const epicList = useSelector((state: any) => state?.[epicsReducerName]);
    const epicItems = epicList?.data?.items;

    const issuesListData = useSelector((state: any) => state?.GetIssues);
    const issuesItems = issuesListData?.data?.items;

    /*  ######################################################################################## */

    const getIssues = (prams?: string) => {
        let query = "?perPage=300";
        if (prams) {
            query = query + prams;
        }
        dispatch(getAction({ issues: Urls.issues + query }));
    };

    const getEpics = (prams?: string) => {
        let query = "?perPage=300";
        if (prams) {
            query = query + prams;
        }
        dispatch(getAction({ epic: Urls.epic + query }));
    };

    /*  ######################################################################################## */

    const filteredEpics = epicItems?.filter(sprnt => sprnt.project_id === appProfileInfo.project_id)

    const releaseOptions =
        releaseList?.data?.items?.map((relse) => ({
            value: relse?._id,
            label: relse?.name,
        })) ?? [];

    const sortoptions = [
        { label: "New", action: () => { } },
        { label: "Oldest", action: () => { } },
        { label: "Recently Edited", action: () => { } },
        { label: "A-Z", action: () => { } },
        { label: "Z-A", action: () => { } },
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
        getIssues();
        getEpics();
    }, [appProfileInfo.project_id]);

    /*  ######################################################################################## */


    return (
        <div className=" flex flex-col h-full">

            {filteredEpics?.length === 0 && (<div className="dark:text-foreground flex justify-center h-full items-center">
                <div className="flex flex-col justify-center items-center text-center gap-3">
                    <div>
                        <HiOutlineInbox className="text-primary h-20 w-20 " />
                    </div>
                    <div className="text-primary text-4xl font-semibold">
                        Nothing here!
                    </div>
                    <div className="dark:text-foreground text-xl">
                        Create an epic from the backlog to start working!
                    </div>
                    <div className='my-3'>
                        <EpicCreationForm>
                            <Button className='text-white text-sm'>Create an Epic</Button>
                        </EpicCreationForm>
                    </div>
                </div>
            </div>)}


            {filteredEpics?.length > 0 && (<Tabs defaultValue="list" className="px-6">
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
                        <HYDropDown options={sortoptions}>
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
                        />
                    </div>
                    <div >

                        <ScrollArea className="h-[calc(100vh-200px)] w-full">

                            <div className="py-4 pr-4 space-y-2">
                                {filteredEpics.map((epic, i) => {

                                    const epicIssues = issuesItems?.filter(
                                        (issue) => issue?.epic === epic?._id
                                    );

                                    const pieceWidth = 100 / epicIssues?.length;

                                    return (
                                        <div
                                            key={epic.id}
                                            className="flex gap-3 justify-between items-center text-sm border  rounded card-gradient "
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
                                                            <Button type="button" variant="ghost" className="p-0 hover:bg-background" ><AccordionTrigger className="p-3" /></Button>
                                                        </div>
                                                        <div className="flex justify-between items-center w-full">
                                                            <div className="flex gap-1 items-center">
                                                                <HiBookOpen className={`w-5 h-5 mr-2 ${logoColors[i % 6]}`} />
                                                                <HYDialog
                                                                    className="max-w-6xl "
                                                                    content={<EpicDetailView data={epic} />}
                                                                >
                                                                    <div className="sm:w-[100px] md:w-[120px] 2xl:w-[200px] capitalize truncate cursor-pointer">
                                                                        {epic.name}
                                                                    </div>
                                                                </HYDialog>
                                                            </div>
                                                            <div className='flex py-2 items-center'>
                                                                <div className="flex gap-2 items-center text-[#737377] px-4 border-r">
                                                                    <HYCombobox
                                                                        unSelectable={false}
                                                                        options={releaseOptions}
                                                                        defaultValue={epic?.releases}
                                                                        buttonClassName="max-w-[200px]"
                                                                    />
                                                                </div>
                                                                <div className="flex gap-2 items-center text-[#737377] px-4 py-2 ">
                                                                    {epicIssues?.length} Stories
                                                                </div>
                                                                <div className="flex gap-1 w-[50px] sm:w-[100px] md:w-[200px] xl:w-[500px] h-2 overflow-hidden mr-3">
                                                                    {epicIssues?.map((itm => (
                                                                        <HYTooltip message={itm?.status} className='capitalize'>
                                                                            <div
                                                                                className={`
                                                                                ${itm?.status === "done" && "bg-[#56972E]"}
                                                                                ${itm?.status === "backlog" && "bg-[#FFFFFF66]"} 
                                                                                ${itm?.status === "ongoing" && "bg-cyan-500"} 
                                                                                ${itm?.status === "todo" && "bg-[#006EEF]"} 
                                                                                ${itm?.status === "pending" && "bg-[#D63B00]"} `}
                                                                                style={{ width: `${pieceWidth}%` }}>
                                                                            </div>
                                                                        </HYTooltip>
                                                                    )))}
                                                                </div>
                                                                <Button className='hover:bg-background' variant='ghost' type='button' size='icon'><HiOutlineDotsVertical className='' /></Button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <AccordionContent className="flex flex-col gap-2 px-4 mt-2">
                                                        {epicIssues?.map((itm, i2) => <IssueCard key={i2} issue={itm} index={i2} />)}
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