import { Link, Outlet, useRouterState } from '@tanstack/react-router'

import HomeIcon from '@/shared/assets/icons/home.svg?react'
import LogoSvg from '@/shared/assets/logo.svg?react'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'

function AppShell() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const showHomeButton = pathname !== '/'

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--page-max-width)] flex-col px-[var(--page-padding-x)] py-[var(--page-padding-y)]">
      <header className="flex items-start justify-between gap-6 border-b border-[var(--color-line-soft)] pb-6">
        <div className="flex items-center gap-4">
          <LogoSvg aria-label="Alt+Shift" className="h-16 w-auto" role="img" />
        </div>

        <div className="flex items-center gap-5 pt-1">
          <div className="space-y-2 text-right">
            <p className="text-sm text-[var(--color-ink-700)] sm:text-[18px]">
              3/5 applications generated
            </p>
            <div className="flex justify-end">
              <ProgressDots current={3} total={5} />
            </div>
          </div>

          {showHomeButton ? (
            <Link to="/">
              <IconButton
                aria-label="Go to dashboard"
                icon={<HomeIcon aria-hidden="true" className="size-5" />}
              />
            </Link>
          ) : null}
        </div>
      </header>

      <Outlet />
    </main>
  )
}

export { AppShell }
