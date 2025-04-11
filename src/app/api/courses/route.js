import {  auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"
import { db } from "../../../lib/db";

export async function POST(request) {
    try {
        const data = await request.json();
        const tittle = data.tittle;
        const {userId} = await auth()
    
        if (!userId) {
            return new NextResponse("unAuthraized", { status: 401 })
        }
        const course = await db.course.create({
            data: {
                userId,
                titte:tittle,
            }
        })
        return  NextResponse.json(course)

    } catch (error) {
        
        return  new NextResponse({ message: "INTERNAL ERROR" }, { status: 500 });
    }


}