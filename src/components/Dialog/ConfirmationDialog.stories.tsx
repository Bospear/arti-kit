import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { ConfirmationDialog } from './ConfirmationDialog';

const meta = {
  title: 'Artikit/ConfirmationDialog',
  component: ConfirmationDialog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Confirm action
        </Button>
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Save changes?"
        >
          <p style={{ margin: 0 }}>Unsaved edits will be written to your chronicle.</p>
        </ConfirmationDialog>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    onConfirm: () => {},
  },
};

export const Destructive: Story = {
  render: function DestructiveStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="danger" onClick={() => setOpen(true)}>
          Delete
        </Button>
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          tone="destructive"
          title="Delete quest?"
          confirmLabel="Delete"
        >
          <p style={{ margin: 0 }}>This cannot be undone.</p>
        </ConfirmationDialog>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    onConfirm: () => {},
  },
};
