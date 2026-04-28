import type { Meta, StoryObj } from '@storybook/react-vite'

import LoadingIcon from '../../assets/icons/loading.svg?react'
import PlusIcon from '../../assets/icons/plus.svg?react'
import RepeatIcon from '../../assets/icons/repeat.svg?react'
import { Button } from './button'

const meta = {
  args: {
    children: 'Create New',
    fullWidth: false,
    loading: false,
    size: 'sm',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'subtle'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    loadingIcon: { control: false },
  },
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/Button',
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const PrimarySmall: Story = {
  args: {
    children: 'Create New',
    leadingIcon: <PlusIcon aria-hidden="true" />,
    size: 'sm',
    variant: 'primary',
  },
}

export const PrimaryLarge: Story = {
  args: {
    children: 'Create New',
    leadingIcon: <PlusIcon aria-hidden="true" />,
    size: 'lg',
    variant: 'primary',
  },
}

export const SecondaryLarge: Story = {
  args: {
    children: 'Try Again',
    leadingIcon: <RepeatIcon aria-hidden="true" />,
    size: 'lg',
    variant: 'secondary',
  },
}

export const Loading: Story = {
  args: {
    children: 'Generate Letter',
    loading: true,
    loadingIcon: <LoadingIcon aria-label="loading" className="animate-spin" />,
    size: 'lg',
    variant: 'primary',
  },
}

export const LoadingSecondary: Story = {
  args: {
    children: 'Try Again',
    loading: true,
    loadingIcon: <LoadingIcon aria-label="loading" className="animate-spin" />,
    size: 'lg',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Create New',
    disabled: true,
    size: 'lg',
    variant: 'primary',
  },
}
