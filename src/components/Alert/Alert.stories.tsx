import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Alert } from './Alert';

const meta = {
  title: 'Artikit/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['message', 'error', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Message: Story = {
  args: {
    variant: 'message',
    title: 'Message',
    children: 'General information or neutral context for the user.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again or contact support.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes were saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Proceed with caution—this action may have side effects.',
  },
};

export const Dismissible: Story = {
  render: function DismissibleStory() {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        {open ? (
          <Alert variant="message" title="Dismissible" onDismiss={() => setOpen(false)}>
            Click × to dismiss this alert.
          </Alert>
        ) : (
          <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
            Show alert again
          </Button>
        )}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
      <Alert variant="message" title="Message">
        Neutral tip or description.
      </Alert>
      <Alert variant="error" title="Error">
        Operation failed.
      </Alert>
      <Alert variant="success" title="Success">
        All set.
      </Alert>
      <Alert variant="warning" title="Warning">
        Check before continuing.
      </Alert>
    </div>
  ),
};
