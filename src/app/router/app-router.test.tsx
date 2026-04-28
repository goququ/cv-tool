import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { routeTree } from './app-router'

function renderRouter(initialLocation: string) {
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    routeTree,
  })

  return render(<RouterProvider router={router} />)
}

describe('app router', () => {
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
