import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Artikit/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: function S() {
    const [on, setOn] = useState(false);
    return <Switch id="sw1" label="Torch lit" checked={on} onChange={setOn} />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Switch id="d1" label="Off" disabled defaultChecked={false} />
      <Switch id="d2" label="On" disabled defaultChecked />
    </div>
  ),
};
