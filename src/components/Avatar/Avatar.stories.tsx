import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Tag, StatusBadge } from '../Tag/Tag';

const meta = {
  title: 'Artikit/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: { children: 'AZ', size: 'md' },
};

export const WithTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar size="lg">AZ</Avatar>
      <Tag tone="neutral">Session</Tag>
      <StatusBadge status="current">Now</StatusBadge>
    </div>
  ),
};
