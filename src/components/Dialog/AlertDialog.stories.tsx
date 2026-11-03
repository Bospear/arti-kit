import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { AlertDialog } from './AlertDialog';

const meta = {
  title: 'Artikit/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statuses: Story = {
  render: function StatusesStory() {
    const [status, setStatus] = useState<'success' | 'warning' | 'danger' | 'info' | null>(null);
    return (
      <>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button type="button" onClick={() => setStatus('info')}>
            Info
          </Button>
          <Button type="button" onClick={() => setStatus('success')}>
            Success
          </Button>
          <Button type="button" onClick={() => setStatus('warning')}>
            Warning
          </Button>
          <Button type="button" variant="danger" onClick={() => setStatus('danger')}>
            Danger
          </Button>
        </div>
        <AlertDialog
          open={status != null}
          onClose={() => setStatus(null)}
          status={status ?? 'info'}
        >
          <p style={{ margin: 0 }}>Status feedback for the selected tone.</p>
        </AlertDialog>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
  },
};
