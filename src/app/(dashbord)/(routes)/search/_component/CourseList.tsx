"use client"
import { Course, Category } from "@prisma/client"
import CourseCard from "./CourseCard";


type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
};
export const CourseList = ({
    items
}: CoursesListProps) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item) => (
                <CourseCard key={item.id} id={item.id}
                    title={item.titte} imageUrl={item.imageUrl!==null ? item.imageUrl : ""} chapterLength={item.chapters.length} price={item?.price!==null ? item.price : 0} progress={item.progress} category={item?.category?.name || ""} />
            ))}
        </div>
    )
}

