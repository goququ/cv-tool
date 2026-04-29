import { Link } from '@tanstack/react-router'

import { useApplicationsProgress } from '@/entities/application'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import HomeIcon from '@/shared/assets/icons/home.svg?react'
import LogoSvg from '@/shared/assets/logo.svg?react'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'

type HeaderProps = {
  showHomeButton: boolean
}

function Header({ showHomeButton }: HeaderProps) {
  const { goalReached, total, visibleCount } = useApplicationsProgress()

  return (
    <header className="flex items-center justify-between gap-6">
      <Link
        aria-label="Alt+Shift"
        className="flex items-center gap-4 rounded-md outline-none focus-visible:ring-4 focus-visible:ring-[var(--control-focus-ring)]"
        to="/"
      >
        <LogoSvg aria-hidden="true" className="h-12 w-auto" role="img" />
      </Link>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4">
          <p className="text-lead text-ink-600">
            {`${String(visibleCount)}/${String(total)}`}
            <span className="hidden sm:inline"> applications generated</span>
          </p>

          {goalReached ? (
            <CheckIcon
              aria-label="Applications goal reached"
              className="size-7"
              role="img"
            />
          ) : (
            <ProgressDots current={visibleCount} size="sm" total={total} />
          )}
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
  )
}

export { Header }
