import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { textButtonClass } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

function TextButton({
  className,
  leadingIcon,
  trailingIcon,
  type = 'button',
  children,
  ...props
}: TextButtonProps) {
  return (
    <button className={cn(textButtonClass, className)} type={type} {...props}>
      {leadingIcon ? (
        <span aria-hidden="true" className="inline-flex">
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingIcon ? (
        <span aria-hidden="true" className="inline-flex">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  )
}

export { TextButton }
