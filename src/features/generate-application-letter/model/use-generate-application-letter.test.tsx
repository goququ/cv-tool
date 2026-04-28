import type { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  ApplicationsContext,
  type JobApplication,
  LetterGeneratorClient,
  LetterGeneratorContext,
} from '@/entities/application'
import type { ApplicationFormValues } from '@/widgets/application-form'
import { useGenerateApplicationLetter } from './use-generate-application-letter'

const payloadFixture: ApplicationFormValues = {
  additionalDetails: 'Detail',
  company: 'Linear',
  jobTitle: 'Designer',
  skills: 'systems',
}

class StubLetterGenerator extends LetterGeneratorClient {
  private readonly letters: string[]

  constructor(letters: string[]) {
    super()
    this.letters = letters
  }

  generateLetter() {
    const nextLetter = this.letters.shift() ?? 'fallback letter'

    return Promise.resolve(nextLetter)
  }
}

function createWrapper(options?: {
  letterGenerator?: LetterGeneratorClient
  saveApplication?: (application: JobApplication) => Promise<void>
}) {
  const saveApplication =
    options?.saveApplication ?? vi.fn().mockResolvedValue(undefined)
  const deleteApplication = vi.fn().mockResolvedValue(undefined)
  const letterGenerator =
    options?.letterGenerator ??
    new StubLetterGenerator(['First letter', 'Second letter'])

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <ApplicationsContext.Provider
        value={{ applications: [], deleteApplication, saveApplication }}
      >
        <LetterGeneratorContext.Provider value={letterGenerator}>
          {children}
        </LetterGeneratorContext.Provider>
      </ApplicationsContext.Provider>
    )
  }

  return { Wrapper, saveApplication }
}

describe('useGenerateApplicationLetter', () => {
  it('saves one draft and reuses its id across regenerations', async () => {
    const saveApplication = vi.fn().mockResolvedValue(undefined)
    const { Wrapper } = createWrapper({ saveApplication })

    const { result } = renderHook(() => useGenerateApplicationLetter(), {
      wrapper: Wrapper,
    })

    await act(async () => {
      await result.current.generate(payloadFixture)
    })

    await act(async () => {
      await result.current.generate(payloadFixture)
    })

    expect(saveApplication).toHaveBeenCalledTimes(2)

    const firstApplication = saveApplication.mock.calls[0][0] as JobApplication
    const secondApplication = saveApplication.mock.calls[1][0] as JobApplication

    expect(firstApplication.letter).toBe('First letter')
    expect(secondApplication.letter).toBe('Second letter')
    expect(secondApplication.id).toBe(firstApplication.id)
    expect(result.current.letter).toBe('Second letter')
    expect(result.current.status).toBe('ready')
  })

  it('resets generated state and draft identity', async () => {
    const saveApplication = vi.fn().mockResolvedValue(undefined)
    const { Wrapper } = createWrapper({ saveApplication })

    const { result } = renderHook(() => useGenerateApplicationLetter(), {
      wrapper: Wrapper,
    })

    await act(async () => {
      await result.current.generate(payloadFixture)
    })

    act(() => {
      result.current.resetDraft()
    })

    await act(async () => {
      await result.current.generate(payloadFixture)
    })

    const firstApplication = saveApplication.mock.calls[0][0] as JobApplication
    const secondApplication = saveApplication.mock.calls[1][0] as JobApplication

    expect(result.current.status).toBe('ready')
    expect(result.current.letter).toBe('Second letter')
    expect(secondApplication.id).not.toBe(firstApplication.id)
  })

  it('surfaces error state when generation fails', async () => {
    const failingGenerator = {
      generateLetter: vi.fn().mockRejectedValue(new Error('boom')),
    } as unknown as LetterGeneratorClient
    const { Wrapper, saveApplication } = createWrapper({
      letterGenerator: failingGenerator,
    })

    const { result } = renderHook(() => useGenerateApplicationLetter(), {
      wrapper: Wrapper,
    })

    await act(async () => {
      await result.current.generate(payloadFixture)
    })

    expect(result.current.status).toBe('error')
    expect(result.current.letter).toBeUndefined()
    expect(saveApplication).not.toHaveBeenCalled()
  })
})
