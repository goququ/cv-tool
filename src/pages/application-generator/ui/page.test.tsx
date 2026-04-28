import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ApplicationClient } from '@/entities/application/model/application-client'
import { ApplicationsProvider } from '@/entities/application/model/applications-provider'
import type { JobApplication } from '@/entities/application/model/types'
import { LetterGeneratorContext } from '@/entities/application/model/use-letter-generator'
import {
  type LetterGenerationPayload,
  LetterGeneratorClient,
} from '@/shared/api/letter-generator-client'
import { ApplicationGeneratorPage } from './page'

class MemoryApplicationClient extends ApplicationClient {
  public saved: JobApplication[] = []
  public removed: string[] = []

  list() {
    return Promise.resolve([...this.saved])
  }

  remove(applicationId: string) {
    this.removed.push(applicationId)
    this.saved = this.saved.filter((item) => item.id !== applicationId)
    return Promise.resolve()
  }

  save(application: JobApplication) {
    this.saved = [
      ...this.saved.filter((item) => item.id !== application.id),
      application,
    ]
    return Promise.resolve()
  }
}

class StubLetterGenerator extends LetterGeneratorClient {
  constructor(private readonly responses: string[]) {
    super()
  }

  generateLetter(_payload: LetterGenerationPayload) {
    const next = this.responses.shift() ?? 'fallback letter'
    return Promise.resolve(next)
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

function renderPage(options?: {
  applicationsClient?: MemoryApplicationClient
  letterGenerator?: LetterGeneratorClient
}) {
  const applicationsClient =
    options?.applicationsClient ?? new MemoryApplicationClient()
  const letterGenerator =
    options?.letterGenerator ?? new StubLetterGenerator(['Generated letter'])

  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <ApplicationGeneratorPage />,
  })
  const newRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/new',
    component: () => <p>new</p>,
  })
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: rootRoute.addChildren([indexRoute, newRoute]),
  })

  const utils = render(
    <ApplicationsProvider client={applicationsClient}>
      <LetterGeneratorContext.Provider value={letterGenerator}>
        <RouterProvider router={router} />
      </LetterGeneratorContext.Provider>
    </ApplicationsProvider>,
  )

  return { ...utils, applicationsClient, letterGenerator }
}

describe('ApplicationGeneratorPage', () => {
  it('shows the placeholder heading until the form is filled out', async () => {
    renderPage()

    expect(
      await screen.findByRole('heading', { level: 1, name: 'New application' }),
    ).toBeDefined()
  })

  it('updates the heading live as the user types', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.type(await screen.findByLabelText('Job title'), 'Designer')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Designer' }),
    ).toBeDefined()

    await user.type(screen.getByLabelText('Company'), 'Linear')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Designer, Linear' }),
    ).toBeDefined()
  })

  it('keeps the generate button disabled while required fields are empty', async () => {
    const { applicationsClient } = renderPage()

    const submitButton = await screen.findByRole('button', {
      name: 'Generate Now',
    })

    expect((submitButton as HTMLButtonElement).disabled).toBe(true)
    expect(applicationsClient.saved.length).toBe(0)
  })

  it('enables the generate button once all required fields are filled', async () => {
    const user = userEvent.setup()
    renderPage()

    const submitButton = await screen.findByRole('button', {
      name: 'Generate Now',
    })

    await user.type(screen.getByLabelText('Job title'), 'Designer')
    await user.type(screen.getByLabelText('Company'), 'Linear')
    await user.type(screen.getByLabelText('I am good at...'), 'design systems')

    expect((submitButton as HTMLButtonElement).disabled).toBe(false)
  })

  it('generates a letter, saves one entry, and switches the action to Try Again', async () => {
    const user = userEvent.setup()
    const letterGenerator = new StubLetterGenerator([
      'First generated letter',
      'Second generated letter',
    ])
    const { applicationsClient } = renderPage({ letterGenerator })

    await user.type(await screen.findByLabelText('Job title'), 'Designer')
    await user.type(screen.getByLabelText('Company'), 'Linear')
    await user.type(screen.getByLabelText('I am good at...'), 'design systems')

    await user.click(screen.getByRole('button', { name: 'Generate Now' }))

    await waitFor(() => {
      expect(screen.getByText('First generated letter')).toBeDefined()
    })

    expect(applicationsClient.saved.length).toBe(1)
    expect(applicationsClient.saved[0].letter).toBe('First generated letter')
    expect(applicationsClient.saved[0].jobTitle).toBe('Designer')

    expect(screen.getByRole('button', { name: /Try Again/ })).toBeDefined()

    await user.click(screen.getByRole('button', { name: /Try Again/ }))

    await waitFor(() => {
      expect(screen.getByText('Second generated letter')).toBeDefined()
    })

    expect(applicationsClient.saved.length).toBe(1)
    expect(applicationsClient.saved[0].letter).toBe('Second generated letter')
  })

  it('updates the live character counter as the user types in additional details', async () => {
    const user = userEvent.setup()
    renderPage()

    expect(await screen.findByText('0/1200')).toBeDefined()

    await user.type(screen.getByLabelText('Additional details'), 'hello')

    expect(screen.getByText('5/1200')).toBeDefined()
  })
})
