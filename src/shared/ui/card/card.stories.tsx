import type { Meta, StoryObj } from '@storybook/react-vite'

import CopyIcon from '../../assets/icons/copy.svg?react'
import PlusIcon from '../../assets/icons/plus.svg?react'
import TrashIcon from '../../assets/icons/trash.svg?react'
import { Button } from '../button/button'
import { ProgressDots } from '../progress-dots/progress-dots'
import { TextButton } from '../text-button/text-button'
import { Card } from './card'

const meta = {
  args: {
    padding: 'md',
    variant: 'preview',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['preview', 'banner', 'elevated', 'soft'],
    },
    padding: {
      control: { type: 'select' },
      options: ['md', 'lg', 'banner'],
    },
  },
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/Card',
} satisfies Meta<typeof Card>

type Story = StoryObj<typeof meta>

export default meta

const sampleLetter = `Dear Stripe team,

I am a highly skilled product designer with a passion for creating intuitive, user-centered designs. I have a strong background in design systems and am excited about the opportunity to join the Stripe product design team and work on building out the design system for the platform.`

export const Preview: Story = {
  render: (args) => (
    <div className="w-[552px]">
      <Card {...args}>
        <div className="relative h-[152px] overflow-hidden whitespace-pre-line">
          {sampleLetter}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-[var(--card-bg)]" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 pt-4">
          <TextButton
            leadingIcon={<TrashIcon aria-hidden="true" className="size-5" />}
          >
            Delete
          </TextButton>
          <TextButton
            trailingIcon={<CopyIcon aria-hidden="true" className="size-5" />}
          >
            Copy to clipboard
          </TextButton>
        </div>
      </Card>
    </div>
  ),
}

export const Banner: Story = {
  args: {
    padding: 'banner',
    variant: 'banner',
  },
  render: (args) => (
    <div className="w-[1120px]">
      <Card {...args}>
        <div className="mx-auto flex w-[480px] flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-display text-ink-950 text-[length:var(--heading-display-md-size)] leading-[var(--heading-display-md-line)] font-[var(--heading-display-weight)] tracking-[var(--heading-display-tracking)]">
              Hit your goal
            </h2>
            <p className="text-ink-600 text-[18px] leading-[28px]">
              Generate and send out couple more job applications today to get
              hired faster
            </p>
          </div>

          <Button leadingIcon={<PlusIcon aria-hidden="true" />} size="lg">
            Create New
          </Button>

          <div className="flex flex-col items-center gap-2">
            <ProgressDots current={3} total={5} />
            <span className="text-ink-600 text-[18px] leading-[28px]">
              3 out of 5
            </span>
          </div>
        </div>
      </Card>
    </div>
  ),
}

export const PreviewLetter: Story = {
  args: {
    padding: 'md',
    variant: 'preview',
  },
  render: (args) => (
    <div className="w-[544px]">
      <Card {...args} className="flex h-[600px] flex-col justify-between gap-2">
        <p className="text-ink-600 text-[18px] leading-[28px]">
          Your personalized job application will appear here…
        </p>
        <div className="flex justify-end">
          <TextButton
            trailingIcon={<CopyIcon aria-hidden="true" className="size-5" />}
          >
            Copy to clipboard
          </TextButton>
        </div>
      </Card>
    </div>
  ),
}

export const Elevated: Story = {
  args: {
    padding: 'md',
    variant: 'elevated',
  },
  render: (args) => (
    <div className="w-[400px]">
      <Card {...args}>
        <p className="text-ink-700 text-base">Plain elevated card.</p>
      </Card>
    </div>
  ),
}

export const Soft: Story = {
  args: {
    padding: 'md',
    variant: 'soft',
  },
  render: (args) => (
    <div className="w-[400px]">
      <Card {...args}>
        <p className="text-ink-700 text-base">Soft surface variant.</p>
      </Card>
    </div>
  ),
}
