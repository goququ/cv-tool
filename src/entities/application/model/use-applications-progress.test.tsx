import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ApplicationClient } from './application-client'
import { ApplicationsProvider } from './applications-provider'
import type { JobApplication } from './types'
import {
  APPLICATIONS_GOAL,
  useApplicationsProgress,
} from './use-applications-progress'

class StubClient extends ApplicationClient {
  constructor(private readonly stored: JobApplication[]) {
    super()
  }

  list() {
    return Promise.resolve(this.stored)
  }

  remove() {
    return Promise.resolve()
  }

  save() {
    return Promise.resolve()
  }
}

function makeApplications(count: number): JobApplication[] {
  return Array.from({ length: count }, (_, index) => ({
    additionalDetails: '',
    company: 'Company',
    createdAt: '2026-04-29T10:00:00.000Z',
    id: `app-${String(index)}`,
    jobTitle: 'PM',
    letter: 'letter',
    skills: '',
    updatedAt: '2026-04-29T10:00:00.000Z',
  }))
}

function ProgressHarness() {
  const progress = useApplicationsProgress()

  return (
    <>
      <span data-testid="count">{String(progress.count)}</span>
      <span data-testid="total">{String(progress.total)}</span>
      <span data-testid="goal">{progress.goalReached ? 'yes' : 'no'}</span>
    </>
  )
}

function renderHarness(applications: JobApplication[]) {
  return render(
    <ApplicationsProvider client={new StubClient(applications)}>
      <ProgressHarness />
    </ApplicationsProvider>,
  )
}

describe('useApplicationsProgress', () => {
  it('reports zero progress when there are no applications', async () => {
    renderHarness([])

    expect((await screen.findByTestId('count')).textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe(
      String(APPLICATIONS_GOAL),
    )
    expect(screen.getByTestId('goal').textContent).toBe('no')
  })

  it('keeps the raw count when there are more applications than the goal', async () => {
    renderHarness(makeApplications(APPLICATIONS_GOAL + 2))

    expect((await screen.findByTestId('count')).textContent).toBe(
      String(APPLICATIONS_GOAL + 2),
    )
    expect(screen.getByTestId('goal').textContent).toBe('yes')
  })

  it('marks the goal as reached exactly at the goal threshold', async () => {
    renderHarness(makeApplications(APPLICATIONS_GOAL))

    expect((await screen.findByTestId('goal')).textContent).toBe('yes')
  })
})
