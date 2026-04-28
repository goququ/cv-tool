import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type {
  ApplicationsContextValue,
  JobApplication,
} from '@/entities/application'
import {
  ApplicationClient,
  ApplicationsContext,
  LocalStorageApplicationClient,
} from '@/entities/application'

type ApplicationsProviderProps = PropsWithChildren<{
  client?: ApplicationClient
}>

const defaultApplicationsClient = new LocalStorageApplicationClient()

function ApplicationsProvider({
  children,
  client = defaultApplicationsClient,
}: ApplicationsProviderProps) {
  const [applications, setApplications] = useState<JobApplication[]>([])

  useEffect(() => {
    let isMounted = true

    void client.list().then((storedApplications) => {
      if (isMounted) {
        setApplications(storedApplications)
      }
    })

    return () => {
      isMounted = false
    }
  }, [client])

  const saveApplication = useCallback(
    async (application: JobApplication) => {
      await client.save(application)

      setApplications((currentApplications) => {
        const remainingApplications = currentApplications.filter(
          (currentApplication) => currentApplication.id !== application.id,
        )

        return [...remainingApplications, application]
      })
    },
    [client],
  )

  const deleteApplication = useCallback(
    async (applicationId: string) => {
      await client.remove(applicationId)

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application.id !== applicationId,
        ),
      )
    },
    [client],
  )

  const value = useMemo<ApplicationsContextValue>(
    () => ({
      applications,
      deleteApplication,
      saveApplication,
    }),
    [applications, deleteApplication, saveApplication],
  )

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  )
}

export { ApplicationsProvider }
