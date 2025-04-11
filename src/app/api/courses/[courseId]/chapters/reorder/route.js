import { auth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server"
import { db } from "../../../../../../lib/db";

export async function POST(request, { params }) {
    try {
        const data = await request.json();

        const {userId} = await auth()
        const { courseId } = await params;
        const list = data.e


        if (!userId) {
            return new NextResponse("unAuthraized", { status: 401 })
        }
        for (let item of list) {
            const chapter = await db.chapter.update({
                where: {
                    id: item.id,
                },
                data: {
                    position: item.position,
                }
            })
        }

        return NextResponse.json({ message: "Chapter Reorder" })

    } catch (error) {
        console.error(error)
        return new NextResponse({ message: "INTERNAL ERROR" }, { status: 500 });
    }


}