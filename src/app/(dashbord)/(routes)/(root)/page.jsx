import React from 'react'
import { auth, } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDashbordCourse } from '../../../../../actions/get-dashbord-course'
import { CourseList } from '../search/_component/CourseList'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from './_components/InfoCard'

const Dashbord = async () => {
  const {userId} = await auth()

  if (!userId) {
    return redirect("/")
  }
  const { CompletedCourses, courseInProgress, } = await getDashbordCourse(userId)
  return (
    <div className='p-6 space-y-4 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <InfoCard Icon={Clock} label="In Progress" numberOfItems={courseInProgress.length} />

        <InfoCard Icon={CheckCircle} label="Completed" numberOfItems={CompletedCourses.length} variant="success" />
      </div>
      <CourseList items={[...courseInProgress, ...CompletedCourses]} />
    </div>
  )
}

export default Dashbord
