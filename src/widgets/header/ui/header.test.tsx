import type { ReactNode } from 'react'

import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ApplicationClient } from '@/entities/application/model/application-client'
import { ApplicationsProvider } from '@/entities/application/model/applications-provider'
import type { JobApplication } from '@/entities/application/model/types'
import { Header } from './header'

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

function renderHeader(node: ReactNode, applications: JobApplication[]) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => node,
  })
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: rootRoute.addChildren([indexRoute]),
  })

  return render(
    <ApplicationsProvider client={new StubClient(applications)}>
      <RouterProvider router={router} />
    </ApplicationsProvider>,
  )
}

describe('Header', () => {
  it('renders progress text and dots when goal is not reached', async () => {
    renderHeader(<Header showHomeButton={false} />, makeApplications(2))

    expect(
      await screen.findByText((_, element) =>
        element?.tagName === 'P' &&
        element.textContent === '2/5 applications generated'
          ? true
          : false,
      ),
    ).toBeDefined()
    expect(screen.getByRole('progressbar')).toBeDefined()
    expect(screen.queryByLabelText('Applications goal reached')).toBeNull()
  })

  it('shows a checkmark instead of dots once the goal is reached', async () => {
    renderHeader(<Header showHomeButton={false} />, makeApplications(5))

    expect(
      await screen.findByLabelText('Applications goal reached'),
    ).toBeDefined()
    expect(screen.queryByRole('progressbar')).toBeNull()
  })

  it('shows the real count when there are more applications than the goal', async () => {
    renderHeader(<Header showHomeButton={false} />, makeApplications(8))

    expect(
      await screen.findByText((_, element) =>
        element?.tagName === 'P' &&
        element.textContent === '8/5 applications generated'
          ? true
          : false,
      ),
    ).toBeDefined()
  })

  it('hides the home button by default', async () => {
    renderHeader(<Header showHomeButton={false} />, [])

    await screen.findByText((_, element) =>
      element?.tagName === 'P' &&
      element.textContent === '0/5 applications generated'
        ? true
        : false,
    )
    expect(screen.queryByLabelText('Go to dashboard')).toBeNull()
  })

  it('renders the home button when requested', async () => {
    renderHeader(<Header showHomeButton />, [])

    expect(await screen.findByLabelText('Go to dashboard')).toBeDefined()
  })
})
