import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { DialogActions } from './Dialog';
import { FullscreenModal } from './FullscreenModal';

const meta = {
  title: 'Artikit/FullscreenModal',
  component: FullscreenModal,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FullscreenModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Open fullscreen
        </Button>
        <FullscreenModal
          open={open}
          onClose={() => setOpen(false)}
          title="Fullscreen editor"
          footer={
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button type="button" variant="primary" onClick={() => setOpen(false)}>
                Save
              </Button>
            </DialogActions>
          }
        >
          <p style={{ margin: 0 }}>Viewport-filling modal body.</p>
        </FullscreenModal>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    children: null,
  },
};
