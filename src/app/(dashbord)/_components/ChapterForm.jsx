"use client"
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from '../../../components/ui/input';
import { Pencil, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ChapterList from './ChapterList';

const ChapterForm = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [title, settitle] = useState(data?.chapters.title || ""); // Fix: Set initial value properly
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUpdating, setisUpdating] = useState(false)
    const router = useRouter();
    const chapters = data.chapters
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`/api/courses/${data.id}/chapters`, { title });
            setEditing(false);
            router.refresh();
            toast.success("Chapter created ")


        } catch (e) {
            toast.error("Something went wrong")
        }
        finally {
            setIsSubmitting(false);
        }

    };
    const onRecord = async (e) => {
        setisUpdating(true)
        try {
            await axios.post(`/api/courses/${data.id}/chapters/reorder`, { e });
            setEditing(false);
            router.refresh();
            toast.success("Chapter Reorder")


        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setisUpdating(false)
        }


    };
const onEdit = async (id) => {
    router.push(`/teacher/courses/${data.id}/chapter/${id}`)
}

    return (
        <div className='mt-6  relative border bg-slate-100 rounded-sm p-4'>
            {isUpdating &&
                <div className='h-full w-full absolute bg-slate-700/20 top-0 right-0 rounded-md flex items-center justify-center'>
                    <Loader2 className='animate-spin h-5 w-5 text-sky-700 ' /></div>}
            <div className='font-medium flex items-center justify-between'>
                Course Chapter
                <Button onClick={() => setEditing(!editing)} className="cursor-pointer border-2 shadow-md" variant="ghost">
                    {editing ? "Cancel" : <><Pencil className='h-4 w-4 mr-2' />Create Chapter</>}
                </Button>
            </div>
            {!editing && chapters.length > 0 && <ChapterList onEdit={onEdit}
                onRecord={onRecord}
                item={chapters || []} />}
            {editing && !chapters.length > 0 && <p className='text-sm mt-2 text-slate-500   p-2'>  No chapter title </p>}
            {editing && (
                <form className="space-y-4 mt-4" onSubmit={onSubmit}>
                    <Input
                        placeholder='Enter chapter Title'
                        required
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                    <div className="flex items-center gap-x-2">
                        <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ChapterForm;
