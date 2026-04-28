import { Link, Outlet, useRouterState } from '@tanstack/react-router'

import HomeIcon from '@/shared/assets/icons/home.svg?react'
import LogoSvg from '@/shared/assets/logo.svg?react'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { PageContainer } from '@/shared/ui/page-container/page-container'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'

function AppShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const showHomeButton = pathname !== '/'

  return (
    <PageContainer as="main" className="flex min-h-screen flex-col gap-8">
      <header className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <LogoSvg aria-label="Alt+Shift" className="h-16 w-auto" role="img" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            <p className="text-ink-600 text-[18px] leading-[28px]">
              3/5 applications generated
            </p>
            <ProgressDots current={3} size="sm" total={5} />
          </div>

          {showHomeButton ? (
            <Link to="/">
              <IconButton
                aria-label="Go to dashboard"
                icon={<HomeIcon aria-hidden="true" />}
              />
            </Link>
          ) : null}
        </div>
      </header>

      <Outlet />
    </PageContainer>
  )
}

export { AppShell }
