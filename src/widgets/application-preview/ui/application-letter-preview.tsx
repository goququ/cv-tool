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
      className="flex h-full items-center justify-center"
      role="status"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span
          aria-hidden="true"
          className="preview-loader-shadow absolute top-[calc(50%+26px)] left-1/2 h-6 w-14 -translate-x-1/2 rounded-full"
        />
        <span
          aria-hidden="true"
          className="preview-loader-shadow preview-loader-shadow-secondary absolute top-[calc(50%+26px)] left-1/2 h-5 w-11 -translate-x-1/2 rounded-full"
        />
        <span
          aria-hidden="true"
          className="preview-loader-orb absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </div>
  )
}

export { ApplicationLetterPreview }
