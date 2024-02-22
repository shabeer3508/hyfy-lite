import React from 'react'
import { Label } from "@/components/ui/label"
import HYSelect from '@/components/HYComponents/HYSelect'
import HYSearch from '@/components/HYComponents/HYSearch'

const Notification = () => {
  return (
    <div className='flex flex-col px-6 w-full  '>
        <div className='flex items-center w-2/3 '>
            <Label className="" htmlFor="notification">Notifications</Label>
            <HYSelect className="" label="Recent" options={["Recent", "Old"]} id={"filter"} />
			<HYSelect className="" label="All types" options={["all", "admin", "manager", "employee"]} id={"user"} />
            <HYSearch/>

        </div>
      
    </div>
  )
}

export default Notification
