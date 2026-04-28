import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { ApplicationsProvider, LetterGeneratorProvider } from '@/app/providers'
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
      <LetterGeneratorProvider>
        <RouterProvider router={router} />
      </LetterGeneratorProvider>
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
      await screen.findByRole('heading', { level: 1, name: 'New application' }),
    ).toBeDefined()
    expect(await screen.findByLabelText('Go to dashboard')).toBeDefined()
  })
})
