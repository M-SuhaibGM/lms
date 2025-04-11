import { db } from '../src/lib/db';
import { Category, Course, Chapter } from "@prisma/client"
import { progress as getProgress } from './progress';

type DashbordCourse = {
    CompletedCourses: CourseWithProgressWithCategory[];
    courseInProgress: CourseWithProgressWithCategory[]
}

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
};


export const getDashbordCourse = async (userId: string): Promise<DashbordCourse> => {

    try {
        const purchaseCourse = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true
                            }
                        }
                    }
                }
            }
        })


        const courses = purchaseCourse.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];



        for (let course of courses) {
            const progress = await getProgress(userId, course.id); 
            course["progress"] = Number(progress);
        }
        const CompletedCourses = courses.filter((course) => course.progress === 100);
        const courseInProgress = courses.filter((course) => (course.progress ?? 0) < 100)



        return {
            CompletedCourses,
            courseInProgress,
        }
    } catch (e) {
        console.log(e)
        return {
            CompletedCourses: [],
            courseInProgress: [],
        }
    }

} 