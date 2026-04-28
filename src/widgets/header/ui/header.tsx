import { Link } from '@tanstack/react-router'

import { useApplicationsProgress } from '@/entities/application/model/use-applications-progress'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import HomeIcon from '@/shared/assets/icons/home.svg?react'
import LogoSvg from '@/shared/assets/logo.svg?react'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'

type HeaderProps = {
  showHomeButton: boolean
}

function Header({ showHomeButton }: HeaderProps) {
  const { count, goalReached, total } = useApplicationsProgress()

  return (
    <header className="flex items-center justify-between gap-6">
      <Link
        aria-label="Alt+Shift"
        className="flex items-center gap-4 rounded-md outline-none focus-visible:ring-4 focus-visible:ring-[var(--control-focus-ring)]"
        to="/"
      >
        <LogoSvg aria-hidden="true" className="h-16 w-auto" role="img" />
      </Link>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4">
          <p className="text-ink-600 text-[18px] leading-[28px]">
            {`${String(count)}/${String(total)} applications generated`}
          </p>

          {goalReached ? (
            <CheckIcon
              aria-label="Applications goal reached"
              className="size-7"
              role="img"
            />
          ) : (
            <ProgressDots current={count} size="sm" total={total} />
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
