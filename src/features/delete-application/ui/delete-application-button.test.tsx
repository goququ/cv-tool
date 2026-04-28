import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ApplicationsContext } from '@/entities/application/model/use-applications'
import { DeleteApplicationButton } from './delete-application-button'

describe('DeleteApplicationButton', () => {
  it('calls deleteApplication with the given id when clicked', async () => {
    const user = userEvent.setup()
    const deleteApplication = vi.fn().mockResolvedValue(undefined)

    render(
      <ApplicationsContext.Provider
        value={{
          applications: [],
          deleteApplication,
          saveApplication: vi.fn(),
        }}
      >
        <DeleteApplicationButton applicationId="app-1" />
      </ApplicationsContext.Provider>,
    )

    await user.click(screen.getByRole('button', { name: 'Delete application' }))

    expect(deleteApplication).toHaveBeenCalledTimes(1)
    expect(deleteApplication).toHaveBeenCalledWith('app-1')
  })
})
