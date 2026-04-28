import { useApplications } from './use-applications'

const APPLICATIONS_GOAL = 5

type ApplicationsProgress = {
  count: number
  total: number
  goalReached: boolean
}

function useApplicationsProgress(): ApplicationsProgress {
  const { applications } = useApplications()
  const count = applications.length
  const goalReached = count >= APPLICATIONS_GOAL

  return {
    count,
    total: APPLICATIONS_GOAL,
    goalReached,
  }
}

export { APPLICATIONS_GOAL, useApplicationsProgress }
export type { ApplicationsProgress }
