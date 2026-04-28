import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center border font-semibold rounded-button shadow-control transition duration-150 motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--control-focus-ring)] disabled:pointer-events-none disabled:border-surface-disabled disabled:bg-surface-disabled disabled:text-ink-500',
  {
    variants: {
      variant: {
        primary:
          'border-brand-600 bg-brand-600 text-surface-page hover:bg-brand-700',
        secondary:
          'border-line-default bg-surface-page text-ink-800 hover:border-line-strong hover:bg-surface-muted',
        ghost:
          'border-transparent bg-transparent text-ink-800 shadow-none hover:bg-surface-muted',
        subtle:
          'border-transparent bg-surface-muted text-ink-950 shadow-none hover:bg-line-soft',
      },
      size: {
        sm: 'min-h-[var(--button-height-sm)] px-[var(--button-padding-x-sm)] py-[var(--button-padding-y-sm)] text-[length:var(--button-font-size-sm)] leading-6 [&_svg]:size-5',
        lg: 'min-h-[var(--button-height-lg)] px-[var(--button-padding-x-lg)] py-[var(--button-padding-y-lg)] text-[length:var(--button-font-size-lg)] leading-7 [&_svg]:size-6',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
      fullWidth: false,
    },
  },
)

export const inputVariants = cva(
  'w-full rounded-control border bg-[var(--control-bg)] px-[var(--control-padding-x)] text-[var(--control-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--control-placeholder)] hover:border-[var(--control-border-hover)] focus:border-[var(--control-focus-border)] focus:ring-4 focus:ring-[var(--control-focus-ring)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-500',
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
  'w-full rounded-control border border-[var(--control-border)] bg-[var(--control-bg)] px-[var(--control-padding-x)] py-4 text-[var(--control-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--control-placeholder)] hover:border-[var(--control-border-hover)] focus:border-[var(--control-focus-border)] focus:ring-4 focus:ring-[var(--control-focus-ring)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-500',
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
  'rounded-card px-[var(--card-padding)] py-[var(--card-padding)]',
  {
    variants: {
      variant: {
        preview: 'bg-[var(--card-bg)] text-ink-700',
        banner: 'bg-[var(--card-banner-bg)] text-ink-950',
        elevated: 'border border-line-soft bg-surface-page shadow-card',
        soft: 'bg-surface-muted',
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
  'inline-flex items-center justify-center border bg-surface-page text-ink-800 rounded-button shadow-control transition duration-150 motion-safe:active:scale-[0.92] hover:border-line-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--control-focus-ring)] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      size: {
        sm: 'size-[var(--icon-button-size-sm)] p-[var(--icon-button-padding-sm)] [&_svg]:size-4',
        md: 'size-[var(--icon-button-size-md)] p-[var(--icon-button-padding-md)] [&_svg]:size-5',
      },
      tone: {
        default: 'border-line-default',
        ghost:
          'border-transparent bg-transparent shadow-none hover:border-transparent',
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
