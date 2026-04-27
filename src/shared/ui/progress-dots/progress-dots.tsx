import {
  progressDotItemVariants,
  progressDotsVariants,
} from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type ProgressDotsProps = {
  current: number
  total: number
  className?: string
}

function ProgressDots({ className, current, total }: ProgressDotsProps) {
  return (
    <div className={cn(progressDotsVariants(), className)}>
      {Array.from({ length: total }, (_, index) => {
        const state = index < current ? 'active' : 'inactive'

        return (
          <span key={index} className={progressDotItemVariants({ state })} />
        )
      })}
    </div>
  )
}

export { ProgressDots }
