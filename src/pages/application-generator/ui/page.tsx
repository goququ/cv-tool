import { useCallback } from 'react'

import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'

import { useGenerateApplicationLetter } from '@/features/generate-application-letter'
import RegenerateIcon from '@/shared/assets/icons/repeat.svg?react'
import { Button } from '@/shared/ui/button/button'
import {
  ApplicationForm,
  type ApplicationFormValues,
} from '@/widgets/application-form'
import { ApplicationLetterPreview } from '@/widgets/application-preview'
import { GoalBanner } from '@/widgets/goal-banner'

const emptyValues: ApplicationFormValues = {
  additionalDetails: '',
  company: '',
  jobTitle: '',
  skills: '',
}

function ApplicationGeneratorPage() {
  const { generate, letter, resetDraft, status } =
    useGenerateApplicationLetter()

  const formApi = useForm<ApplicationFormValues>({
    defaultValues: emptyValues,
    mode: 'onSubmit',
  })

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = formApi

  const jobTitle = useWatch({ control, name: 'jobTitle' })
  const company = useWatch({ control, name: 'company' })
  const additionalDetails = useWatch({ control, name: 'additionalDetails' })

  const headingTitle = buildHeadingTitle(jobTitle, company)
  const handleGenerate: SubmitHandler<ApplicationFormValues> = generate

  const isGenerating = status === 'generating'
  const hasLetter = status === 'ready' && letter !== undefined

  const handleStartNew = useCallback(() => {
    reset(emptyValues)
    resetDraft()
  }, [reset, resetDraft])

  return (
    <section className="flex flex-col gap-6 lg:gap-12">
      <form
        className="grid items-stretch gap-10 lg:auto-rows-[640px] lg:grid-cols-2 lg:gap-8"
        noValidate
        onSubmit={(event) => {
          void handleSubmit(handleGenerate)(event)
        }}
      >
        <div className="flex h-full min-h-[0] flex-col gap-4">
          <header className="border-line-soft flex min-h-[3.25rem] shrink-0 items-end border-b pb-3">
            <h1 className="font-display text-ink-950 text-[length:var(--heading-display-lg-size)] leading-[var(--heading-display-lg-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
              {headingTitle}
            </h1>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-6">
            <ApplicationForm
              additionalDetailsLength={additionalDetails.length}
              errors={errors}
              isGenerating={isGenerating}
              register={register}
            />

            {status === 'error' ? (
              <p
                className="text-danger-700 text-[length:var(--text-helper-size)] leading-[var(--text-helper-line)]"
                role="alert"
              >
                Something went wrong while generating the letter. Please try
                again.
              </p>
            ) : null}

            <Button
              className="mt-auto"
              disabled={!isValid}
              fullWidth
              leadingIcon={
                hasLetter ? <RegenerateIcon aria-hidden="true" /> : undefined
              }
              loading={isGenerating}
              size="lg"
              type="submit"
              variant={hasLetter ? 'secondary' : 'primary'}
            >
              {hasLetter ? 'Try Again' : 'Generate Now'}
            </Button>
          </div>
        </div>

        <ApplicationLetterPreview isGenerating={isGenerating} letter={letter} />
      </form>

      <GoalBanner onCreateNew={handleStartNew} />
    </section>
  )
}

function buildHeadingTitle(jobTitle: string, company: string): string {
  const trimmedTitle = jobTitle.trim()
  const trimmedCompany = company.trim()

  if (trimmedTitle && trimmedCompany) {
    return `${trimmedTitle}, ${trimmedCompany}`
  }
  if (trimmedTitle) {
    return trimmedTitle
  }
  if (trimmedCompany) {
    return trimmedCompany
  }
  return 'New application'
}

export { ApplicationGeneratorPage }
