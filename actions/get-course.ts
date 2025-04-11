import { progress } from './progress';
import { db } from '../src/lib/db';
import { Category, Course } from "@prisma/client"

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type GetCoursesProps = {
    userId: string;
    title?: string;
    catageryId?: string;
};

export const GetCourses = async ({ userId, title, catageryId
}: GetCoursesProps): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                titte: {
                    contains: title,
                },
                categoryId: catageryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                Purchase: {
                    where: {
                        userId,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        const courseWithProgree: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if (course.Purchase.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    }
                }
                const progressPercentage = await progress(userId, course.id);
                return {
                    ...course,
                    progress: progressPercentage as number
                }
            }))


        return courseWithProgree;
    } catch (e) {

        console.error('Failed to fetch courses:', e);

    }
}