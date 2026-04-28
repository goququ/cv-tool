import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from './card'

describe('Card', () => {
  it('uses the preview variant with medium padding by default', () => {
    render(<Card data-testid="card">content</Card>)

    const card = screen.getByTestId('card')

    expect(card.className).toContain('rounded-card')
    expect(card.className).toContain('bg-[var(--card-bg)]')
    expect(card.className).toContain('p-[var(--card-padding-md)]')
  })

  it('uses banner padding token when padding=banner', () => {
    render(
      <Card data-testid="card" padding="banner" variant="banner">
        content
      </Card>,
    )

    const card = screen.getByTestId('card')

    expect(card.className).toContain('bg-[var(--card-banner-bg)]')
    expect(card.className).toContain('px-[var(--card-padding-banner-x)]')
    expect(card.className).toContain('py-[var(--card-padding-banner-y)]')
  })

  it('renders elevated variant with border and shadow', () => {
    render(
      <Card data-testid="card" variant="elevated">
        content
      </Card>,
    )

    const card = screen.getByTestId('card')

    expect(card.className).toContain('border-line-soft')
    expect(card.className).toContain('bg-surface-page')
    expect(card.className).toContain('shadow-card')
  })

  it('passes through extra className', () => {
    render(
      <Card className="custom" data-testid="card">
        content
      </Card>,
    )

    expect(screen.getByTestId('card').className).toContain('custom')
  })
})
