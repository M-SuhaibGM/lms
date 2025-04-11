import Banner from "../../../../../../components/ui/Banner";
import { GetChapter } from "../../../../../../../actions/get-chapter";
import { auth, } from "@clerk/nextjs/server";
import VideoPlayer from "../../../../../../components/ui/VideoPlayer"
import CourseInroleButton from "../../../_component/CourseInroleButton";
import { Lock, File } from "lucide-react";
import { Separator } from "../../../../../../components/ui/separator";
import CourseProgressButton from "../../../_component/CourseProgressButton";

const page = async ({ params }) => {
    const { courseId, chapterid } = await params;
    const {userId} = await auth()


    const {
        chapter,
        course,
        attachments,
        nextChapter,
        purchase,
        userProgress

    } = await GetChapter({
        userId,
        courseId,
        chapterId: chapterid,
    })
    const isLocked = !chapter?.isFree && !purchase;
    const compliteOnEnd = !!purchase && !userProgress?.isCompleted;
    return (
        <div className="overflow-y-scroll h-[86.5vh]   scrollbar-hidden ">
            {userProgress?.isComplited && (
                <Banner
                    variant="success"
                    label="you already completed this chapter "
                />
            )}
            {
                isLocked && (
                    <Banner variant="warning"
                        label="you need to purchase this course to watch ."
                    />
                )}

            <div className="flex  z-10  mt-3  relative flex-col max-w-3xl mx-auto ">
                <div className="absolute  pl-5 pt-2  text-white  text-2xl">{chapter.title}</div>
                {isLocked ? < div className=" bg-slate-400 h-[60vh] rounded-2xl border-sky-700 border-4 w-full flex items-center justify-center  "><Lock className="text-white w-12 h-12" /></div> : <VideoPlayer videoName={chapter.videoUrl} />}
            </div>
            <div className=" px-24 py-5 flex  gap-2  flex-col      ">
                <div className="  flex gap-2   justify-between items-center  ">
                    <div className="text-2xl font-semibold mb-2">
                        {chapter.title}
                    </div>
                    {purchase ? (<><CourseProgressButton chapterId={chapterid} courseId={courseId} isCompleted={!!userProgress?.isComplited} nextChapterId={nextChapter?.id} /></>
                    ) : (
                        <CourseInroleButton
                            courseId={courseId}
                            price={course.price}
                        />
                    )}
                </div>
                <div className="text-xl text-slate-500 mb-2">
                    {chapter.description}
                </div>
                {attachments?.length > 0 && (
                    <>
                        <Separator />
                        <div className="p-4">
                            {
                                attachments.map((attachment) => (
                                    <a href={attachment.url} target="_blank" key={attachment.id}
                                        className="hover:underline   flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md "
                                    >
                                        <File />
                                        <p className="line-clamp-1">
                                            {attachment.name}
                                        </p>
                                    </a>
                                ))
                            }

                        </div>
                    </>
                )
                }


            </div>

        </div>
    )
}

export default page 