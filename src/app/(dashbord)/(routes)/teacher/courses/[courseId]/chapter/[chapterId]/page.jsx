import React from 'react'
import { db } from '../../../../../../../../lib/db'
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { ArrowLeftIcon, Eye, LayoutDashboard } from "lucide-react"
import ChapterTitle from './_component/chapterTitle'
import ChapterDescription from './_component/ChapterDescription'
import ChapterAccess from './_component/ChapterAccess'
import ChapterVideo from './_component/ChapterVideo'
import Banner from '../../../../../../../../components/ui/Banner'
import ChapterPublish from './_component/ChapterPublish';
import toast from 'react-hot-toast';
const Chapter = async ({ params }) => {
    const { courseId, chapterId } = await params;

    const chapter = await db.chapter.findUnique({
        where: {
            id: chapterId,
            courseId: courseId,
        },
        include: {
            muxData: true,
        },
    })
    if (!chapter && !courseId && !chapterId) {
        toast.error('Chapter Not Found')
        redirect("/")
    }

    const RequreFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl,
    ]
    const totalFields = RequreFields.length;
    const CompletedFields = RequreFields.filter((Boolean)).length;
    const progress = (`${CompletedFields}/${totalFields}`)
    const isComplete = RequreFields.every(Boolean)


    return (
        <div className='overflow-y-scroll h-[86.5vh]   scrollbar-hidden'>
            {!chapter.isPublished && <Banner variant='warning' label='This Chaptser is Not Published' />}
         
            <div className='p-6 '>
                <div className='flex justify-between items-center'>
                    <div>
                        <Link href={`/teacher/courses/${courseId}`} className='flex items-center text-sm hover:opacity-75  transition mb-6'>
                            <ArrowLeftIcon className='h-5 w-5 mr-1' />
                            Back to course setup
                        </Link>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex flex-col gap-y-2'>
                                <h1 className='text-2xl font-bold'>Chapter Creation</h1>
                                <span>Complite all Fields {progress}</span>
                            </div>

                        </div>
                    </div>
                    <ChapterPublish chapter={chapter} disabled={!isComplete} />
                </div>
                <div className='grid grid-cols-1 md :grid-cols-2 gap-6 mt-16'>
                    <div className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <LayoutDashboard size={40} className="bg-blue-500 rounded-full p-2 " />
                                <h2 className="text-xl">Custmize Your Chapter</h2>
                            </div>
                            <ChapterTitle data={chapter} />

                            <ChapterDescription data={chapter} />
                        </div>

                    </div>
                    <div className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <Eye size={40} className="bg-blue-500 rounded-full p-2 " />
                                <h2 className="text-xl">Access Seting</h2>
                            </div>
                            <ChapterAccess data={chapter} />
                            <ChapterVideo data={chapter} />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Chapter