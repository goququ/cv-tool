import { useApplications } from '@/entities/application/model/use-applications'

const APPLICATIONS_GOAL = 5

type ApplicationsProgress = {
  count: number
  total: number
  visibleCount: number
  goalReached: boolean
}

function useApplicationsProgress(): ApplicationsProgress {
  const { applications } = useApplications()
  const count = applications.length
  const visibleCount = Math.min(count, APPLICATIONS_GOAL)
  const goalReached = count >= APPLICATIONS_GOAL

  return {
    count,
    total: APPLICATIONS_GOAL,
    visibleCount,
    goalReached,
  }
}

export { APPLICATIONS_GOAL, useApplicationsProgress }
export type { ApplicationsProgress }
