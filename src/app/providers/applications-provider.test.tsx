import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import {
  ApplicationClient,
  type JobApplication,
  useApplications,
} from '@/entities/application'
import { ApplicationsProvider } from './applications-provider'

const applicationFixture: JobApplication = {
  additionalDetails: 'I enjoy building well-structured products.',
  company: 'Apple',
  createdAt: '2026-04-29T10:00:00.000Z',
  id: 'application-1',
  jobTitle: 'Product manager',
  letter: 'Dear Apple Team, ...',
  skills: 'HTML, CSS and doing things in time',
  updatedAt: '2026-04-29T10:00:00.000Z',
}

class MemoryApplicationClient extends ApplicationClient {
  public readonly applications: JobApplication[]

  constructor(applications: JobApplication[] = []) {
    super()
    this.applications = applications
  }

  list() {
    return Promise.resolve(this.applications)
  }

  remove(applicationId: string) {
    const nextApplications = this.applications.filter(
      (application) => application.id !== applicationId,
    )

    this.applications.splice(0, this.applications.length, ...nextApplications)

    return Promise.resolve()
  }

  save(application: JobApplication) {
    const nextApplications = this.applications.filter(
      (currentApplication) => currentApplication.id !== application.id,
    )

    this.applications.splice(
      0,
      this.applications.length,
      ...nextApplications,
      application,
    )

    return Promise.resolve()
  }
}

function ApplicationsHarness() {
  const { applications, deleteApplication, saveApplication } = useApplications()

  return (
    <>
      <p>count:{applications.length}</p>
      <button
        type="button"
        onClick={() => {
          void saveApplication(applicationFixture)
        }}
      >
        save
      </button>
      <button
        type="button"
        onClick={() => {
          void deleteApplication(applicationFixture.id)
        }}
      >
        delete
      </button>
    </>
  )
}

describe('applications provider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('rehydrates saved applications from the injected client', async () => {
    const client = new MemoryApplicationClient([applicationFixture])

    render(
      <ApplicationsProvider client={client}>
        <ApplicationsHarness />
      </ApplicationsProvider>,
    )

    expect(await screen.findByText('count:1')).toBeDefined()
  })

  it('persists applications through the injected client after saving one', async () => {
    const user = userEvent.setup()
    const client = new MemoryApplicationClient()

    render(
      <ApplicationsProvider client={client}>
        <ApplicationsHarness />
      </ApplicationsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'save' }))

    expect(client.applications).toEqual([applicationFixture])
    expect(screen.getByText('count:1')).toBeDefined()
  })

  it('removes applications from state and the injected client', async () => {
    const user = userEvent.setup()
    const client = new MemoryApplicationClient([applicationFixture])

    render(
      <ApplicationsProvider client={client}>
        <ApplicationsHarness />
      </ApplicationsProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'delete' }))

    expect(client.applications).toEqual([])
    expect(screen.getByText('count:0')).toBeDefined()
  })
})
