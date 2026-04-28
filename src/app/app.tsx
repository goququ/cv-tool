import { RouterProvider } from '@tanstack/react-router'

import { ApplicationsProvider } from '@/entities/application/model/applications-provider'
import { appRouter } from './router/app-router'

function App() {
  return (
    <ApplicationsProvider>
      <RouterProvider router={appRouter} />
    </ApplicationsProvider>
  )
}

export default App
