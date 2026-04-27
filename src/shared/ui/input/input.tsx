import type { InputHTMLAttributes } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { inputVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

function Input({ className, size, ...props }: InputProps) {
  return <input className={cn(inputVariants({ size }), className)} {...props} />
}

export { Input }
