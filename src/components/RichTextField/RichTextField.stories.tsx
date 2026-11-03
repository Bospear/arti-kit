import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { RichTextField } from './RichTextField';

const toolbar = (
  <>
    <Button
      type="button"
      size="sm"
      variant="ghost"
      aria-label="Bold"
      onClick={() => document.execCommand('bold')}
    >
      B
    </Button>
    <Button
      type="button"
      size="sm"
      variant="ghost"
      aria-label="Italic"
      onClick={() => document.execCommand('italic')}
    >
      I
    </Button>
  </>
);

const meta = {
  title: 'Artikit/RichTextField',
  component: RichTextField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    id: 'notes',
    label: 'Notes',
    placeholder: 'Write something…',
    helperText: 'Supports basic formatting via the toolbar.',
    toolbar,
  },
} satisfies Meta<typeof RichTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: 'Description is required.',
    helperText: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '<p>Read-only content</p>',
  },
};
