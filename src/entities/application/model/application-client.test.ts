import { beforeEach, describe, expect, it } from 'vitest'

import {
  APPLICATIONS_STORAGE_KEY,
  LocalStorageApplicationClient,
} from './application-client'
import type { JobApplication } from './types'

const applicationFixture: JobApplication = {
  additionalDetails: 'I enjoy building well-structured products.',
  company: 'Apple',
  createdAt: '2026-04-29T10:00:00.000Z',
  id: 'application-1',
  jobTitle: 'Product manager',
  letter: 'Dear Apple Team, ...',
  skills: 'HTML, CSS and doing things in time',
  updatedAt: '2026-04-29T10:00:00.000Z',
}

describe('local storage application client', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('lists an empty collection when nothing was saved', async () => {
    const client = new LocalStorageApplicationClient()

    await expect(client.list()).resolves.toEqual([])
  })

  it('lists an empty collection when storage contains invalid json', async () => {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, '{not-valid-json')

    const client = new LocalStorageApplicationClient()

    await expect(client.list()).resolves.toEqual([])
  })

  it('saves and restores applications', async () => {
    const client = new LocalStorageApplicationClient()

    await client.save(applicationFixture)

    await expect(client.list()).resolves.toEqual([applicationFixture])
  })

  it('removes an application by id', async () => {
    const client = new LocalStorageApplicationClient()

    await client.save(applicationFixture)
    await client.remove(applicationFixture.id)

    await expect(client.list()).resolves.toEqual([])
  })
})
