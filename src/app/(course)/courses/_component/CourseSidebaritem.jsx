"use client"
import { CheckCircle, Lock, CirclePlay, } from "lucide-react";
import {  usePathname, useRouter } from "next/navigation"
import { cn } from "../../.././../lib/utils";


const CourseSidebaritem = ({ id, label, isCompleted, courseId, isLocked }) => {
    const pathname = usePathname();
    const router = useRouter();
    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : CirclePlay)
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }
    return (

        <button onClick={onClick} type="button" className={cn("flex items-center gap-x-2 transition-all text-slate-500  cursor-pointer text-sm font-[500] pl-6 hover:text-slate-600 hover:bg-slate-300/20 ", isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700", isCompleted && "text-emerald-700 hover:text-emerald-700", isCompleted && isActive && "bg-emerald-200/20",)}>

            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-500", isActive && "text-slate-700", isCompleted && "text-emerald-700")} />
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-slate-700 h-full transition-all", isActive && "opacity-100",
                isCompleted && "border-emerald-700"
            )} />

        </button>

    )
}

export default CourseSidebaritem 