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
  'w-full rounded-[var(--radius-input)] border bg-[var(--input-bg)] px-[var(--input-padding-x)] text-[length:var(--input-font-size)] leading-[var(--input-line-height)] text-[var(--input-fg)] shadow-control outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--input-placeholder)] hover:border-[var(--input-border-hover)] focus:border-[var(--input-focus-border)] focus:ring-4 focus:ring-[var(--input-focus-ring)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-500 aria-[invalid=true]:border-[var(--input-border-invalid)] aria-[invalid=true]:focus:border-danger-300 aria-[invalid=true]:focus:ring-[var(--input-focus-ring-invalid)]',
  {
    variants: {
      size: {
        sm: 'h-[var(--input-height-sm)] py-[var(--input-padding-y)] border-[var(--input-border)]',
        md: 'h-[var(--input-height-md)] py-[var(--input-padding-y)] border-[var(--input-border)]',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
)

export const textareaVariants = cva(
  'w-full rounded-[var(--radius-textarea)] border border-[var(--input-border)] bg-[var(--input-bg)] px-[var(--textarea-padding-x)] py-[var(--textarea-padding-y)] text-[length:var(--input-font-size)] leading-[var(--input-line-height)] text-[var(--input-fg)] shadow-control outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--input-placeholder)] hover:border-[var(--input-border-hover)] focus:border-[var(--input-focus-border)] focus:ring-4 focus:ring-[var(--input-focus-ring)] disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-ink-500 aria-[invalid=true]:border-[var(--input-border-invalid)] aria-[invalid=true]:focus:border-danger-300 aria-[invalid=true]:focus:ring-[var(--input-focus-ring-invalid)]',
  {
    variants: {
      size: {
        md: 'min-h-[var(--textarea-min-height)]',
        sm: 'min-h-40',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
      },
    },
    defaultVariants: {
      size: 'md',
      resize: 'none',
    },
  },
)

export const fieldClass = 'flex flex-col gap-[var(--field-gap)]'

export const fieldLabelClass =
  'text-[length:var(--text-label-size)] leading-[var(--text-label-line)] font-[var(--text-label-weight)] text-ink-800'

export const fieldHelperVariants = cva(
  'text-[length:var(--text-helper-size)] leading-[var(--text-helper-line)] font-[var(--text-label-weight)]',
  {
    variants: {
      tone: {
        muted: 'text-ink-700',
        danger: 'text-danger-700',
      },
    },
    defaultVariants: {
      tone: 'muted',
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
