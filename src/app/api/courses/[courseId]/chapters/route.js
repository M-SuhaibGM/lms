import { auth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server"
import { db } from "../../../../../lib/db";

export async function POST(request, { params }) {
    try {
        const data = await request.json();
        const tittle = data.title;
        const {userId} = await auth()
        const { courseId } = await params;

        if (!userId) {
            return new NextResponse("unAuthraized", { status: 401 })
        }

        const lastchapter = await db.chapter.findFirst({
            where: {
                courseId,
            },
            orderBy: {
                position: "desc"
            }
        })

        const position = lastchapter ? lastchapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                position,
                title: tittle,
                courseId,
            }
        })
        return NextResponse.json(chapter)

    } catch (error) {
        console.error(error)
        return new NextResponse({ message: "INTERNAL ERROR" }, { status: 500 });
    }


}