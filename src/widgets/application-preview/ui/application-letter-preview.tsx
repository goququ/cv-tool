import { CopyApplicationButton } from '@/features/copy-application'
import { Card } from '@/shared/ui/card/card'

type ApplicationLetterPreviewProps = {
  isGenerating: boolean
  letter: string | undefined
  placeholder?: string
}

const defaultPlaceholder = 'Your personalized job application will appear here…'

function ApplicationLetterPreview({
  isGenerating,
  letter,
  placeholder = defaultPlaceholder,
}: ApplicationLetterPreviewProps) {
  return (
    <Card
      aria-busy={isGenerating}
      className="isolate flex h-[640px] flex-col justify-between gap-2"
      padding="md"
      variant="preview"
    >
      <div className="relative min-h-0 flex-1">
        <div className="h-full overflow-y-auto pr-1">
          {isGenerating ? (
            <PreviewSkeleton />
          ) : letter !== undefined ? (
            <p className="text-ink-950 text-[18px] leading-[28px] whitespace-pre-line">
              {letter}
            </p>
          ) : (
            <p className="text-ink-600 text-[18px] leading-[28px]">
              {placeholder}
            </p>
          )}
        </div>
        {letter !== undefined && !isGenerating ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[var(--card-bg)]"
          />
        ) : null}
      </div>

      {letter !== undefined && !isGenerating ? (
        <div className="flex items-center justify-end pt-4">
          <CopyApplicationButton letter={letter} />
        </div>
      ) : null}
    </Card>
  )
}

function PreviewSkeleton() {
  return (
    <div
      aria-label="Generating letter"
      className="flex flex-col gap-3"
      role="status"
    >
      {[
        'w-1/2',
        'w-full',
        'w-11/12',
        'w-10/12',
        'w-full',
        'w-9/12',
        'w-11/12',
        'w-8/12',
      ].map((widthClass, index) => (
        <span
          aria-hidden="true"
          className={`bg-ink-950/10 h-4 animate-pulse rounded-full ${widthClass}`}
          key={index}
        />
      ))}
    </div>
  )
}

export { ApplicationLetterPreview }
