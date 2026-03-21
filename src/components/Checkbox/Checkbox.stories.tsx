import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CheckState } from './Checkbox';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Artikit/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Binary: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox id="c1">Unchecked</Checkbox>
      <Checkbox id="c2" defaultChecked>
        Checked
      </Checkbox>
    </div>
  ),
};

export const Triple: Story = {
  render: function TripleStory() {
    const [state, setState] = useState<CheckState>('doubleChecked');
    return (
      <Checkbox id="c3" triple checkState={state} onCheckStateChange={setState}>
        Triple state ({state})
      </Checkbox>
    );
  },
};
