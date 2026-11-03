import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Toast } from './Snackbar';
import { ToastRegion } from './ToastRegion';

const meta = {
  title: 'Artikit/ToastRegion',
  component: ToastRegion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ToastRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomRight: Story = {
  render: function RegionStory() {
    const [open, setOpen] = useState(false);
    return (
      <ToastRegion position="bottom-right">
        <Button type="button" onClick={() => setOpen(true)}>
          Show toast in region
        </Button>
        <Toast open={open} onClose={() => setOpen(false)} variant="success" duration={4000}>
          <p>Toast rendered inside ToastRegion.</p>
        </Toast>
      </ToastRegion>
    );
  },
};
