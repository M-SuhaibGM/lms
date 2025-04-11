import { auth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";

export async function POST(request, { params }) {
    try {
        const data = await request.json(); // Fix: Corrected variable name
        const {userId} = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = await params; // Fix: Corrected params destructuring

        if (!courseId) {
            return new NextResponse("Course ID is required", { status: 400 });
        }
        const Courseowner = await db.course.findUnique({
            where: {
                id: courseId,
                userId: userId
            }
        })

        if (!Courseowner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const attachment = await db.attachment.create({

            data: {
                url: data.url,
                name: data.url.split("/").pop(),
                courseId,

            },
        });

        return NextResponse.json("attachment added", { status: 200 });

    } catch (error) {
        console.error("Error updating course title:", error);
        return new NextResponse(JSON.stringify({ message: "INTERNAL ERROR" }), { status: 500 });
    }
}
