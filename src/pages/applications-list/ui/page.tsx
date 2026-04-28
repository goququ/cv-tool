import { Link } from '@tanstack/react-router'

import { useApplications } from '@/entities/application'
import PlusIcon from '@/shared/assets/icons/plus.svg?react'
import { Button } from '@/shared/ui/button/button'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { ApplicationsGrid } from '@/widgets/applications-grid'
import { GoalBanner } from '@/widgets/goal-banner'

function ApplicationsListPage() {
  const { applications } = useApplications()
  const hasApplications = applications.length > 0

  return (
    <section className="flex flex-col gap-6 lg:gap-12">
      <div className="border-line-soft flex items-center justify-between gap-6 border-b pb-4">
        <h1 className="font-display text-ink-950 text-[length:var(--heading-display-lg-size)] leading-[var(--heading-display-lg-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
          Applications
        </h1>

        <Link aria-label="Create new application" to="/new">
          <IconButton
            aria-label="Create new application"
            className="sm:hidden"
            icon={<PlusIcon aria-hidden="true" />}
            tone="primary"
          />
          <Button
            className="hidden sm:inline-flex"
            leadingIcon={<PlusIcon aria-hidden="true" />}
            size="sm"
          >
            Create New
          </Button>
        </Link>
      </div>

      {hasApplications ? <ApplicationsGrid /> : null}

      <GoalBanner />
    </section>
  )
}

export { ApplicationsListPage }
