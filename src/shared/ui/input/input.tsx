import type { InputHTMLAttributes, Ref } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { inputVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    invalid?: boolean
    ref?: Ref<HTMLInputElement>
  }

function Input({
  className,
  invalid,
  ref,
  size,
  'aria-invalid': ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      className={cn(inputVariants({ size }), className)}
      ref={ref}
      {...props}
    />
  )
}

export { Input }
