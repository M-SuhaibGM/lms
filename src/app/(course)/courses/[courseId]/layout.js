import { auth} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../../../../lib/db";
import { progress } from "../../../../../actions/progress";
import CourseSidebar from "../_component/CourseSidebar";
import CourseNavbar from "../_component/CourseNavbar";

export default async function Layout({ children, params }) {
    const { courseId } = await params
 
    const {userId }= await auth()
    if (!userId) {
        return redirect("/")
    }
    const course = await db.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        },
                    }
                },
                orderBy: {
                    position: "asc",
                }
            },

        }
    })

    if (!course) {
        return redirect("/")
    }

    const progressCount = await progress(userId, course.id)
    return (

        <div className="container  h-full ">
            <div className="h-[80px] md:pl-80 fixed insert-y-0 w-full z-50">
                <CourseNavbar progressCount={progressCount} course={course} />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col  fixed inset-y-0 z-50  ">
                <CourseSidebar course={course} progressCount={progressCount} />
            </div>
            <main className="md:pl-80  pt-[80px] h-full">
                {children}
            </main>
        </div>
    );
}
