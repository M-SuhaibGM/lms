import React from 'react'
import { db } from '../../../../lib/db'
import Catagery from './_component/Catagery'
import { auth } from '@clerk/nextjs/server'
import { GetCourses } from '../../../../../actions/get-course'
import { CourseList } from './_component/CourseList'

const page = async (searchPrams) => {
  const { userId } = await auth()
  const catagery = await db.category.findMany({
    orderBy: {
      name: "asc"
    },
  })

  const { catageryId } = await searchPrams.searchParams
  const { title } = await searchPrams.searchParams


  const courses = await GetCourses({
    userId,
    catageryId,
    title,
  })
  return (
    <div className='p-6 space-y-4'>
      <Catagery item={catagery} />
      <CourseList items={courses} />
    </div>
  )
}

export default page