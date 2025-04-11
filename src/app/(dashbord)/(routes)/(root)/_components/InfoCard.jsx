
import { cn } from '../../../../../lib/utils'
import React from 'react'

const InfoCard = ({variant,Icon ,label, numberOfItems }) => {
    return (
        <div className='border rounded-md flex items-center gap-x-2 p-3'>
            <Icon className={cn(" bg-sky-200  rounded-full  p-2 h-10 w-10 ",variant=="success"&&"bg-emerald-300")} />
            <div>
                <p className='font-medium'>{label}</p>
                <p className='text-gray-500 text-sm'>{numberOfItems}{numberOfItems === 1 ? "Course" : "Courses"}</p>
            </div>
        </div>
    )
}

export default InfoCard