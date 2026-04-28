import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProgressDots } from './progress-dots'

const meta = {
  args: {
    current: 3,
    size: 'md',
    total: 5,
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    current: { control: { type: 'number', min: 0, max: 10 } },
    total: { control: { type: 'number', min: 0, max: 10 } },
  },
  component: ProgressDots,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/ProgressDots',
} satisfies Meta<typeof ProgressDots>

type Story = StoryObj<typeof meta>

export default meta

export const HeaderSmall: Story = {
  args: {
    current: 3,
    size: 'sm',
    total: 5,
  },
}

export const BannerLarge: Story = {
  args: {
    current: 3,
    size: 'md',
    total: 5,
  },
}

export const Empty: Story = {
  args: {
    current: 0,
    total: 5,
  },
}

export const Full: Story = {
  args: {
    current: 5,
    total: 5,
  },
}

export const Overflow: Story = {
  args: {
    current: 9,
    total: 5,
  },
}

export const InHeaderRow: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-ink-600 text-[18px] leading-[28px]">
        3/5 applications generated
      </span>
      <ProgressDots current={3} size="sm" total={5} />
    </div>
  ),
}
