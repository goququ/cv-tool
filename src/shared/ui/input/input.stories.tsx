import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

const meta = {
  args: {
    placeholder: 'Product manager',
    size: 'sm',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  component: Input,
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/Input',
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof meta>

export default meta

export const Empty: Story = {}

export const Filled: Story = {
  args: {
    defaultValue: 'Product manager',
  },
}

export const Invalid: Story = {
  args: {
    defaultValue: 'Product manager',
    invalid: true,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Product manager',
    disabled: true,
  },
}

export const Medium: Story = {
  args: {
    defaultValue: 'Product manager',
    size: 'md',
  },
}
