import { getRandomInt } from '@/shared/lib/get-random-int'
import { sleep } from '@/shared/lib/sleep'

type LetterGenerationPayload = {
  additionalDetails: string
  company: string
  jobTitle: string
  skills: string
}

abstract class LetterGeneratorClient {
  abstract generateLetter(payload: LetterGenerationPayload): Promise<string>
}

class TemplateLetterGeneratorClient extends LetterGeneratorClient {
  private readonly templates = [
    [
      'Dear {{company}} Team,',
      '',
      'I am writing to express my interest in the {{jobTitle}} position.',
      '',
      'My experience in the realm combined with my skills in {{skills}} make me a strong candidate for this role.',
      '',
      '{{additionalDetails}}',
      '',
      'I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.',
      '',
      'Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.',
    ].join('\n'),
    [
      'Hello {{company}} Team,',
      '',
      'I would love to be considered for the {{jobTitle}} role.',
      '',
      'I bring practical strengths in {{skills}} and I know how to turn those strengths into dependable execution.',
      '',
      '{{additionalDetails}}',
      '',
      'I would be excited to contribute with energy, ownership, and a strong product mindset.',
    ].join('\n'),
    [
      'Dear Hiring Team at {{company}},',
      '',
      'The {{jobTitle}} opportunity immediately caught my attention.',
      '',
      'My background and day-to-day work with {{skills}} have prepared me to contribute to this role from the start.',
      '',
      '{{additionalDetails}}',
      '',
      'I would value the opportunity to bring thoughtful, reliable work to your team.',
    ].join('\n'),
    [
      'Dear {{company}} Team,',
      '',
      'I am excited to submit my application for the {{jobTitle}} role.',
      '',
      'What I can bring to this role is a strong foundation in {{skills}}, paired with a hands-on, delivery-focused mindset.',
      '',
      '{{additionalDetails}}',
      '',
      'I would welcome the chance to discuss how I can contribute to your team.',
    ].join('\n'),
    [
      'Hello {{company}} Team,',
      '',
      'Please consider me for the {{jobTitle}} position.',
      '',
      'I have built relevant experience through my work with {{skills}}, and I know how to adapt quickly while maintaining quality.',
      '',
      '{{additionalDetails}}',
      '',
      'Thank you for your time and consideration.',
    ].join('\n'),
  ] as const

  public async generateLetter(
    payload: LetterGenerationPayload,
  ): Promise<string> {
    const delayMs = getRandomInt(3000, 5000)
    const templateIndex = getRandomInt(0, this.templates.length - 1)

    await sleep(delayMs)

    return this.renderTemplate(this.templates[templateIndex], payload)
  }

  private renderTemplate(
    template: string,
    payload: LetterGenerationPayload,
  ): string {
    const normalizedPayload = {
      additionalDetails:
        payload.additionalDetails.trim() ||
        'I am confident I can contribute through thoughtful collaboration and reliable execution.',
      company: payload.company.trim() || 'your',
      jobTitle: payload.jobTitle.trim() || 'this role',
      skills: payload.skills.trim() || 'adapt quickly and deliver consistently',
    }

    const renderedTemplate = template
      .replaceAll('{{company}}', normalizedPayload.company)
      .replaceAll('{{jobTitle}}', normalizedPayload.jobTitle)
      .replaceAll('{{skills}}', normalizedPayload.skills)
      .replaceAll('{{additionalDetails}}', normalizedPayload.additionalDetails)

    return renderedTemplate
  }
}

export { LetterGeneratorClient, TemplateLetterGeneratorClient }
export type { LetterGenerationPayload }
