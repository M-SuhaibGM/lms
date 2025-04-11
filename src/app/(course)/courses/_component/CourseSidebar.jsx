import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { db } from '../../../../lib/db'
import CourseSidebaritem from './CourseSidebaritem'
import CourseProgress from '../../../../components/ui/CourseProgress'

const CourseSidebar = async ({ course, progressCount }) => {

    const {userId} = await auth()
    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id,
            }
        }
    });


    return (
        <div className='h-full flex flex-col border-r overflow-y-auto shadow-sm'>
            <div className='p-8 flex flex-col border-b'>
                <h1 className='font-semibold'>
                    {course.titte}
                </h1>

                {purchase && (
                    <div className='mt-10  '>
                        <CourseProgress variant="success"  value={progressCount} />
                    </div>
                )}
            </div>
            <div className='flex flex-col w-full '>
                {course.chapters.map((chapter) => (
                    <CourseSidebaritem key={chapter.id} id={chapter.id} label={chapter.title} isCompleted={!!chapter.userProgress?.[0]?.isComplited} courseId={course.id} isLocked={!chapter.isFree && !purchase} />
                ))
                }
            </div>
        </div>
    )
}

export default CourseSidebar