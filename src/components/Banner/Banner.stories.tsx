import type { Meta, StoryObj } from '@storybook/react';
import { Banner } from './Banner';

const meta = {
  title: 'Artikit/Banner',
  component: Banner,
  tags: ['autodocs'],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Crimson: Story = {
  args: {
    children: "The Merchant's Missing Cargo",
    variant: 'crimson',
    size: 'lg',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Banner variant="crimson" size="md">
        Crimson ribbon
      </Banner>
      <Banner variant="azure" size="md">
        Azure ribbon
      </Banner>
      <Banner variant="parchment" size="md">
        Parchment ribbon
      </Banner>
      <Banner variant="dark" size="md">
        Dark ribbon
      </Banner>
    </div>
  ),
};
