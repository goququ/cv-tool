import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PageContainer } from './page-container'

describe('PageContainer', () => {
  it('renders a div by default with the page container recipe', () => {
    render(<PageContainer data-testid="container">content</PageContainer>)

    const container = screen.getByTestId('container')

    expect(container.tagName).toBe('DIV')
    expect(container.className).toContain('max-w-[var(--page-max-width)]')
    expect(container.className).toContain('px-[var(--page-padding-x)]')
    expect(container.className).toContain('py-[var(--page-padding-y)]')
    expect(container.className).toContain('mx-auto')
  })

  it('uses the requested element via as prop', () => {
    render(
      <PageContainer as="main" data-testid="container">
        content
      </PageContainer>,
    )

    expect(screen.getByTestId('container').tagName).toBe('MAIN')
  })

  it('merges additional className', () => {
    render(
      <PageContainer className="extra-class" data-testid="container">
        content
      </PageContainer>,
    )

    expect(screen.getByTestId('container').className).toContain('extra-class')
  })
})
