import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Field } from '@/shared/ui/field/field'
import { Input } from '@/shared/ui/input/input'
import { Textarea } from '@/shared/ui/textarea/textarea'

const ADDITIONAL_DETAILS_MAX = 1200

type ApplicationFormValues = {
  jobTitle: string
  company: string
  skills: string
  additionalDetails: string
}

type ApplicationFormProps = {
  additionalDetailsLength: number
  errors: FieldErrors<ApplicationFormValues>
  isGenerating: boolean
  register: UseFormRegister<ApplicationFormValues>
}

function ApplicationForm({
  additionalDetailsLength,
  errors,
  isGenerating,
  register,
}: ApplicationFormProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={errors.jobTitle?.message} label="Job title" required>
          <Input
            placeholder="Product manager"
            {...register('jobTitle', { required: 'Required' })}
            disabled={isGenerating}
          />
        </Field>

        <Field error={errors.company?.message} label="Company" required>
          <Input
            placeholder="Apple"
            {...register('company', { required: 'Required' })}
            disabled={isGenerating}
          />
        </Field>
      </div>

      <Field error={errors.skills?.message} label="I am good at..." required>
        <Input
          placeholder="HTML, CSS and doing things in time"
          {...register('skills', { required: 'Required' })}
          disabled={isGenerating}
        />
      </Field>

      <Field
        className="min-h-0 flex-1"
        counter={`${String(additionalDetailsLength)}/${String(ADDITIONAL_DETAILS_MAX)}`}
        error={errors.additionalDetails?.message}
        invalid={additionalDetailsLength > ADDITIONAL_DETAILS_MAX}
        label="Additional details"
      >
        <Textarea
          className="min-h-0 flex-1"
          placeholder="What else should the letter mention about you?"
          {...register('additionalDetails', {
            maxLength: {
              message: `Keep it within ${String(ADDITIONAL_DETAILS_MAX)} characters`,
              value: ADDITIONAL_DETAILS_MAX,
            },
          })}
          disabled={isGenerating}
        />
      </Field>
    </div>
  )
}

export { ADDITIONAL_DETAILS_MAX, ApplicationForm }
export type { ApplicationFormValues }
