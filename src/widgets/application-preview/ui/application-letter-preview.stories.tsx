import type { Meta, StoryObj } from '@storybook/react-vite'

import { ApplicationLetterPreview } from './application-letter-preview'

const meta = {
  args: {
    isGenerating: false,
    letter: undefined,
    placeholder: 'Your personalized job application will appear here…',
  },
  component: ApplicationLetterPreview,
  decorators: [
    (Story) => (
      <div className="mx-auto w-[780px] max-w-full p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Widgets/ApplicationLetterPreview',
} satisfies Meta<typeof ApplicationLetterPreview>

type Story = StoryObj<typeof meta>

export default meta

export const Empty: Story = {}

export const Loading: Story = {
  args: {
    isGenerating: true,
  },
}

export const Ready: Story = {
  args: {
    letter:
      'Dear Linear Team,\n\nI am excited to apply for the Designer role and would love to contribute to your product experience.',
  },
}
