import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Artikit/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'outline', 'danger', 'submit'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Primary', variant: 'primary' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Submit: Story = {
  args: { children: 'Submit', variant: 'submit' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="submit">Submit</Button>
    </div>
  ),
};

export const SubmitForm: Story = {
  name: 'Submit in form',
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}
    >
      <input
        type="text"
        placeholder="Enter your quest name…"
        className="art-input"
        style={{ width: '100%' }}
      />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="ghost" type="reset">Reset</Button>
        <Button variant="submit">Submit quest</Button>
      </div>
    </form>
  ),
};
