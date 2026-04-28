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
import { GoalBanner } from './goal-banner'

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
    company: 'Apple',
    createdAt: '2026-04-29T10:00:00.000Z',
    id: `app-${String(index)}`,
    jobTitle: 'PM',
    letter: 'letter',
    skills: '',
    updatedAt: '2026-04-29T10:00:00.000Z',
  }))
}

function renderBanner(applications: JobApplication[]) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <GoalBanner />,
  })
  const newRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/new',
    component: () => <p>new page</p>,
  })

  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: rootRoute.addChildren([indexRoute, newRoute]),
  })

  return render(
    <ApplicationsProvider client={new StubClient(applications)}>
      <RouterProvider router={router} />
    </ApplicationsProvider>,
  )
}

describe('GoalBanner', () => {
  it('renders motivational copy and progress when below the goal', async () => {
    renderBanner(makeApplications(2))

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Hit your goal' }),
    ).toBeDefined()
    expect(screen.getByText('2 out of 5')).toBeDefined()
    expect(screen.getByRole('progressbar')).toBeDefined()
    expect(screen.getByRole('button', { name: /Create New/ })).toBeDefined()
  })

  it('hides itself once the goal is reached', async () => {
    const { container } = renderBanner(makeApplications(5))

    await Promise.resolve()

    expect(container.querySelector('h2')).toBeNull()
  })

  it('shows the latest count below the goal text', async () => {
    renderBanner(makeApplications(4))

    expect(await screen.findByText('4 out of 5')).toBeDefined()
  })
})
