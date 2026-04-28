import type { PropsWithChildren } from 'react'

import {
  type LetterGeneratorClient,
  TemplateLetterGeneratorClient,
} from '@/shared/api/letter-generator-client'
import { LetterGeneratorContext } from './use-letter-generator'

type LetterGeneratorProviderProps = PropsWithChildren<{
  client?: LetterGeneratorClient
}>

const defaultLetterGeneratorClient = new TemplateLetterGeneratorClient()

function LetterGeneratorProvider({
  children,
  client = defaultLetterGeneratorClient,
}: LetterGeneratorProviderProps) {
  return (
    <LetterGeneratorContext.Provider value={client}>
      {children}
    </LetterGeneratorContext.Provider>
  )
}

export { LetterGeneratorProvider }
