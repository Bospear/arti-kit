import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { SplitButton } from './SplitButton';
import { ButtonStatus } from './ButtonStatus';

const DemoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5.5v5M5.5 8h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'Artikit/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'accent',
        'ghost',
        'outline',
        'danger',
        'submit',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Primary', variant: 'primary', icon: <DemoIcon /> },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary', icon: <DemoIcon /> },
};

export const Tertiary: Story = {
  args: { children: 'Tertiary', variant: 'tertiary', icon: <DemoIcon /> },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost', icon: <DemoIcon /> },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline', icon: <DemoIcon /> },
};

export const FigmaMatrix: Story = {
  name: 'Figma matrix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Default / Medium
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Button variant="primary" icon={<DemoIcon />}>
            Primary
          </Button>
          <Button variant="secondary" icon={<DemoIcon />}>
            Secondary
          </Button>
          <Button variant="tertiary" icon={<DemoIcon />}>
            Tertiary
          </Button>
          <Button variant="ghost" icon={<DemoIcon />}>
            Ghost
          </Button>
          <Button variant="outline" icon={<DemoIcon />}>
            Outline
          </Button>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Primary states
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Button variant="primary" icon={<DemoIcon />}>
            Default
          </Button>
          <Button variant="primary" icon={<DemoIcon />} disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Loading
          </Button>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Sizes
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <Button variant="primary" size="sm" icon={<DemoIcon />}>
            Small
          </Button>
          <Button variant="primary" size="md" icon={<DemoIcon />}>
            Medium
          </Button>
          <Button variant="primary" size="lg" icon={<DemoIcon />}>
            Large
          </Button>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Button Status
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <ButtonStatus tone="danger" icon={<DemoIcon />}>
            Destructive
          </ButtonStatus>
          <ButtonStatus tone="success" icon={<DemoIcon />}>
            Success
          </ButtonStatus>
          <ButtonStatus tone="warning" icon={<DemoIcon />}>
            Warning
          </ButtonStatus>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Icon / Split
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <IconButton aria-label="Primary icon" icon={<DemoIcon />} />
          <IconButton aria-label="Secondary icon" icon={<DemoIcon />} variant="secondary" />
          <IconButton aria-label="Danger icon" icon={<DemoIcon />} variant="danger" />
          <SplitButton
            label="Actions"
            icon={<DemoIcon />}
            onClick={() => undefined}
            actions={[
              { id: 'a', label: 'Create campaign' },
              { id: 'b', label: 'Import' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};
