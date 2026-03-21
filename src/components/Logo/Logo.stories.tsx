import type { Meta, StoryObj } from '@storybook/react';
import { Logo, LOGO_SRC } from './Logo';

const meta = {
  title: 'Artikit/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    alt: 'Artificer Tools',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
      <Logo size="sm" alt="Small" />
      <Logo size="md" alt="Medium" />
      <Logo size="lg" alt="Large" />
      <Logo size="xl" alt="Extra large" />
    </div>
  ),
};

export const CustomSrc: Story = {
  args: {
    size: 'md',
    alt: 'Custom URL example',
    src: 'https://via.placeholder.com/200x120.png?text=Logo',
  },
};

export const AssetUrl: Story = {
  name: 'LOGO_SRC (for reference)',
  render: () => (
    <p style={{ fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>
      <code>LOGO_SRC</code> = {LOGO_SRC.slice(0, 48)}…
    </p>
  ),
};
