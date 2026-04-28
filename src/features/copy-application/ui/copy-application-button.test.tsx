import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CopyApplicationButton } from './copy-application-button'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('CopyApplicationButton', () => {
  it('writes the letter to the clipboard and shows transient confirmation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)

    if (!('clipboard' in navigator)) {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText },
      })
    } else {
      vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeText)
    }

    render(<CopyApplicationButton letter="Dear team" />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Copy letter to clipboard' }),
    )

    expect(writeText).toHaveBeenCalledWith('Dear team')
    expect(await screen.findByText('Copied!')).toBeDefined()
  })
})
