import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextButton } from './text-button'

function TestIcon() {
  return <svg aria-label="trash icon" viewBox="0 0 20 20" />
}

describe('TextButton', () => {
  it('uses the text-button recipe', () => {
    render(<TextButton>Delete</TextButton>)

    const button = screen.getByRole('button', { name: 'Delete' })

    expect(button.className).toContain('text-ink-700')
    expect(button.className).toContain('hover:text-ink-950')
    expect(button.className).toContain('gap-2')
    expect(button.className).toContain('font-semibold')
  })

  it('renders both icon slots', () => {
    render(
      <TextButton leadingIcon={<TestIcon />} trailingIcon={<TestIcon />}>
        Copy
      </TextButton>,
    )

    expect(screen.getAllByLabelText('trash icon')).toHaveLength(2)
  })

  it('defaults type to button to prevent accidental form submits', () => {
    render(<TextButton>Delete</TextButton>)

    const button = screen.getByRole('button', { name: 'Delete' })

    expect((button as HTMLButtonElement).type).toBe('button')
  })

  it('still respects an explicit type prop', () => {
    render(<TextButton type="submit">Submit</TextButton>)

    const button = screen.getByRole('button', { name: 'Submit' })

    expect((button as HTMLButtonElement).type).toBe('submit')
  })
})
