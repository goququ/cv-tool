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
  htmlFor?: string
  className?: string
  children: ReactNode
}

function Field({
  label,
  hint,
  error,
  counter,
  invalid,
  htmlFor,
  className,
  children,
}: FieldOwnProps) {
  const generatedId = useId()
  const controlId = htmlFor ?? generatedId
  const helperText = error ?? hint
  const showHelperRow = helperText !== undefined || counter !== undefined
  const isInvalid = invalid === true || error !== undefined

  let control = children
  if (!htmlFor && isValidElement(children)) {
    const child = children as ReactElement<{ id?: string }>
    if (child.props.id === undefined) {
      control = cloneElement(child, { id: controlId })
    }
  }

  return (
    <div className={cn(fieldClass, className)}>
      {label !== undefined ? (
        <label className={fieldLabelClass} htmlFor={controlId}>
          {label}
        </label>
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
