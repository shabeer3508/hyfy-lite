import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import HYSelect from '@/components/HYComponents/HYSelect'
import HYSearch from '@/components/HYComponents/HYSearch'
import comments from '@/assets/icons/header-icons/comments.svg'
import taskdone from '@/assets/icons/header-icons/taskdone.svg'
import repeatblue from '@/assets/icons/header-icons/repeatblue.svg'
import repeatyellow from '@/assets/icons/header-icons/repeatyellow.svg'




const Notification = () => {
    return (
        <div className='overflow-y-auto h-full '>

            <div className='flex flex-col px-6  w-full gap-y-6 mb-5  '>

                <div className='flex w-3/5 items-center justify-between mt-8 '>
                    <Label className="w-36" htmlFor="notification">Notifications</Label>
                    <HYSelect className="w-36" label="Recent" options={["Recent", "Old"]} id={"filter"} />
                    <HYSelect className="w-36" label="All types" options={["all", "admin", "manager", "employee"]} id={"user"} />
                    <HYSearch />
                </div>

                <div className='flex flex-col gap-y-5'>
                    <Card className='flex w-3/5 h-28 dark:bg-[#131417]'>
                        <div className='flex m-5 '>
                            <div className="flex w-7 h-10 pt-1 ">
                                <img className="w-5 h-5 " src="/task_icon.svg" alt="Project" />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-sm '>Task assigned</span>
                                    <span className=' text-[#737377]'>|</span>
                                    <span className=" text-sm text-[#737377]">just now</span>
                                </div>
                                <span>Task 24 <span className=' text-[#737377]'>of</span> sprint 4</span>
                                <span className=' text-[#737377] text-sm'>Assigned by <span className='font-medium'>Nuha Fathima</span></span>
                            </div>
                        </div>

                    </Card>

                    <Card className='flex w-3/5 h-28 dark:bg-[#131417]'>
                        <div className='flex m-5 '>
                            <div className="flex w-7 h-10 pt-1  ">
                                <img className="w-5 h-5 " src={taskdone} alt="Project" />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-sm '>Task moved to Done</span>
                                    <span className=' text-[#737377]'>|</span>
                                    <span className=" text-sm text-[#737377]">3s ago</span>
                                </div>
                                <span>Price API integration <span className=' text-[#737377]'>of</span> sprint 4</span>
                                <span className=' text-[#737377] text-sm'> By <span className='font-medium'>Roshan</span></span>
                            </div>
                        </div>

                    </Card>

                    <Card className='flex w-3/5 h-20 dark:bg-[#131417]'>
                        <div className='flex my-4 ml-5 '>
                            <div className="flex w-7 h-10 pt-1   ">
                                <img className="w-5 h-5 " src={repeatblue} alt="Project" />
                            </div>
                            <div className='flex flex-col '>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-sm '>Upcoming Sprint</span>
                                    <span className=' text-[#737377]'>|</span>
                                    <span className=" text-sm text-[#737377]">9.00 AM</span>
                                </div>
                                <span>Sprint 4 <span className=' text-[#737377]'>of </span>Mawasim <span className=' text-[#737377]'>will start </span>Tomorrow</span>

                            </div>
                        </div>

                    </Card>

                    <Card className='flex w-3/5 h-20 dark:bg-[#131417]'>
                        <div className='flex ml-5 my-4'>
                            <div className="flex w-7 h-10 pt-1  ">
                                <img className="w-5 h-5 " src={repeatyellow} alt="Project" />
                            </div>
                            <div className='flex flex-col '>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-sm '>Upcoming Sprint Retro</span>
                                    <span className=' text-[#737377]'>|</span>
                                    <span className=" text-sm text-[#737377]">22 jan 2023</span>
                                </div>
                                <span>Sprint 3 <span className=' text-[#737377]'>of </span>Mawasim <span className=' text-[#737377]'>ends </span>Tomorrow</span>

                            </div>
                        </div>

                    </Card>
                    <Card className='flex w-3/5 h-28 dark:bg-[#131417]'>
                        <div className='flex m-5 '>
                            <div className="flex w-7 h-10 pt-1 ">
                                <img className="w-5 h-5 " src={comments} alt="Project" />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-sm '>Comment</span>
                                    <span className=' text-[#737377]'>|</span>
                                    <span className=" text-sm text-[#737377]">22 jan 2023</span>
                                </div>
                                <span>"we need to revise the specs"</span>
                                <span className=' text-[#737377] text-sm'>By <span className='font-medium'>ShabeerAli </span>on story <span className='font-medium'>'Setup Backend'</span></span>
                            </div>
                        </div>

                    </Card>

                </div>

            </div>

        </div>
    )
}

export default Notification
