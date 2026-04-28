import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { ApplicationsProvider } from '@/entities/application/model/applications-provider'
import { routeTree } from './app-router'

function renderRouter(initialLocation: string) {
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    routeTree,
  })

  return render(
    <ApplicationsProvider>
      <RouterProvider router={router} />
    </ApplicationsProvider>,
  )
}

describe('app router', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the dashboard route on /', async () => {
    renderRouter('/')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Applications' }),
    ).toBeDefined()
    expect(await screen.findByLabelText('Alt+Shift')).toBeDefined()
  })

  it('renders the generator route on /new', async () => {
    renderRouter('/new')

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Product manager, Apple',
      }),
    ).toBeDefined()
    expect(await screen.findByLabelText('Go to dashboard')).toBeDefined()
  })
})
