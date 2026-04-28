import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './button'

function TestIcon() {
  return <svg aria-label="test icon" viewBox="0 0 20 20" />
}

describe('Button', () => {
  it('renders leading and trailing icon slots', () => {
    render(
      <Button leadingIcon={<TestIcon />} trailingIcon={<TestIcon />}>
        Create New
      </Button>,
    )

    expect(screen.getByText('Create New')).toBeDefined()
    expect(screen.getAllByLabelText('test icon')).toHaveLength(2)
  })

  it('uses the primary small recipe', () => {
    render(
      <Button leadingIcon={<TestIcon />} size="sm" variant="primary">
        Create New
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Create New' })
    const content = button.querySelector('[data-slot="content"]')

    expect(button.className).toContain('min-h-[var(--button-height-sm)]')
    expect(button.className).toContain('px-[var(--button-padding-x-sm)]')
    expect(button.className).toContain('py-[var(--button-padding-y-sm)]')
    expect(button.className).toContain('leading-6')
    expect(content?.className).toContain('gap-2')
  })

  it('uses the primary large recipe', () => {
    render(
      <Button leadingIcon={<TestIcon />} size="lg" variant="primary">
        Create New
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Create New' })
    const content = button.querySelector('[data-slot="content"]')

    expect(button.className).toContain('min-h-[var(--button-height-lg)]')
    expect(button.className).toContain('px-[var(--button-padding-x-lg)]')
    expect(button.className).toContain('py-[var(--button-padding-y-lg)]')
    expect(button.className).toContain('leading-7')
    expect(content?.className).toContain('gap-2')
  })

  it('uses the secondary large recipe', () => {
    render(
      <Button leadingIcon={<TestIcon />} size="lg" variant="secondary">
        Try Again
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Try Again' })

    expect(button.className).toContain('border-line-default')
    expect(button.className).toContain('bg-surface-page')
    expect(button.className).toContain('text-ink-800')
    expect(button.className).toContain('shadow-control')
  })

  it('replaces all visible content with the loading icon while loading', () => {
    render(
      <Button loading loadingIcon={<TestIcon />} variant="primary">
        Create New
      </Button>,
    )

    const button = screen.getByRole('button')

    expect(button.getAttribute('aria-busy')).toBe('true')
    expect((button as HTMLButtonElement).disabled).toBe(false)
    expect(button.className).toContain('bg-brand-600')
    expect(screen.getByText('Create New')).toBeDefined()
    expect(screen.getByLabelText('test icon')).toBeDefined()
    expect(button.querySelector('[data-slot="loading"]')).not.toBeNull()
  })

  it('uses the disabled recipe only when disabled is set', () => {
    render(
      <Button disabled size="lg" variant="primary">
        Create New
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Create New' })

    expect((button as HTMLButtonElement).disabled).toBe(true)
    expect(button.className).toContain('disabled:bg-surface-disabled')
    expect(button.className).toContain('disabled:border-surface-disabled')
    expect(button.className).toContain('disabled:text-ink-500')
  })
})
