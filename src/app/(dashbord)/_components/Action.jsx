"use client"
import { Trash, Loader2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import React from 'react'
import ConfermModel from '../../../components/ui/models/Conferm-model'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ConfettiAnimation from '../../../components/ui/Confeti'
const ChapterAction = ({ course, disabled }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ispublishing, setispublishing] = useState(false)
    const [animation, setanimation] = useState(false)
    const router = useRouter()
    const onDelete = async () => {
        try {
            setIsSubmitting(true);
            await axios.delete(`/api/courses/${course.id}`)
            router.push(`/teacher/courses`)
            toast.success('Course Deleted')
            router.refresh()
            setIsSubmitting(false);
        } catch (err) {
            setIsSubmitting(false)
            console.log(err)
            toast.error('Something went wrong')
        }
    }
    const onPublish = async () => {
        try {
            setispublishing(true);
            if (course.isPublished === true) {
                await axios.patch(`/api/courses/${course.id}`, { isPublished: false })
                toast.success('Course Unpublished')
                router.refresh()
            }
            else {
                await axios.patch(`/api/courses/${course.id}`, { isPublished: true })
                toast.success('Course Published')
                router.refresh()
                setanimation(true)
            }
            setispublishing(false);
        } catch (err) {
            setispublishing(false)
            console.log(err)
            toast.error('Something went wrong')
        }
    }
    return (
        <div>
            <div className='flex items-center justify-between  gap-x-2'>
                {animation && <ConfettiAnimation duration={5000} />}
                <Button disabled={disabled || isSubmitting} className="cursor-pointer" variant={"outline"} onClick={onPublish} size="sm">
                    {ispublishing ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <> {course.isPublished ? 'UnPublish' : 'Publish'}</>
                    )}

                </Button>
                <ConfermModel onConfirm={onDelete}>
                    <Button
                        size="sm"
                        className="cursor-pointer"
                        disabled={isSubmitting} // Disable button while submitting
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                loading...
                            </>
                        ) : (
                            <Trash className='h-4 w-4 ' />
                        )}
                    </Button>
                </ConfermModel>
            </div>
        </div>
    )
}

export default ChapterAction