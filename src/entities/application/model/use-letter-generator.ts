import { createContext, useContext } from 'react'

import type { LetterGeneratorClient } from '@/shared/api/letter-generator-client'

const LetterGeneratorContext = createContext<LetterGeneratorClient | null>(null)

function useLetterGenerator(): LetterGeneratorClient {
  const client = useContext(LetterGeneratorContext)

  if (!client) {
    throw new Error(
      'useLetterGenerator must be used within LetterGeneratorProvider',
    )
  }

  return client
}

export { LetterGeneratorContext, useLetterGenerator }
