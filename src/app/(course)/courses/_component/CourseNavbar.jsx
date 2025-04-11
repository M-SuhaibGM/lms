import NevbarRoute from '../../../../components/ui/nevbarRoute'
import React from 'react'

const CourseNavbar = ({ progressCount, course }) => {
    return (
        <div className='p-4 border-b h-full flex items-center justify-end bg-white shadow-sm'>
            <NevbarRoute />
        </div>
    )
}

export default CourseNavbar