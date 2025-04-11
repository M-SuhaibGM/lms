"use client"

import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import ConfettiAnimation from '../../../../components/ui/Confeti'
import { useState } from 'react'


const CourseProgressButton = ({ chapterId, courseId, isCompleted,nextChapterId }) => {

    const router = useRouter();
    const [loading, setloading] = useState(false)
    const [animation, setanimation] = useState(false)
 

    

    const onClick = async () => {
        setloading(true)
        try {
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            })
            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
            }
            if (!isCompleted && !nextChapterId) {
                setanimation(true)
            }
            toast.success("Progress Updated")
            router.refresh()

        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setloading(false)
        }
    }
    const Icon = isCompleted ? XCircle : CheckCircle

    return (
        <>
            {animation && <ConfettiAnimation /> }
            <Button type="button" onClick={onClick} disabled={loading} variant={isCompleted ? "outline" : "success"} className="w-full md:w-auto" >
                {isCompleted ? "Not Completed" : "Mark as Completed"}
                <Icon className="ml-2  h-4 w-4" />
            </Button>
        </>
    )
}

export default CourseProgressButton