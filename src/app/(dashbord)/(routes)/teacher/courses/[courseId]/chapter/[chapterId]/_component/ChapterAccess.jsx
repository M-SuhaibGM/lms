"use client";
import React, { useState } from 'react';
import { Button } from "../../../../../../../../../components/ui/button";
import { Pencil, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ChapterAccess = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [isFree, setIsFree] = useState(data?.isFree || false); // Initialize with the current value of isFree
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.patch(`/api/courses/${data.courseId}/chapters/${data.id}`, { isFree });
            setEditing(false); // Exit editing mode
            router.refresh(); // Refresh the page to reflect changes
            toast.success("Chapter access updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <div className='mt-6 border bg-slate-100 rounded-sm p-4'>
            <div className='font-medium flex items-center justify-between'>
                Chapter Access
                <Button
                    onClick={() => setEditing(!editing)}
                    className="cursor-pointer border-2 shadow-md"
                    variant="ghost"
                >
                    {editing ? "Cancel" : <><Pencil className='h-4 w-4 mr-2' />Edit Access</>}
                </Button>
            </div>

            {!editing ? (
                <p className='text-sm mt-2 text-slate-500 p-2'>
                    {data?.isFree ? "This chapter is free" : "This chapter is not free"}
                </p>
            ) : (
                <form className="space-y-4 mt-4" onSubmit={onSubmit}>
                    <div className="flex items-center gap-x-2">
                        <input
                            type="checkbox"
                            id="isFree"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)} // Update isFree state when checkbox is toggled
                            className="h-4 w-4"
                        />
                        <label htmlFor="isFree" className="text-sm text-slate-700">
                            Make this chapter free
                        </label>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={isSubmitting} // Disable button while submitting
                        >
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
                </form>
            )}
        </div>
    );
};

export default ChapterAccess;