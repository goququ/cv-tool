import { useCallback, useRef, useState } from 'react'

import {
  type LetterGenerationPayload,
  useApplications,
  useLetterGenerator,
} from '@/entities/application'

type GenerationStatus = 'idle' | 'generating' | 'ready' | 'error'

function useGenerateApplicationLetter() {
  const letterGenerator = useLetterGenerator()
  const { saveApplication } = useApplications()

  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [letter, setLetter] = useState<string | undefined>(undefined)
  const draftIdRef = useRef<string | null>(null)
  const createdAtRef = useRef<string | null>(null)

  const generate = useCallback(
    async (values: LetterGenerationPayload) => {
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

  const resetDraft = useCallback(() => {
    setStatus('idle')
    setLetter(undefined)
    draftIdRef.current = null
    createdAtRef.current = null
  }, [])

  return { generate, letter, resetDraft, status }
}

export { useGenerateApplicationLetter }
