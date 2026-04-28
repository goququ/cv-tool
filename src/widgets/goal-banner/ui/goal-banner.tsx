import { Link } from '@tanstack/react-router'

import { useApplicationsProgress } from '@/entities/application/model/use-applications-progress'
import PlusIcon from '@/shared/assets/icons/plus.svg?react'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card/card'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'

type GoalBannerProps = {
  onCreateNew?: () => void
}

function GoalBanner({ onCreateNew }: GoalBannerProps = {}) {
  const { count, goalReached, total } = useApplicationsProgress()

  if (goalReached) {
    return null
  }

  return (
    <Card padding="banner" variant="banner">
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-display text-ink-950 text-[length:var(--heading-display-md-size)] leading-[var(--heading-display-md-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
            Hit your goal
          </h2>
          <p className="text-ink-600 text-[18px] leading-[28px]">
            Generate and send out couple more job applications today to get
            hired faster
          </p>
        </div>

        {onCreateNew ? (
          <Button
            leadingIcon={<PlusIcon aria-hidden="true" />}
            onClick={onCreateNew}
            size="lg"
            type="button"
          >
            Create New
          </Button>
        ) : (
          <Link to="/new">
            <Button leadingIcon={<PlusIcon aria-hidden="true" />} size="lg">
              Create New
            </Button>
          </Link>
        )}

        <div className="flex flex-col items-center gap-2">
          <ProgressDots current={count} total={total} />
          <span className="text-ink-600 text-[18px] leading-[28px]">
            {`${String(count)} out of ${String(total)}`}
          </span>
        </div>
      </div>
    </Card>
  )
}

export { GoalBanner }
