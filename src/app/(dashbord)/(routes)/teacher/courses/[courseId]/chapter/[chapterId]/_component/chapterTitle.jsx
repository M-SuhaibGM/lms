"use client"
import React, { useState } from 'react';
import { Button } from "../../../../../../../../../components/ui/button";
import { Input } from '../../../../../../../../../components/ui/input';
import { Pencil ,Loader2} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ChapterTitle = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(data?.title || "");
    const [isSubmitting, setIsSubmitting] = useState(false); // Fix: Set initial value properly
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.patch(`/api/courses/${data.courseId}/chapters/${data.id}`, { title });
            setEditing(false);
            router.refresh();
            toast.success("Title updated successfully")


        } catch (e) {
            toast.error("Something went wrong")
        }
        finally {
            setIsSubmitting(false);
        }

    };

    return (
        <div className='mt-6 border bg-slate-100 rounded-sm p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course Title
                <Button onClick={() => setEditing(!editing)} className="cursor-pointer border-2 shadow-md" variant="ghost">
                    {editing ? "Cancel" : <><Pencil className='h-4 w-4 mr-2' />Edit Title</>}
                </Button>
            </div>

            {!editing ? (
                <p className='text-sm mt-2  text-slate-500   p-2'>{data?.title || "No title available"}</p>
            ) : (
                <form className="space-y-4 mt-4" onSubmit={onSubmit}>
                    <Input
                        placeholder='e.g. "Advanced Web Development"'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Fix: Update state on input change
                    />
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> {/* Spinner icon */}
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ChapterTitle;
