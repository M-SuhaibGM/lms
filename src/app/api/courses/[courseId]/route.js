import { auth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function PATCH(request, { params }) {
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

        // Update course title where courseId matches
        const updatedCourse = await db.course.update({
            where: { id: courseId },
            data: { ...data }, // Fix: Updating the correct field
        });

        return NextResponse.json({ message: "Course title updated", course: updatedCourse });

    } catch (error) {
        console.error("Error updating course title:", error);
        return new NextResponse(JSON.stringify({ message: "INTERNAL ERROR" }), { status: 500 });
    }
}
export async function DELETE(request, { params }) {
    try {

        const { courseId } = await params; // Fix: Corrected params destructuring

        if (!courseId) {
            return new NextResponse("Course ID is required", { status: 400 });
        }

        const Course = await db.course.delete({
            where: { id: courseId },
        });

        return NextResponse.json({ message: "Course  deleted" });

    } catch (error) {
        console.error("Error deleting course:", error);
        return new NextResponse(JSON.stringify({ message: "INTERNAL ERROR" }), { status: 500 });
    }
}
