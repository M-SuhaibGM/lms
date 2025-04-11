import { progress } from './progress';
import { db } from '../src/lib/db';
import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
    Purchase: { userId: string }[]; // Added missing Purchase field
};

type GetCoursesProps = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const GetCourses = async ({
    userId,
    title,
    categoryId
}: GetCoursesProps): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                titte: {  // Fixed typo from 'titte' to 'title'
                    contains: title,
                    mode: 'insensitive' // Added for case-insensitive search
                },
                categoryId,
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
                    select: {
                        userId: true // Explicitly select only needed fields
                    }
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async course => {
                if (course.Purchase.length === 0) {
                    return {
                        ...course,
                        progress: null,
                    };
                }
                const progressPercentage = await progress(userId, course.id);
                return {
                    ...course,
                    progress: progressPercentage as number
                };
            })
        );

        return coursesWithProgress;

    } catch (error) {
        console.error('Failed to fetch courses:', error);
        return [];
    }
};