import React from 'react'
import { Progress} from './progress'
import { cn } from '../../lib/utils'




const ColorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}
const SizeByVariant = {
    default: "text-sm",
    sm: "text-xs",
}
const CourseProgress = ({ value, variant, size }) => {
    return (
        <div>
             <Progress value={value}  variant={variant} className="h-2 z-0"/>
             <p  className={cn("font-medium text-sky-700 ",
                ColorByVariant[variant|| "default"],
                SizeByVariant[size|| "default"]
             )}>
                {Math.round(value)}% Complite
             </p>
        </div>
    )
}

export default CourseProgress