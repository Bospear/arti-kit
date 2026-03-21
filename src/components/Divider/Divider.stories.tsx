import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Artikit/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const Labeled: Story = { args: { label: 'Chapter II' } };

export const Variants: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Divider variant="default" />
      <Divider variant="crimson" label="Crimson" />
      <Divider variant="ornate" />
    </div>
  ),
};
