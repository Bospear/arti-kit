import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { FormDialog } from './FormDialog';

const meta = {
  title: 'Artikit/FormDialog',
  component: FormDialog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open form
        </Button>
        <FormDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setError(undefined);
          }}
          title="Create project"
          loading={loading}
          error={error}
          onSubmit={() => {
            setLoading(true);
            setError(undefined);
            window.setTimeout(() => {
              setLoading(false);
              setError('Name is required.');
            }, 600);
          }}
        >
          <Input id="project-name" label="Name" placeholder="My project" />
        </FormDialog>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    onSubmit: () => {},
  },
};
