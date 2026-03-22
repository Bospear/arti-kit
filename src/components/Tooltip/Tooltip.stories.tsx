import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Artikit/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['message', 'error', 'success', 'warning'],
    },
    placement: { control: 'select', options: ['top', 'bottom'] },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Message: Story = {
  args: {
    content: 'Neutral hint or field description.',
    variant: 'message',
    children: (
      <Button type="button" variant="outline" size="sm">
        Message
      </Button>
    ),
  },
};

export const Error: Story = {
  args: {
    content: 'This action cannot be completed.',
    variant: 'error',
    children: (
      <Button type="button" variant="outline" size="sm">
        Error
      </Button>
    ),
  },
};

export const Success: Story = {
  args: {
    content: 'Progress saved to this device.',
    variant: 'success',
    children: (
      <Button type="button" variant="outline" size="sm">
        Success
      </Button>
    ),
  },
};

export const Warning: Story = {
  args: {
    content: 'You are attuned to two items already.',
    variant: 'warning',
    children: (
      <Button type="button" variant="outline" size="sm">
        Warning
      </Button>
    ),
  },
};

export const PlacementBottom: Story = {
  args: {
    content: 'Tooltip below the trigger.',
    variant: 'success',
    placement: 'bottom',
    children: (
      <Button type="button" variant="ghost" size="sm">
        Bottom
      </Button>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
      <Tooltip content="General hint." variant="message">
        <Button type="button" variant="outline" size="sm">
          Message
        </Button>
      </Tooltip>
      <Tooltip content="Something went wrong." variant="error">
        <Button type="button" variant="outline" size="sm">
          Error
        </Button>
      </Tooltip>
      <Tooltip content="All good." variant="success">
        <Button type="button" variant="outline" size="sm">
          Success
        </Button>
      </Tooltip>
      <Tooltip content="Check carefully." variant="warning">
        <Button type="button" variant="outline" size="sm">
          Warning
        </Button>
      </Tooltip>
    </div>
  ),
};
