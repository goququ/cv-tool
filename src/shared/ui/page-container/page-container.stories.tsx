import type { Meta, StoryObj } from '@storybook/react-vite'

import { PageContainer } from './page-container'

const meta = {
  args: {
    as: 'div',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'main', 'section', 'article'],
    },
  },
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Shared UI/PageContainer',
} satisfies Meta<typeof PageContainer>

type Story = StoryObj<typeof meta>

export default meta

export const Default: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <div className="rounded-card bg-surface-card text-ink-700 p-6">
        <p className="text-base">
          Page content goes here. The container clamps width to{' '}
          <code>--page-max-width</code> and applies token-driven horizontal /
          vertical padding that adapts at <code>md</code> and <code>xl</code>{' '}
          breakpoints.
        </p>
      </div>
    </PageContainer>
  ),
}

export const WithMultipleSections: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <div className="space-y-6">
        <div className="rounded-card bg-surface-card text-ink-700 p-6">
          Section A
        </div>
        <div className="rounded-card bg-surface-banner text-ink-950 p-6">
          Section B
        </div>
        <div className="rounded-card border-line-soft bg-surface-page shadow-card text-ink-700 border p-6">
          Section C
        </div>
      </div>
    </PageContainer>
  ),
}
