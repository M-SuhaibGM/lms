import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { formetPrice } from '../../../../../lib/formet'
import CourseProgress from '../../../../../components/ui/CourseProgress'

const CourseCard = ({ title, category, imageUrl, chapterLength, price, progress, id }) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className='group hover:shadow-sm transition z-0 overflow-hidden border rounded-lg p-3 h-full '>
                <div className='relative w-full aspect-video rounded-md overflow-hidden'>
                    <img src={imageUrl} alt={title} className='  z-0 ' />
                </div>

                <div className='flex flex-col pt-2'>
                    <div className='text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2 '>
                        {title}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                        {category}
                    </p>
                    <div className='  my-3 flex items-center gap-x-2 text-sm md:text-xs'>
                        <div className='flex items-center gap-x-1 text-slate-500'>
                            <BookOpen className='bg-sky-700 rounded-full' />
                            <span>
                                {chapterLength}{chapterLength === 1 ? "Chapter" : "Chapters"}
                            </span>

                        </div>
                    </div>
                    {progress !== null ? (
                        <div>
                            <CourseProgress size="sm" variant={progress === 100 ? "success" : "default"} value={progress} />
                        </div>) : (
                        <p className='text-md md:text-sm font-medium text-slate-700'>
                            {formetPrice(price)}
                        </p>
                    )
                    }


                </div>


            </div>
        </Link>
    )
}

export default CourseCard