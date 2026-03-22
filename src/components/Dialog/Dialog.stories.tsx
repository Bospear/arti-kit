import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { Dialog, DialogActions } from './Dialog';

const meta = {
  title: 'Artikit/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    children: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundStory(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="primary" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog {...args} open={open} onClose={() => setOpen(false)} title={args.title ?? 'Dialog title'}>
          {args.children ?? (
            <p style={{ margin: 0 }}>
              Body content goes here. Escape, overlay click, or × closes the dialog.
            </p>
          )}
        </Dialog>
      </>
    );
  },
  args: {
    open: false,
    onClose: () => {},
    title: 'Dialog title',
    children: (
      <p style={{ margin: 0 }}>
        Body content goes here. Escape, overlay click, or × closes the dialog.
      </p>
    ),
  },
};

export const WithFooterActions: Story = {
  render: function FooterStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          Open confirm dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Abandon quest?"
          footer={
            <DialogActions>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={() => setOpen(false)}>
                Abandon
              </Button>
            </DialogActions>
          }
        >
          <p style={{ margin: 0, maxWidth: '28rem' }}>
            Progress on this quest will be lost for this session. This cannot be undone from the
            chronicle view.
          </p>
        </Dialog>
      </>
    );
  },
};

export const NoTitleAriaLabel: Story = {
  render: function NoTitleStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
          Dialog without title
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} aria-label="Settings quick view">
          <p style={{ margin: 0 }}>When there is no visible title, pass a concise aria-label.</p>
        </Dialog>
      </>
    );
  },
};
