import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'

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

function fixture(count: number): JobApplication[] {
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

type RenderArgs = {
  applicationsCount: number
  showHomeButton: boolean
}

function HeaderPreview({ applicationsCount, showHomeButton }: RenderArgs) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <Header showHomeButton={showHomeButton} />,
  })
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: rootRoute.addChildren([indexRoute]),
  })

  return (
    <ApplicationsProvider client={new StubClient(fixture(applicationsCount))}>
      <RouterProvider router={router} />
    </ApplicationsProvider>
  )
}

const meta = {
  args: {
    applicationsCount: 3,
    showHomeButton: false,
  },
  argTypes: {
    applicationsCount: { control: { type: 'number', max: 10, min: 0 } },
    showHomeButton: { control: 'boolean' },
  },
  component: HeaderPreview,
  decorators: [
    (Story) => (
      <div className="mx-auto w-[1120px] max-w-full px-6 py-5">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Widgets/Header',
} satisfies Meta<typeof HeaderPreview>

type Story = StoryObj<typeof meta>

export default meta

export const Empty: Story = {
  args: { applicationsCount: 0, showHomeButton: false },
}

export const InProgress: Story = {
  args: { applicationsCount: 3, showHomeButton: false },
}

export const GoalReached: Story = {
  args: { applicationsCount: 5, showHomeButton: false },
}

export const OnGenerator: Story = {
  args: { applicationsCount: 3, showHomeButton: true },
}
