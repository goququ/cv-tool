import type { HTMLAttributes } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { cardVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>

function Card({ className, padding, variant, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
}

export { Card }
