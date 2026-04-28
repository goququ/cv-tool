import { type VariantProps } from 'class-variance-authority'

import {
  progressDotItemVariants,
  progressDotsVariants,
} from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type ProgressDotsProps = VariantProps<typeof progressDotsVariants> & {
  current: number
  total: number
  className?: string
  'aria-label'?: string
}

function ProgressDots({
  className,
  current,
  size,
  total,
  'aria-label': ariaLabel,
}: ProgressDotsProps) {
  const safeTotal = Math.max(total, 0)
  const safeCurrent = Math.max(0, Math.min(current, safeTotal))

  return (
    <div
      aria-label={ariaLabel ?? `${String(safeCurrent)} of ${String(safeTotal)}`}
      aria-valuemax={safeTotal}
      aria-valuemin={0}
      aria-valuenow={safeCurrent}
      className={cn(progressDotsVariants({ size }), className)}
      role="progressbar"
    >
      {Array.from({ length: safeTotal }, (_, index) => {
        const state = index < safeCurrent ? 'active' : 'inactive'

        return (
          <span
            key={index}
            className={progressDotItemVariants({ size, state })}
          />
        )
      })}
    </div>
  )
}

export { ProgressDots }
