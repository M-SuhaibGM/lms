"use client";
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { CirclePlus, Pencil, File, Delete } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UploadDropzone } from '../../../lib/uploadthing';


const AttachmentForm = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();


    const attachment = data.attachments
    const onSubmit = async (url) => {
        try {
            setIsLoading(true); // Set loading state
            await axios.post(`/api/courses/${data.id}/attachments`, { url });
            setEditing(false); // Exit editing mode
            router.refresh(); // Refresh the page to reflect changes
            toast.success("Attachment added successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };
    const onDelete = async (Id) => {
        try {
            setIsLoading(true); // Set loading state
            await axios.delete(`/api/courses/${data.id}/attachments/${Id}`);
            router.refresh(); // Refresh the page to reflect changes
            toast.success("Attachment deleted successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false); 
        }

    };

    return (
        <div className='mt-6 border bg-slate-100 rounded-sm p-4'>
            <div className='font-medium flex items-center justify-between'>
                Attachment & Resources
                <Button
                    onClick={() => setEditing(!editing)}
                    className="cursor-pointer shadow-md border-2"
                    variant="ghost"
                    disabled={isLoading} // Disable button while loading
                    size={undefined}
                >
                    {editing && "Cancel"}
                    {!editing && !data.attachments.length > 0 && <><CirclePlus className='h-4 w-4 mr-2' />Upload Attachment</>}
                    {!editing && data.attachments.length > 0 && <><Pencil className='h-4 w-4 mr-2' />Edit Attachment</>}
                </Button>
            </div>

            {!editing && data.attachments.length === 0 && (
                <div className='flex items-center justify-center h-full mt-3 rounded-sm bg-slate-200 border p-2'>
                    <File className='h-10 w-10 text-slate-500' />
                    <p>No Attachment</p>
                </div>
            )}
            {!editing && data.attachments.length > 0 && (
                <div>
                    {attachment.map((attachment) => (
                        <div key={attachment.id} className='flex p-3  mt-4 items-center bg-sky-100  border-sky-200 gap-3 rounded-md'>
                            <File className='h-4 w-4 text-slate-500  flex-shrink-0' />
                            <p className='text-xs line-clamp-1'>{attachment.name}</p>
                            <Delete onClick={() => onDelete(attachment.id)} className='cursor-pointer  ' />

                        </div>
                    ))}


                </div>
            )}
            {editing && (
                <div className=' flex h-full flex-col justify-center items-center'>
                    <UploadDropzone
                        className='cursor-pointer  bg-slate-300'
                        endpoint="CourseAttachment"
                        onClientUploadComplete={(res) => {

                            if (res && res.length > 0) {
                                const url = res[0].ufsUrl;
                                onSubmit(url); // Call onSubmit with the new URL
                            } else {
                                toast.error("Upload failed: No URL returned");
                            }
                        }}
                        onUploadError={(error) => {
                            console.error("Upload error:", error); // Debugging: Log the error
                            toast.error(`Upload failed: ${error.message}`);
                        }}
                    />


                </div>
            )}
        </div>
    );
};

export default AttachmentForm;