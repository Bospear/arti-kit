import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Snackbar } from './Snackbar';

const meta = {
  title: 'Artikit/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    children: { control: false },
    variant: {
      control: 'select',
      options: ['message', 'error', 'success', 'warning'],
    },
    position: {
      control: 'select',
      options: ['center', 'start', 'end'],
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundStory(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="primary" onClick={() => setOpen(true)}>
          Show snackbar
        </Button>
        <Snackbar {...args} open={open} onClose={() => setOpen(false)}>
          {args.children ?? <p>Saved to your chronicle.</p>}
        </Snackbar>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    variant: 'message',
    duration: 6000,
    children: <p>Saved to your chronicle.</p>,
  },
};

export const WithAction: Story = {
  render: function ActionStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          Snackbar with action
        </Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          variant="message"
          duration={8000}
          actionLabel="Undo"
          onAction={() => setOpen(false)}
        >
          <p>Item removed from inventory.</p>
        </Snackbar>
      </>
    );
  },
};

export const ManualDismiss: Story = {
  render: function ManualStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
          No auto-dismiss (duration 0)
        </Button>
        <Snackbar open={open} onClose={() => setOpen(false)} variant="warning" duration={0}>
          <p>Dismiss with × or leave it visible.</p>
        </Snackbar>
      </>
    );
  },
};
