import type { PropsWithChildren } from 'react'

import {
  type LetterGeneratorClient,
  LetterGeneratorContext,
  TemplateLetterGeneratorClient,
} from '@/entities/application'

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
