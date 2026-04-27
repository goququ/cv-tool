import type { JobApplication } from './types'

const APPLICATIONS_STORAGE_KEY = 'cv-tool:applications'

abstract class ApplicationClient {
  abstract list(): Promise<JobApplication[]>
  abstract remove(applicationId: string): Promise<void>
  abstract save(application: JobApplication): Promise<void>
}

class LocalStorageApplicationClient extends ApplicationClient {
  public list(): Promise<JobApplication[]> {
    const storedValue = localStorage.getItem(APPLICATIONS_STORAGE_KEY)

    if (!storedValue) {
      return Promise.resolve([])
    }

    try {
      return Promise.resolve(JSON.parse(storedValue) as JobApplication[])
    } catch {
      return Promise.resolve([])
    }
  }

  public async remove(applicationId: string): Promise<void> {
    const currentApplications = await this.list()
    const nextApplications = currentApplications.filter(
      (application) => application.id !== applicationId,
    )

    localStorage.setItem(
      APPLICATIONS_STORAGE_KEY,
      JSON.stringify(nextApplications),
    )
  }

  public async save(application: JobApplication): Promise<void> {
    const currentApplications = await this.list()
    const nextApplications = currentApplications.filter(
      (currentApplication) => currentApplication.id !== application.id,
    )

    localStorage.setItem(
      APPLICATIONS_STORAGE_KEY,
      JSON.stringify([...nextApplications, application]),
    )
  }
}

export {
  ApplicationClient,
  APPLICATIONS_STORAGE_KEY,
  LocalStorageApplicationClient,
}
