import type { ReactElement, ReactNode } from 'react'
import { cloneElement, isValidElement, useId } from 'react'

import {
  fieldClass,
  fieldHelperVariants,
  fieldLabelClass,
} from '../../config/ui/recipes'
import { cn } from '../../lib/cn'

type FieldOwnProps = {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  counter?: ReactNode
  invalid?: boolean
  required?: boolean
  htmlFor?: string
  className?: string
  children: ReactNode
}

type ControlProps = {
  id?: string
  'aria-invalid'?: 'true' | 'false'
  'aria-required'?: 'true' | 'false'
}

function Field({
  label,
  hint,
  error,
  counter,
  invalid,
  required,
  htmlFor,
  className,
  children,
}: FieldOwnProps) {
  const generatedId = useId()
  const controlId = htmlFor ?? generatedId
  const helperText = error ?? hint
  const showHelperRow = helperText !== undefined || counter !== undefined
  const isInvalid = invalid === true || error !== undefined

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<ControlProps>, {
        id: controlId,
        'aria-invalid': isInvalid ? 'true' : undefined,
        'aria-required': required ? 'true' : undefined,
      })
    : children

  return (
    <div className={cn(fieldClass, className)}>
      {label !== undefined ? (
        <span className="inline-flex items-baseline gap-1">
          <label className={fieldLabelClass} htmlFor={controlId}>
            {label}
          </label>
          {required ? (
            <span aria-hidden="true" className="text-danger-700">
              *
            </span>
          ) : null}
        </span>
      ) : null}

      {control}

      {showHelperRow ? (
        <div className="flex items-start justify-between gap-3">
          {counter !== undefined ? (
            <span
              className={fieldHelperVariants({
                tone: isInvalid ? 'danger' : 'muted',
              })}
            >
              {counter}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}

          {helperText !== undefined ? (
            <span
              className={fieldHelperVariants({
                tone: error !== undefined ? 'danger' : 'muted',
              })}
            >
              {helperText}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { Field }
