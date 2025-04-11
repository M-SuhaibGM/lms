"use client";
import React, { useState } from 'react';
import { Button } from "../../../../../../../../../components/ui/button";
import { CirclePlus, VideoIcon, Pencil, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import VideoPlayer from '../../../../../../../../../components/ui/VideoPlayer';
import { UploadDropzone } from '@uploadthing/react';

const VideoForm = ({ data }) => {
    const [editing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (videoUrl) => {
        try {
            setIsLoading(true);
            await axios.post(`/api/courses/${data.courseId}/chapters/${data.id}`, {
                videoUrl: videoUrl
            });
            router.refresh();
            toast.success("Video updated successfully");
            setEditing(false);
        } catch (error) {
            toast.error("Video update failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='mt-6 border bg-slate-100 rounded-sm p-4'>
            <div className='font-medium flex items-center justify-between'>
                Course Video
                <Button
                    onClick={() => setEditing(!editing)}
                    className="cursor-pointer border-2 shadow-md"
                    variant="ghost"
                    disabled={isLoading}
                >
                    {editing && "Cancel"}
                    {!editing && !data.videoUrl && <><CirclePlus className='h-4 w-4 mr-2' />Upload Video</>}
                    {!editing && data.videoUrl && <><Pencil className='h-4 w-4 mr-2' />Edit Video</>}
                </Button>
            </div>

            {!editing && !data.videoUrl && (
                <div className='flex items-center justify-center h-70 rounded-sm bg-slate-200 border p-2'>
                    <VideoIcon className='h-10 w-10 text-slate-500' />
                </div>
            )}
            {!editing && data.videoUrl && (
                <div className='relative aspect-video h-60 mt-2'>
                    <VideoPlayer videoName={data.videoUrl} />
                </div>
            )}
            {editing && (
                <div className='flex flex-col items-center'>
                    <UploadDropzone
                        endpoint="Coursevideo"
                        onClientUploadComplete={(res) => {
                            if (res && res.length > 0) {
                                handleSubmit(res[0].url);
                            } else {
                                toast.error("Upload failed: No URL returned");
                            }
                        }}
                        onUploadError={(error) => {
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

export default VideoForm;