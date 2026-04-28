import CopyIcon from '@/shared/assets/icons/copy.svg?react'
import RegenerateIcon from '@/shared/assets/icons/repeat.svg?react'
import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card/card'
import { Input } from '@/shared/ui/input/input'
import { Textarea } from '@/shared/ui/textarea/textarea'

function ApplicationGeneratorPage() {
  return (
    <>
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.58fr)] lg:gap-11">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="border-line-soft font-display text-ink-950 border-b pb-5 text-[length:var(--heading-display-lg-size)] leading-[var(--heading-display-lg-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
              Product manager, Apple
            </h1>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[length:var(--text-label-size)] font-[var(--text-label-weight)] text-[var(--color-ink-950)]">
                Job title
              </span>
              <Input
                defaultValue="Product manager"
                placeholder="Product manager"
              />
            </label>

            <label className="space-y-2">
              <span className="text-[length:var(--text-label-size)] font-[var(--text-label-weight)] text-[var(--color-ink-950)]">
                Company
              </span>
              <Input defaultValue="Apple" placeholder="Apple" />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-[length:var(--text-label-size)] font-[var(--text-label-weight)] text-[var(--color-ink-950)]">
              I am good at...
            </span>
            <Input defaultValue="HTML, CSS and doing things in time" />
          </label>

          <label className="space-y-2">
            <span className="text-[length:var(--text-label-size)] font-[var(--text-label-weight)] text-[var(--color-ink-950)]">
              Additional details
            </span>
            <Textarea defaultValue="I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use." />
          </label>

          <div className="text-sm text-[var(--color-ink-700)]">0/1200</div>

          <Button fullWidth variant="secondary">
            <span className="inline-flex items-center gap-3">
              <RegenerateIcon aria-hidden="true" className="size-5" />
              Try Again
            </span>
          </Button>
        </div>

        <Card
          className="flex min-h-[43rem] flex-col justify-between"
          variant="preview"
        >
          <div className="space-y-8 text-[18px] leading-[1.78] text-[var(--color-ink-700)] sm:text-[22px]">
            <p>Dear Apple Team,</p>
            <p>
              I am writing to express my interest in the Product Manager
              position.
            </p>
            <p>
              My experience in the realm combined with my skills in HTML, CSS
              and doing things in time make me a strong candidate for this role.
            </p>
            <p>
              I want to help you build awesome solutions to accomplish your
              goals and vision. I can create intuitive and aesthetically
              pleasing devices that are very easy to use.
            </p>
            <p>
              I am confident that my skills and enthusiasm would translate into
              valuable contributions to your esteemed organization.
            </p>
            <p>
              Thank you for considering my application. I eagerly await the
              opportunity to discuss my qualifications further.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-8 text-[18px] font-semibold text-[var(--color-ink-800)]">
            <span>Copy to clipboard</span>
            <CopyIcon aria-hidden="true" className="size-6" />
          </div>
        </Card>
      </section>

      <Card
        className="mt-2 flex flex-col items-center gap-8 text-center"
        padding="banner"
        variant="banner"
      >
        <div className="space-y-4">
          <h2 className="font-display text-ink-950 text-[length:var(--heading-display-md-size)] leading-[var(--heading-display-md-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
            Hit your goal
          </h2>
          <p className="mx-auto max-w-[34rem] text-[20px] leading-[1.55] text-[var(--color-ink-700)]">
            Generate and send out couple more job applications today to get
            hired faster
          </p>
        </div>
      </Card>
    </>
  )
}

export { ApplicationGeneratorPage }
