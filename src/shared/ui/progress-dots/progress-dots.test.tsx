import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProgressDots } from './progress-dots'

describe('ProgressDots', () => {
  it('renders the requested total of dots', () => {
    const { container } = render(<ProgressDots current={3} total={5} />)

    expect(container.querySelectorAll('span')).toHaveLength(5)
  })

  it('marks the first N dots as active', () => {
    const { container } = render(<ProgressDots current={3} total={5} />)

    const dots = Array.from(container.querySelectorAll('span'))

    expect(dots[0]?.className).toContain('bg-ink-950')
    expect(dots[2]?.className).toContain('bg-ink-950')
    expect(dots[3]?.className).toContain('bg-ink-950/24')
    expect(dots[4]?.className).toContain('bg-ink-950/24')
  })

  it('uses pill-shaped dots in the md size', () => {
    const { container } = render(
      <ProgressDots current={1} size="md" total={3} />,
    )

    const dot = container.querySelector('span')

    expect(dot?.className).toContain('h-2')
    expect(dot?.className).toContain('w-8')
  })

  it('uses square dots in the sm size', () => {
    const { container } = render(
      <ProgressDots current={1} size="sm" total={3} />,
    )

    const dot = container.querySelector('span')

    expect(dot?.className).toContain('h-2')
    expect(dot?.className).toContain('w-2')
  })

  it('exposes progressbar role with current/max values', () => {
    render(<ProgressDots current={3} total={5} />)

    const bar = screen.getByRole('progressbar')

    expect(bar.getAttribute('aria-valuenow')).toBe('3')
    expect(bar.getAttribute('aria-valuemax')).toBe('5')
    expect(bar.getAttribute('aria-valuemin')).toBe('0')
    expect(bar.getAttribute('aria-label')).toBe('3 of 5')
  })

  it('clamps current within [0, total]', () => {
    const { container } = render(<ProgressDots current={9} total={5} />)

    const dots = Array.from(container.querySelectorAll('span'))

    expect(dots).toHaveLength(5)
    dots.forEach((dot) => {
      expect(dot.className).toContain('bg-ink-950')
      expect(dot.className).not.toContain('bg-ink-950/24')
    })
  })
})
