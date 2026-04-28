import { RouterProvider } from '@tanstack/react-router'

import { ApplicationsProvider, LetterGeneratorProvider } from '@/app/providers'
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
