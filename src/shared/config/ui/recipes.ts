import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex min-h-[var(--button-height-md)] items-center justify-center rounded-[var(--button-radius)] px-[var(--button-padding-x)] text-[length:var(--button-font-size)] font-[var(--button-font-weight)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--control-focus-ring)] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--button-primary-bg)] text-[var(--button-primary-fg)] hover:bg-[var(--button-primary-bg-hover)]',
        secondary:
          'border border-[var(--button-secondary-border)] bg-[var(--button-secondary-bg)] text-[var(--button-secondary-fg)] hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface-page)]',
        ghost:
          'bg-transparent text-[var(--color-ink-800)] hover:bg-[var(--color-surface-muted)]',
        subtle:
          'bg-[var(--color-surface-muted)] text-[var(--color-ink-950)] hover:bg-[var(--color-line-soft)]',
        disabled:
          'bg-[var(--button-disabled-bg)] text-[var(--button-disabled-fg)]',
      },
      size: {
        md: '',
        sm: 'min-h-11 px-4 text-sm',
        lg: 'min-h-14 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

export const inputVariants = cva(
  'w-full rounded-[var(--control-radius)] border bg-[var(--control-bg)] px-[var(--control-padding-x)] text-[var(--control-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--control-placeholder)] hover:border-[var(--control-border-hover)] focus:border-[var(--control-focus-border)] focus:ring-4 focus:ring-[var(--control-focus-ring)] disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-ink-500)]',
  {
    variants: {
      size: {
        md: 'h-[var(--control-height-md)] border-[var(--control-border)] text-base',
        sm: 'h-12 border-[var(--control-border)] text-base',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

export const textareaVariants = cva(
  'w-full rounded-[var(--control-radius)] border border-[var(--control-border)] bg-[var(--control-bg)] px-[var(--control-padding-x)] py-4 text-[var(--control-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--control-placeholder)] hover:border-[var(--control-border-hover)] focus:border-[var(--control-focus-border)] focus:ring-4 focus:ring-[var(--control-focus-ring)] disabled:cursor-not-allowed disabled:bg-[var(--color-surface-muted)] disabled:text-[var(--color-ink-500)]',
  {
    variants: {
      size: {
        md: 'min-h-[var(--textarea-min-height)] text-base',
        sm: 'min-h-40 text-base',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
      },
    },
    defaultVariants: {
      size: 'sm',
      resize: 'none',
    },
  },
)

export const cardVariants = cva(
  'rounded-[var(--card-radius)] px-[var(--card-padding)] py-[var(--card-padding)]',
  {
    variants: {
      variant: {
        preview: 'bg-[var(--card-bg)] text-[var(--color-ink-700)]',
        banner: 'bg-[var(--card-banner-bg)] text-[var(--color-ink-950)]',
        elevated:
          'border border-[var(--color-line-soft)] bg-[var(--color-surface-page)] shadow-[var(--shadow-card)]',
        soft: 'bg-[var(--color-surface-muted)]',
      },
      padding: {
        md: '',
        lg: 'px-10 py-10',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      padding: 'md',
    },
  },
)

export const iconButtonVariants = cva(
  'inline-flex size-[var(--icon-button-size)] items-center justify-center rounded-[var(--icon-button-radius)] border border-[var(--icon-button-border)] bg-[var(--icon-button-bg)] text-[var(--icon-button-fg)] transition-colors duration-150 hover:border-[var(--color-line-strong)] hover:bg-[var(--color-surface-muted)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--control-focus-ring)] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      size: {
        md: '',
        sm: 'size-10',
      },
      tone: {
        default: '',
        ghost: 'border-transparent bg-transparent hover:border-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      tone: 'default',
    },
  },
)

export const progressDotsVariants = cva('inline-flex items-center gap-2', {
  variants: {
    size: {
      md: '',
      sm: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const progressDotItemVariants = cva(
  'h-[var(--progress-dot-height)] w-[var(--progress-dot-width)] rounded-[var(--progress-dot-radius)] transition-colors duration-150',
  {
    variants: {
      state: {
        active: 'bg-[var(--progress-dot-active)]',
        inactive: 'bg-[var(--progress-dot-inactive)]',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  },
)
