import type { InputHTMLAttributes } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { inputVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    invalid?: boolean
  }

function Input({
  className,
  invalid,
  size,
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  )
}

export { Input }
