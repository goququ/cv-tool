import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Textarea } from './textarea'

describe('Textarea', () => {
  it('uses the medium recipe by default', () => {
    render(<Textarea placeholder="Tell us more" />)

    const textarea = screen.getByPlaceholderText('Tell us more')

    expect(textarea.className).toContain('rounded-[var(--radius-textarea)]')
    expect(textarea.className).toContain('px-[var(--textarea-padding-x)]')
    expect(textarea.className).toContain('py-[var(--textarea-padding-y)]')
    expect(textarea.className).toContain('min-h-[var(--textarea-min-height)]')
    expect(textarea.className).toContain('resize-none')
  })

  it('applies aria-invalid when invalid', () => {
    render(<Textarea invalid placeholder="Tell us more" />)

    const textarea = screen.getByPlaceholderText('Tell us more')

    expect(textarea.getAttribute('aria-invalid')).toBe('true')
  })

  it('respects an externally-set aria-invalid value', () => {
    render(<Textarea aria-invalid={false} invalid placeholder="Tell us more" />)

    const textarea = screen.getByPlaceholderText('Tell us more')

    expect(textarea.getAttribute('aria-invalid')).toBe('false')
  })

  it('supports vertical resize variant', () => {
    render(<Textarea placeholder="Tell us more" resize="vertical" />)

    const textarea = screen.getByPlaceholderText('Tell us more')

    expect(textarea.className).toContain('resize-y')
  })
})
