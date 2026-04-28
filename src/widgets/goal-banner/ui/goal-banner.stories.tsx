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

function fixture(count: number): JobApplication[] {
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

type RenderArgs = { applicationsCount: number }

function GoalBannerPreview({ applicationsCount }: RenderArgs) {
  const rootRoute = createRootRoute({ component: () => <Outlet /> })
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <GoalBanner />,
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

  return (
    <ApplicationsProvider client={new StubClient(fixture(applicationsCount))}>
      <RouterProvider router={router} />
    </ApplicationsProvider>
  )
}

const meta = {
  args: { applicationsCount: 0 },
  argTypes: {
    applicationsCount: { control: { type: 'number', max: 10, min: 0 } },
  },
  component: GoalBannerPreview,
  decorators: [
    (Story) => (
      <div className="mx-auto w-[1120px] max-w-full p-6">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  title: 'Widgets/GoalBanner',
} satisfies Meta<typeof GoalBannerPreview>

type Story = StoryObj<typeof meta>

export default meta

export const Empty: Story = { args: { applicationsCount: 0 } }
export const InProgress: Story = { args: { applicationsCount: 3 } }
export const HiddenWhenGoalReached: Story = { args: { applicationsCount: 5 } }
