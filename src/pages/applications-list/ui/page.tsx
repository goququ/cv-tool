import PlusIcon from '@/shared/assets/icons/plus.svg?react'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card/card'

function ApplicationsListPage() {
  return (
    <section className="space-y-8 py-8 lg:py-10">
      <div className="flex items-end justify-between gap-6 border-b border-[var(--color-line-soft)] pb-6">
        <h1 className="text-[length:var(--heading-display-size)] leading-[var(--heading-display-line)] font-[var(--heading-display-weight)] tracking-[-0.05em] text-[var(--color-ink-950)]">
          Applications
        </h1>

        <Button className="min-w-[178px]" size="lg">
          <span className="inline-flex items-center gap-3">
            <PlusIcon aria-hidden="true" className="size-5" />
            Create New
          </span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="preview">
          <p className="text-[20px] leading-[1.7] text-[var(--color-ink-700)]">
            Dashboard route shell is now active. Real applications grid,
            actions, and goal banner will be completed in the next UI phases.
          </p>
        </Card>
      </div>
    </section>
  )
}

export { ApplicationsListPage }
