import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input/input'
import { Field } from './field'

const meta = {
  args: {
    label: 'Job title',
  },
  component: Field,
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/Field',
} satisfies Meta<typeof Field>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
  args: {
    children: <Input placeholder="Product manager" />,
  },
}

export const WithHint: Story = {
  args: {
    children: <Input placeholder="Product manager" />,
    hint: 'Use the role title from the job posting',
  },
}

export const WithError: Story = {
  args: {
    children: <Input defaultValue="" invalid placeholder="Product manager" />,
    error: 'Job title is required',
  },
}

export const WithCounter: Story = {
  args: {
    children: <Input defaultValue="Product manager" />,
    counter: '14/60',
    label: 'Job title',
  },
}

export const InvalidWithCounter: Story = {
  args: {
    children: <Input defaultValue="Senior product manager" invalid />,
    counter: '23/20',
    invalid: true,
    label: 'Job title',
  },
}

export const WithErrorAndCounter: Story = {
  args: {
    children: <Input defaultValue="Senior product manager" invalid />,
    counter: '23/20',
    error: 'Title is too long',
    label: 'Job title',
  },
}
