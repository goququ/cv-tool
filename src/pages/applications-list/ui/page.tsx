import PlusIcon from '@/shared/assets/icons/plus.svg?react'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card/card'

function ApplicationsListPage() {
  return (
    <section className="space-y-8">
      <div className="border-line-soft mb-6 flex items-center justify-between gap-6 border-b pb-5">
        <h1 className="font-display text-ink-950 text-[length:var(--heading-display-lg-size)] leading-[var(--heading-display-lg-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
          Applications
        </h1>

        <Button leadingIcon={<PlusIcon aria-hidden="true" />} size="sm">
          Create New
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="preview">
          <p className="text-ink-700 text-[20px] leading-[1.7]">
            Dashboard route shell is now active. Real applications grid,
            actions, and goal banner will be completed in the next UI phases.
          </p>
        </Card>
      </div>
    </section>
  )
}

export { ApplicationsListPage }
