import type { Meta, StoryObj } from '@storybook/react';
import { Icon, iconNames, type IconName } from './Icon';

const meta = {
  title: 'Artikit/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    name: 'campaign',
    size: 24,
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    name: 'bestiary',
    title: 'Bestiary',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#1F1D1C' }}>
      <Icon name="sword" size={16} title="16" />
      <Icon name="sword" size={20} title="20" />
      <Icon name="sword" size={24} title="24" />
      <Icon name="sword" size={32} title="32" />
      <Icon name="sword" size={48} title="48" />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
        gap: 12,
        color: '#1F1D1C',
      }}
    >
      {iconNames.map((name: IconName) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: 12,
            border: '1px solid #e8e4df',
            borderRadius: 8,
            fontFamily: 'system-ui, sans-serif',
            fontSize: 11,
          }}
        >
          <Icon name={name} size={24} />
          <span style={{ textAlign: 'center', wordBreak: 'break-word' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
