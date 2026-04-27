import type { TextareaHTMLAttributes } from 'react'

import { type VariantProps } from 'class-variance-authority'

import { textareaVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>

function Textarea({ className, resize, size, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ resize, size }), className)}
      {...props}
    />
  )
}

export { Textarea }
