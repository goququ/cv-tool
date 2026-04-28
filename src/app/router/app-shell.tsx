import { Outlet, useRouterState } from '@tanstack/react-router'

import { PageContainer } from '@/shared/ui/page-container/page-container'
import { Header } from '@/widgets/header'

function AppShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const showHomeButton = pathname !== '/'

  return (
    <PageContainer as="main" className="flex min-h-screen flex-col gap-8">
      <Header showHomeButton={showHomeButton} />
      <Outlet />
    </PageContainer>
  )
}

export { AppShell }
