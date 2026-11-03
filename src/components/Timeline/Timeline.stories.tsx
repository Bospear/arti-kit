import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta = {
  title: 'Artikit/Timeline',
  component: Timeline,
  tags: ['autodocs'],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Detailed: Story = {
  args: {
    density: 'detailed',
    items: [
      {
        id: '1',
        title: 'Session 12 — The Amber Temple',
        description: 'Party reaches the temple gates.',
        meta: '2 days ago',
      },
      {
        id: '2',
        title: 'Quest updated',
        description: 'Retrieve the skull of the forgotten one.',
        meta: 'Yesterday',
        marker: 'outline',
      },
      {
        id: '3',
        title: 'Character leveled up',
        meta: 'Today',
      },
    ],
  },
};
