import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";

export async function PATCH(request, { params }) {
    try {
        const data = await request.json(); // Fix: Corrected variable name
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, chapterId } = await params; // Fix: Corrected params destructuring

        if (!courseId) {
            return new NextResponse("Course ID is required", { status: 400 });
        }


        // Update course title where courseId matches
        const updatedChapter = await db.chapter.update({
            where: { id: chapterId, courseId: courseId },
            data: { ...data },
            // Fix: Updating the correct field
        });
        const publishchaptersincourse = await db.chapter.findMany({
            where: { courseId: courseId, isPublished: true }
        })

        if (publishchaptersincourse.length === 0) {
            await db.course.update({
                where: { id: courseId },
                data: { isPublished: false }
            })
        }

        return NextResponse.json({ message: "Course title updated", course: updatedChapter });

    } catch (error) {
        console.error("Error updating course title:", error);
        return new NextResponse(JSON.stringify({ message: "INTERNAL ERROR" }), { status: 500 });
    }
}


export async function POST(request, { params }) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, chapterId } = params;

        if (!courseId || !chapterId) {
            return new NextResponse("Course ID and Chapter ID are required", { status: 400 });
        }

        // Get the course owner to verify ownership
        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { videoUrl } = await request.json();

        if (!videoUrl) {
            return new NextResponse("Video URL is required", { status: 400 });
        }

        // Update the chapter with the new video URL
        const updatedChapter = await db.chapter.update({
            where: { 
                id: chapterId, 
                courseId: courseId 
            },
            data: { 
                videoUrl: videoUrl 
            },
        });

        return NextResponse.json(updatedChapter);
    } catch (error) {
        console.error("[CHAPTER_VIDEO_UPDATE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(request, { params }) {


    try {

        const { courseId, chapterId } = await params;

        if (!courseId || !chapterId) {
            return new NextResponse("Course ID and Chapter ID are required", { status: 400 });
        }


        const Chapter = await db.chapter.delete({
            where: { id: chapterId, courseId: courseId },
        });

        return NextResponse.json({ message: "Chapter deleted successfully", });
    } catch (error) {
        console.error("Error DELETING chapter :", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}