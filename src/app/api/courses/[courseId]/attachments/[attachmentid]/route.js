
import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";
export async function DELETE(request, { params }) {
    try {
        const { courseId, Id } = await params;
     

        const deletes = await db.attachment.deleteMany({
            where: {
                id: Id,
                courseId: courseId
            }
        })
        return NextResponse.json("attachment deleted", { status: 200 });

    } catch (error) {
        console.error("Error deleting attachment:", error);
        return new NextResponse(JSON.stringify({ message: "INTERNAL ERROR" }), { status: 500 });
    }
}
