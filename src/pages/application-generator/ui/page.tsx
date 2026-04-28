import { useCallback, useRef, useState } from 'react'

import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'

import { useApplications } from '@/entities/application/model/use-applications'
import { useLetterGenerator } from '@/entities/application/model/use-letter-generator'
import RegenerateIcon from '@/shared/assets/icons/repeat.svg?react'
import { Button } from '@/shared/ui/button/button'
import {
  ApplicationForm,
  type ApplicationFormValues,
} from '@/widgets/application-form/ui/application-form'
import { ApplicationLetterPreview } from '@/widgets/application-preview/ui/application-letter-preview'
import { GoalBanner } from '@/widgets/goal-banner/ui/goal-banner'

type GenerationStatus = 'idle' | 'generating' | 'ready' | 'error'

const emptyValues: ApplicationFormValues = {
  additionalDetails: '',
  company: '',
  jobTitle: '',
  skills: '',
}

function ApplicationGeneratorPage() {
  const letterGenerator = useLetterGenerator()
  const { saveApplication } = useApplications()

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

  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [letter, setLetter] = useState<string | undefined>(undefined)
  const draftIdRef = useRef<string | null>(null)
  const createdAtRef = useRef<string | null>(null)

  const jobTitle = useWatch({ control, name: 'jobTitle' })
  const company = useWatch({ control, name: 'company' })
  const additionalDetails = useWatch({ control, name: 'additionalDetails' })

  const headingTitle = buildHeadingTitle(jobTitle, company)

  const generate = useCallback<SubmitHandler<ApplicationFormValues>>(
    async (values) => {
      setStatus('generating')

      try {
        const generatedLetter = await letterGenerator.generateLetter(values)

        const now = new Date().toISOString()
        const id = draftIdRef.current ?? crypto.randomUUID()
        const createdAt = createdAtRef.current ?? now

        draftIdRef.current = id
        createdAtRef.current = createdAt

        await saveApplication({
          ...values,
          createdAt,
          id,
          letter: generatedLetter,
          updatedAt: now,
        })

        setLetter(generatedLetter)
        setStatus('ready')
      } catch {
        setStatus('error')
      }
    },
    [letterGenerator, saveApplication],
  )

  const isGenerating = status === 'generating'
  const hasLetter = status === 'ready' && letter !== undefined

  const handleStartNew = useCallback(() => {
    reset(emptyValues)
    setStatus('idle')
    setLetter(undefined)
    draftIdRef.current = null
    createdAtRef.current = null
  }, [reset])

  return (
    <section className="flex flex-col gap-6 lg:gap-12">
      <form
        className="grid items-stretch gap-10 lg:auto-rows-[640px] lg:grid-cols-2 lg:gap-8"
        noValidate
        onSubmit={(event) => {
          void handleSubmit(generate)(event)
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
