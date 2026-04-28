import { Link } from '@tanstack/react-router'

import CheckIcon from '@/shared/assets/icons/check.svg?react'
import HomeIcon from '@/shared/assets/icons/home.svg?react'
import LogoSvg from '@/shared/assets/logo.svg?react'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'
import { useApplicationsProgress } from '../model/use-applications-progress'

type HeaderProps = {
  showHomeButton: boolean
}

function Header({ showHomeButton }: HeaderProps) {
  const { count, goalReached, total, visibleCount } = useApplicationsProgress()

  return (
    <header className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <LogoSvg aria-label="Alt+Shift" className="h-16 w-auto" role="img" />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4">
          <p className="text-ink-600 text-[18px] leading-[28px]">
            {`${String(visibleCount)}/${String(total)} applications generated`}
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
