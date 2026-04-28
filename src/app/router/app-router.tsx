import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { ApplicationGeneratorPage } from '../../pages/application-generator/ui/page'
import { ApplicationsListPage } from '../../pages/applications-list/ui/page'
import { AppShell } from './app-shell'

const rootRoute = createRootRoute({
  component: AppShell,
})

const applicationsListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ApplicationsListPage,
})

const applicationGeneratorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new',
  component: ApplicationGeneratorPage,
})

const routeTree = rootRoute.addChildren([
  applicationsListRoute,
  applicationGeneratorRoute,
])

const appRouter = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof appRouter
  }
}

export { appRouter, routeTree }
