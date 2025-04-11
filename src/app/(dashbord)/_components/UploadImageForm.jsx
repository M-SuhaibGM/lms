"use client";
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { CirclePlus, ImageIcon, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UploadDropzone } from '../../../lib/uploadthing';


const ImageForm = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const router = useRouter();

    const onSubmit = async (url) => {
        try {
            setIsLoading(true); // Set loading state
            await axios.patch(`/api/courses/${data.id}`, { imageUrl: url });
            setImageUrl(url); // Update the imageUrl state
            setEditing(false); // Exit editing mode
            router.refresh(); // Refresh the page to reflect changes
            toast.success("Image updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className='mt-6 border bg-slate-100 rounded-sm p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course Image
                <Button
                    onClick={() => setEditing(!editing)}
                    className="cursor-pointer border-2 shadow-md"
                    variant="ghost"
                    disabled={isLoading} // Disable button while loading
                    size={undefined}
                >
                    {editing && "Cancel"}
                    {!editing && !data.imageUrl && <><CirclePlus className='h-4 w-4 mr-2' />Upload Image</>}
                    {!editing && data.imageUrl && <><Pencil className='h-4 w-4 mr-2' />Edit Image</>}
                </Button>
            </div>

            {!editing && !data.imageUrl && (
                <div className='flex items-center justify-center h-70 rounded-sm bg-slate-200 border p-2'>
                    <ImageIcon className='h-10 w-10 text-slate-500' />
                </div>
            )}
            {!editing&& data.imageUrl && (
                <div className='relative aspect-video mt-2'>
                    <img
                        src={data.imageUrl}
                        alt="course image"
                        
                        className="rounded-md  h-70 w-full object-cover"
                    />
                </div>
            )}
            {editing && (
                <div className=' flex h-full flex-col justify-center items-center'>
                    <UploadDropzone
                    
                        className='cursor-pointer  bg-slate-300 '
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            
                            if (res && res.length > 0) {
                                const url = res[0].ufsUrl;
                                setImageUrl(url);
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

                    <div className='text-xs text-muted-foreground mt-4'>
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageForm;