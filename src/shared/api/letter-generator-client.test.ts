import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getRandomInt } from '../lib/get-random-int'
import { sleep } from '../lib/sleep'
import {
  type LetterGenerationPayload,
  TemplateLetterGeneratorClient,
} from './letter-generator-client'

vi.mock('../lib/get-random-int', () => ({
  getRandomInt: vi.fn(),
}))

vi.mock('../lib/sleep', () => ({
  sleep: vi.fn(() => Promise.resolve()),
}))

const payloadFixture: LetterGenerationPayload = {
  additionalDetails:
    'I want to help you build awesome solutions to accomplish your goals.',
  company: 'Apple',
  jobTitle: 'Product Manager',
  skills: 'HTML, CSS and doing things in time',
}

describe('template letter generator client', () => {
  beforeEach(() => {
    vi.mocked(getRandomInt).mockReturnValueOnce(3000).mockReturnValueOnce(0)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('generates a letter through a single public method', async () => {
    const client = new TemplateLetterGeneratorClient()

    const result = await client.generateLetter(payloadFixture)

    expect(sleep).toHaveBeenCalledWith(3000)
    expect(result).toContain('Apple')
    expect(result).toContain('Product Manager')
    expect(result).toContain('HTML, CSS and doing things in time')
  })

  it('requests a random delay between three and five seconds', async () => {
    const client = new TemplateLetterGeneratorClient()

    await client.generateLetter(payloadFixture)

    expect(getRandomInt).toHaveBeenNthCalledWith(1, 3000, 5000)
  })

  it('uses fallback wording instead of leaving broken placeholders', async () => {
    const client = new TemplateLetterGeneratorClient()

    const result = await client.generateLetter({
      additionalDetails: '',
      company: '',
      jobTitle: '',
      skills: '',
    })

    expect(result).not.toContain('{{')
    expect(result).toContain('your team')
    expect(result).toContain('this role')
    expect(result).toContain('adapt quickly')
  })

  it('can choose different templates across calls', async () => {
    vi.mocked(getRandomInt)
      .mockReset()
      .mockReturnValueOnce(3000)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5000)
      .mockReturnValueOnce(4)

    const client = new TemplateLetterGeneratorClient()

    const firstLetter = await client.generateLetter(payloadFixture)
    const secondLetter = await client.generateLetter(payloadFixture)

    expect(firstLetter).not.toBe(secondLetter)
  })
})
