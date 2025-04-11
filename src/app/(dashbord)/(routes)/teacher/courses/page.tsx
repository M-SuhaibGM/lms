
import React from 'react'
import { DataTable } from './[courseId]/_components/data'
import { columns } from './[courseId]/_components/coloums'
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"
import { db } from "../../../../../lib/db"


const page = async () => {

    const { userId } = await auth()
    if (!userId) {
        redirect('/')
    }
    const courses = await db.course.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    )
}

export default page