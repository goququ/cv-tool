import { createContext, useContext } from 'react'

import type { JobApplication } from './types'

type ApplicationsContextValue = {
  applications: JobApplication[]
  deleteApplication: (applicationId: string) => Promise<void>
  saveApplication: (application: JobApplication) => Promise<void>
}

const ApplicationsContext = createContext<ApplicationsContextValue | null>(null)

function useApplications() {
  const context = useContext(ApplicationsContext)

  if (!context) {
    throw new Error('useApplications must be used within ApplicationsProvider')
  }

  return context
}

export { ApplicationsContext, useApplications }
export type { ApplicationsContextValue }
