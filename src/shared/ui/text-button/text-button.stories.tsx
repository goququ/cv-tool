import type { Meta, StoryObj } from '@storybook/react-vite'

import CopyIcon from '../../assets/icons/copy.svg?react'
import TrashIcon from '../../assets/icons/trash.svg?react'
import { TextButton } from './text-button'

const meta = {
  args: {
    children: 'Delete',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/TextButton',
} satisfies Meta<typeof TextButton>

type Story = StoryObj<typeof meta>

const TrashIconNode = <TrashIcon aria-hidden="true" className="size-5" />
const CopyIconNode = <CopyIcon aria-hidden="true" className="size-5" />

export default meta

export const Delete: Story = {
  args: {
    children: 'Delete',
    leadingIcon: TrashIconNode,
  },
}

export const Copy: Story = {
  args: {
    children: 'Copy to clipboard',
    trailingIcon: CopyIconNode,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Delete',
    disabled: true,
    leadingIcon: TrashIconNode,
  },
}

export const InCardFooter: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex w-[504px] items-center justify-between gap-2">
      <TextButton leadingIcon={TrashIconNode}>Delete</TextButton>
      <TextButton trailingIcon={CopyIconNode}>Copy to clipboard</TextButton>
    </div>
  ),
}
