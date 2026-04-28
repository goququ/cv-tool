import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ApplicationPreviewCard } from './application-preview-card'

describe('ApplicationPreviewCard', () => {
  it('renders the letter content', () => {
    render(<ApplicationPreviewCard letter="Dear team, hello." />)

    expect(screen.getByText('Dear team, hello.')).toBeDefined()
  })

  it('renders the actions slot when provided', () => {
    render(
      <ApplicationPreviewCard
        actions={<span data-testid="action">act</span>}
        letter="Hello"
      />,
    )

    expect(screen.getByTestId('action')).toBeDefined()
  })

  it('does not render an actions row when actions are omitted', () => {
    const { container } = render(<ApplicationPreviewCard letter="Hello" />)

    expect(container.querySelectorAll('button').length).toBe(0)
  })
})
