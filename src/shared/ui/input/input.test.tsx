import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  it('uses the small recipe by default', () => {
    render(<Input placeholder="Product manager" />)

    const input = screen.getByPlaceholderText('Product manager')

    expect(input.className).toContain('h-[var(--input-height-sm)]')
    expect(input.className).toContain('px-[var(--input-padding-x)]')
    expect(input.className).toContain('rounded-[var(--radius-input)]')
    expect(input.className).toContain('shadow-control')
  })

  it('applies aria-invalid when invalid', () => {
    render(<Input invalid placeholder="Product manager" />)

    const input = screen.getByPlaceholderText('Product manager')

    expect(input.getAttribute('aria-invalid')).toBe('true')
  })

  it('respects an externally-set aria-invalid value', () => {
    render(<Input aria-invalid={false} invalid placeholder="Product manager" />)

    const input = screen.getByPlaceholderText('Product manager')

    expect(input.getAttribute('aria-invalid')).toBe('false')
  })

  it('forwards size variant to recipe', () => {
    render(<Input placeholder="Product manager" size="md" />)

    const input = screen.getByPlaceholderText('Product manager')

    expect(input.className).toContain('h-[var(--input-height-md)]')
  })
})
