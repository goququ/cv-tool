import type { ReactNode } from 'react'

import { Card } from '@/shared/ui/card/card'

type ApplicationPreviewCardProps = {
  letter: string
  actions?: ReactNode
}

function ApplicationPreviewCard({
  actions,
  letter,
}: ApplicationPreviewCardProps) {
  return (
    <Card
      className="isolate flex h-[240px] min-h-[240px] flex-col justify-between gap-2"
      padding="md"
      variant="preview"
    >
      <div className="relative min-h-0 flex-1">
        <p className="text-lead text-ink-600 h-full overflow-hidden whitespace-pre-line">
          {letter}
        </p>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[var(--card-bg)]"
        />
      </div>

      {actions !== undefined ? (
        <div className="flex items-center justify-between gap-2 pt-4">
          {actions}
        </div>
      ) : null}
    </Card>
  )
}

export { ApplicationPreviewCard }
export type { ApplicationPreviewCardProps }
