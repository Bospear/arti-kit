import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

const meta = {
  title: 'Artikit/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  render: function LeftStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open drawer
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Menu">
          <p style={{ margin: 0 }}>Drawer content (SidePanel composition).</p>
        </Drawer>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    children: null,
  },
};
