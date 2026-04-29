import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ApplicationLetterPreview } from './application-letter-preview'

describe('ApplicationLetterPreview', () => {
  it('renders the animated orb loader while generation is in progress', () => {
    render(
      <ApplicationLetterPreview
        isGenerating
        letter={undefined}
        placeholder="placeholder"
      />,
    )

    expect(
      screen.getByRole('status', { name: 'Generating letter' }),
    ).toBeDefined()
    expect(screen.getByTestId('preview-loader-orb')).toBeDefined()
    expect(screen.getByTestId('preview-loader-orb').className).toContain(
      '-translate-y-1/2',
    )
    expect(screen.queryByText('placeholder')).toBeNull()
  })

  it('renders the generated letter once loading is complete', () => {
    render(
      <ApplicationLetterPreview
        isGenerating={false}
        letter="Generated letter"
        placeholder="placeholder"
      />,
    )

    expect(screen.getByText('Generated letter')).toBeDefined()
    expect(screen.queryByTestId('preview-loader-orb')).toBeNull()
  })
})
