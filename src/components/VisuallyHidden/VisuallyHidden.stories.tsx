import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Artikit/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Screen-reader only label',
  },
  render: (args) => (
    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-primary)' }}>
      Visible text follows a hidden label:{' '}
      <VisuallyHidden {...args} />
      <span aria-hidden="true">(inspect a11y tree)</span>
    </p>
  ),
};
