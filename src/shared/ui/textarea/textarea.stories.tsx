import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field } from '../field/field'
import { Textarea } from './textarea'

const meta = {
  args: {
    placeholder: 'Describe why you are a great fit or paste your bio',
    resize: 'none',
    size: 'md',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  component: Textarea,
  decorators: [
    (Story) => (
      <div className="w-[544px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Shared UI/Textarea',
} satisfies Meta<typeof Textarea>

type Story = StoryObj<typeof meta>

export default meta

export const Empty: Story = {}

export const Filled: Story = {
  args: {
    defaultValue:
      'I want to help you build awesome solutions to accomplish your goals and vision. I can create intuitive and aesthetically pleasing devices that are very easy to use.',
  },
}

export const Invalid: Story = {
  args: {
    defaultValue:
      'There is nothing like the feeling of a good night sleep. Cozy, wrapped-up-in-a-heavy-blanket sleep. Fire crackling, curtains drawn, DO NOT DISTURB kind of sleep.',
    invalid: true,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue:
      'I want to help you build awesome solutions to accomplish your goals and vision.',
    disabled: true,
  },
}

export const InFieldWithCounter: Story = {
  decorators: [],
  render: (args) => (
    <div className="w-[544px]">
      <Field counter="0/1200" label="Additional details">
        <Textarea {...args} />
      </Field>
    </div>
  ),
}

export const InFieldOverflow: Story = {
  decorators: [],
  render: () => (
    <div className="w-[544px]">
      <Field counter="1290/1200" invalid label="Additional details">
        <Textarea
          defaultValue="There is nothing like the feeling of a good night sleep. Cozy, wrapped-up-in-a-heavy-blanket sleep. Fire crackling, curtains drawn, DO NOT DISTURB kind of sleep. *Hygge stuff. That's the kind of sleep we're talking about. 85% of people agree sleep is a key to their wellbeing, but more than 50% of people are unsatisfied with their own sleep. Whether it's stress, interruption, work, children, people need help getting great rest!"
          invalid
        />
      </Field>
    </div>
  ),
}
