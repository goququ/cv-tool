import { Button } from '@/shared/ui/button/button'
import { Card } from '@/shared/ui/card/card'
import { IconButton } from '@/shared/ui/icon-button/icon-button'
import { Input } from '@/shared/ui/input/input'
import { ProgressDots } from '@/shared/ui/progress-dots/progress-dots'
import { Textarea } from '@/shared/ui/textarea/textarea'

import copyIconSrc from '../assets/icons/copy.svg'
import homeIconSrc from '../assets/icons/home.svg'
import plusIconSrc from '../assets/icons/plus.svg'
import repeatIconSrc from '../assets/icons/repeat.svg'
import logoSrc from '../assets/logo.svg'

function HomeIcon() {
  return <img alt="" className="size-5" src={homeIconSrc} />
}

function PlusIcon() {
  return <img alt="" className="size-5" src={plusIconSrc} />
}

function RegenerateIcon() {
  return <img alt="" className="size-5" src={repeatIconSrc} />
}

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--page-max-width)] flex-col px-[var(--page-padding-x)] py-[var(--page-padding-y)]">
      <header className="flex items-start justify-between gap-6 border-b border-[var(--color-line-soft)] pb-6">
        <div className="flex items-center gap-4">
          <img alt="Alt+Shift" className="h-16 w-auto" src={logoSrc} />

          <span className="text-[42px] leading-none font-semibold tracking-[-0.04em] text-[var(--color-ink-950)] sm:text-[54px]">
            Alt+Shift
          </span>
        </div>

        <div className="flex items-center gap-5 pt-1">
          <div className="space-y-2 text-right">
            <p className="text-sm text-[var(--color-ink-700)] sm:text-[18px]">
              3/5 applications generated
            </p>
            <div className="flex justify-end">
              <ProgressDots current={3} total={5} />
            </div>
          </div>

          <IconButton aria-label="Go to dashboard" icon={<HomeIcon />} />
        </div>
      </header>

      <section className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.58fr)] lg:gap-11 lg:py-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="border-b border-[var(--color-line-soft)] pb-5 text-[length:var(--heading-display-size)] leading-[var(--heading-display-line)] font-[var(--heading-display-weight)] tracking-[-0.05em] text-[var(--color-ink-950)]">
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
              <RegenerateIcon />
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
            <img alt="" className="size-6" src={copyIconSrc} />
          </div>
        </Card>
      </section>

      <Card
        className="mt-2 flex flex-col items-center gap-8 text-center"
        padding="lg"
        variant="banner"
      >
        <div className="space-y-4">
          <h2 className="text-[40px] font-semibold tracking-[-0.04em] text-[var(--color-ink-950)] sm:text-[56px]">
            Hit your goal
          </h2>
          <p className="mx-auto max-w-[34rem] text-[20px] leading-[1.55] text-[var(--color-ink-700)]">
            Generate and send out couple more job applications today to get
            hired faster
          </p>
        </div>

        <Button className="min-w-[244px]" size="lg">
          <span className="inline-flex items-center gap-3">
            <PlusIcon />
            Create New
          </span>
        </Button>

        <div className="space-y-3">
          <div className="flex justify-center">
            <ProgressDots current={3} total={5} />
          </div>
          <p className="text-[18px] text-[var(--color-ink-700)]">3 out of 5</p>
        </div>
      </Card>
    </main>
  )
}

export default App
