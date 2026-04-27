import type { ButtonHTMLAttributes } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { buttonVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

function Button({
  className,
  fullWidth,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}

export { Button }
