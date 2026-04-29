import { useApplications } from './use-applications'

const APPLICATIONS_GOAL = 5

type ApplicationsProgress = {
  count: number
  total: number
  goalReached: boolean
  visibleCount: number
}

function useApplicationsProgress(): ApplicationsProgress {
  const { applications } = useApplications()
  const count = applications.length
  const goalReached = count >= APPLICATIONS_GOAL
  const visibleCount = goalReached ? APPLICATIONS_GOAL : count

  return {
    count,
    total: APPLICATIONS_GOAL,
    goalReached,
    visibleCount,
  }
}

export { APPLICATIONS_GOAL, useApplicationsProgress }
export type { ApplicationsProgress }
