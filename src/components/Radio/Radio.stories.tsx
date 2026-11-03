import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Artikit/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('day');
    return (
      <RadioGroup legend="Schedule" value={value} onChange={setValue}>
        <Radio value="day">Day</Radio>
        <Radio value="week">Week</Radio>
        <Radio value="month">Month</Radio>
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup legend="Alignment" defaultValue="left" orientation="horizontal">
      <Radio value="left">Left</Radio>
      <Radio value="center">Center</Radio>
      <Radio value="right">Right</Radio>
    </RadioGroup>
  ),
};
