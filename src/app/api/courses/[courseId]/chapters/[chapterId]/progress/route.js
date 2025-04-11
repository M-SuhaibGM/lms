import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../../../../../../../lib/db";

export async function PUT(request, { params }) {

    try {
        const {userId }= await auth()
        const { courseId, chapterId } = await params;
        const data = await request.json();
        const isComplited = data.isCompleted;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId

                }
            },
            update: {
                isComplited
            },
            create: {
                userId,
                chapterId,
                isComplited
            }
        })

        return new NextResponse(userProgress);

    } catch (e) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}