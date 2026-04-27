import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { iconButtonVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonVariants> & {
    icon: ReactNode
  }

function IconButton({
  className,
  icon,
  size,
  tone,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(iconButtonVariants({ size, tone }), className)}
      {...props}
    >
      {icon}
    </button>
  )
}

export { IconButton }
