"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const progressVariant = cva(
  "bg-primary h-full w-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-sky-700",
        success: "bg-emerald-700"
      },
    },
    defaultVariants: {
      variant: "default",
    }
  }
)

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof progressVariant> { }

type CombinedProgressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, CombinedProgressProps>(
  ({ className, value, variant, ...props }, ref) => {
    return (
      <ProgressPrimitive.Root
        data-slot="progress"
        ref={ref}
        className={cn(
          "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(progressVariant({ variant }))}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  }
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }