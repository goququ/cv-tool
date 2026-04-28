import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IconButton } from './icon-button'

function TestIcon() {
  return <svg aria-label="home icon" viewBox="0 0 20 20" />
}

describe('IconButton', () => {
  it('renders the passed icon', () => {
    render(<IconButton aria-label="Go to dashboard" icon={<TestIcon />} />)

    expect(screen.getByLabelText('home icon')).toBeDefined()
  })

  it('uses the outlined home-button recipe', () => {
    render(<IconButton aria-label="Go to dashboard" icon={<TestIcon />} />)

    const button = screen.getByRole('button', { name: 'Go to dashboard' })

    expect(button.className).toContain('size-[var(--icon-button-size-md)]')
    expect(button.className).toContain('rounded-button')
    expect(button.className).toContain('border-line-default')
    expect(button.className).toContain('bg-surface-page')
    expect(button.className).toContain('shadow-control')
  })
})
