import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ApplicationsProvider } from '@/app/providers'
import { ApplicationClient } from '@/entities/application/model/application-client'
import type { JobApplication } from '@/entities/application/model/types'
import { ApplicationsGrid } from './applications-grid'

class StubClient extends ApplicationClient {
  public removed: string[] = []
  private stored: JobApplication[]

  constructor(stored: JobApplication[]) {
    super()
    this.stored = stored
  }

  list() {
    return Promise.resolve(this.stored)
  }

  remove(applicationId: string) {
    this.removed.push(applicationId)
    this.stored = this.stored.filter((item) => item.id !== applicationId)
    return Promise.resolve()
  }

  save() {
    return Promise.resolve()
  }
}

function makeApplication(
  overrides: Partial<JobApplication> & { id: string },
): JobApplication {
  return {
    additionalDetails: '',
    company: 'Apple',
    createdAt: '2026-04-29T10:00:00.000Z',
    jobTitle: 'PM',
    letter: 'letter body',
    skills: '',
    updatedAt: '2026-04-29T10:00:00.000Z',
    ...overrides,
  }
}

function renderGrid(applications: JobApplication[], client?: StubClient) {
  return render(
    <ApplicationsProvider client={client ?? new StubClient(applications)}>
      <ApplicationsGrid />
    </ApplicationsProvider>,
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ApplicationsGrid', () => {
  it('renders nothing when there are no applications', () => {
    const { container } = renderGrid([])

    expect(container.firstChild).toBeNull()
  })

  it('renders one card per application sorted newest first', async () => {
    renderGrid([
      makeApplication({
        id: 'old',
        letter: 'OLD LETTER',
        updatedAt: '2026-04-01T10:00:00.000Z',
      }),
      makeApplication({
        id: 'new',
        letter: 'NEW LETTER',
        updatedAt: '2026-04-29T10:00:00.000Z',
      }),
    ])

    const items = await screen.findAllByRole('listitem')
    expect(items.length).toBe(2)
    expect(items[0].textContent).toContain('NEW LETTER')
    expect(items[1].textContent).toContain('OLD LETTER')
  })

  it('removes an application from the grid when delete is clicked', async () => {
    const client = new StubClient([
      makeApplication({ id: 'first', letter: 'first letter' }),
      makeApplication({ id: 'second', letter: 'second letter' }),
    ])
    const user = userEvent.setup()

    renderGrid([], client)

    await screen.findByText('first letter')

    const [firstDelete] = screen.getAllByRole('button', {
      name: 'Delete application',
    })
    await user.click(firstDelete)

    expect(client.removed.length).toBeGreaterThan(0)
    expect(screen.queryAllByRole('listitem').length).toBe(1)
  })

  it('copies the full letter when copy is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    if (!('clipboard' in navigator)) {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText },
      })
    } else {
      vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeText)
    }

    renderGrid([makeApplication({ id: 'a', letter: 'FULL LETTER BODY' })])

    await screen.findByText('FULL LETTER BODY')
    fireEvent.click(
      screen.getByRole('button', { name: 'Copy letter to clipboard' }),
    )

    expect(writeText).toHaveBeenCalledWith('FULL LETTER BODY')
  })
})
