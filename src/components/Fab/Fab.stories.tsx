import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FabSpeedDial, FAB_DEMO_ACTIONS } from './Fab';

const meta = {
  title: 'Artikit/FabSpeedDial',
  component: FabSpeedDial,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FabSpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

function Sandbox({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '14rem',
        border: '2px dashed var(--color-parchment-400)',
        borderRadius: '8px',
        background: 'var(--color-parchment-50)',
      }}
    >
      {children}
    </div>
  );
}

export const Static: Story = {
  render: () => {
    const [last, setLast] = useState<string | null>(null);
    return (
      <div>
        <Sandbox>
          <FabSpeedDial
            actions={FAB_DEMO_ACTIONS.map((a) => ({
              ...a,
              onClick: () => setLast(a.id),
            }))}
          />
        </Sandbox>
        <p style={{ marginTop: 12, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Last action: <strong>{last ?? '—'}</strong>
        </p>
      </div>
    );
  },
};

export const Fixed: Story = {
  render: () => (
    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
      A <code>fixed</code> FAB is rendered at the bottom-right of the viewport (open it in this
      story).
      <FabSpeedDial
        position="fixed"
        actions={FAB_DEMO_ACTIONS.map((a) => ({
          ...a,
          onClick: () => {},
        }))}
      />
    </p>
  ),
};
