import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { type VariantProps } from 'class-variance-authority'

import LoadingIcon from '../../assets/icons/loading.svg?react'
import { buttonVariants } from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    leadingIcon?: ReactNode
    loading?: boolean
    loadingIcon?: ReactNode
    trailingIcon?: ReactNode
  }

const defaultLoadingIcon = (
  <LoadingIcon aria-label="loading" className="animate-spin" />
)

function Button({
  className,
  fullWidth,
  leadingIcon,
  loading = false,
  loadingIcon,
  size,
  trailingIcon,
  variant,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading ? 'true' : undefined}
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        loading && 'pointer-events-none',
        className,
      )}
      data-loading={loading ? 'true' : undefined}
      disabled={disabled}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center gap-2',
          loading && 'opacity-0',
        )}
        data-slot="content"
      >
        {leadingIcon ? (
          <span aria-hidden="true" className="inline-flex" data-slot="icon">
            {leadingIcon}
          </span>
        ) : null}
        {children}
        {trailingIcon ? (
          <span aria-hidden="true" className="inline-flex" data-slot="icon">
            {trailingIcon}
          </span>
        ) : null}
      </span>

      {loading ? (
        <span
          className="absolute inset-0 inline-flex items-center justify-center"
          data-slot="loading"
        >
          {loadingIcon ?? defaultLoadingIcon}
        </span>
      ) : null}
    </button>
  )
}

export { Button }
