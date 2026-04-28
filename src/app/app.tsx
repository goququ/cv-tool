import { RouterProvider } from '@tanstack/react-router'

import { ApplicationsProvider } from '@/entities/application/model/applications-provider'
import { LetterGeneratorProvider } from '@/entities/application/model/letter-generator-provider'
import { appRouter } from './router/app-router'

function App() {
  return (
    <ApplicationsProvider>
      <LetterGeneratorProvider>
        <RouterProvider router={appRouter} />
      </LetterGeneratorProvider>
    </ApplicationsProvider>
  )
}

export default App
