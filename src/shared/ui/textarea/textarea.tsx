import type { Ref, TextareaHTMLAttributes } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { textareaVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants> & {
    invalid?: boolean
    ref?: Ref<HTMLTextAreaElement>
  }

function Textarea({
  className,
  invalid,
  ref,
  resize,
  size,
  'aria-invalid': ariaInvalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      className={cn(textareaVariants({ resize, size }), className)}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
