import type { Meta, StoryObj } from '@storybook/react-vite'

import HomeIcon from '../../assets/icons/home.svg?react'
import { IconButton } from './icon-button'

const meta = {
  args: {
    'aria-label': 'Go to dashboard',
    size: 'md',
    tone: 'default',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    tone: {
      control: { type: 'select' },
      options: ['default', 'ghost'],
    },
    disabled: { control: 'boolean' },
    icon: { control: false },
  },
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/IconButton',
} satisfies Meta<typeof IconButton>

type Story = StoryObj<typeof meta>

export default meta

export const Home: Story = {
  args: {
    'aria-label': 'Go to dashboard',
    icon: <HomeIcon aria-hidden="true" />,
    size: 'md',
    tone: 'default',
  },
}

export const HomeSmall: Story = {
  args: {
    'aria-label': 'Go to dashboard',
    icon: <HomeIcon aria-hidden="true" />,
    size: 'sm',
    tone: 'default',
  },
}

export const Ghost: Story = {
  args: {
    'aria-label': 'Go to dashboard',
    icon: <HomeIcon aria-hidden="true" />,
    size: 'md',
    tone: 'ghost',
  },
}
