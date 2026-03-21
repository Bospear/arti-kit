import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Artikit/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Badge' } };

export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge>Default</Badge>
      <Badge variant="crimson">Crimson</Badge>
      <Badge variant="azure">Azure</Badge>
      <Badge variant="solid-crimson">Solid</Badge>
    </div>
  ),
};
