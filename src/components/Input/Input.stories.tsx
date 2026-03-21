import type { Meta, StoryObj } from '@storybook/react';
import { Input, Select, Textarea } from './Input';

const meta = {
  title: 'Artikit/Input',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const TextField: Story = {
  render: () => (
    <Input id="story-input" label="Character name" placeholder="Enter a name…" />
  ),
};

export const WithError: Story = {
  render: () => (
    <Input
      id="story-err"
      label="Email"
      placeholder="invalid"
      error="This field is required."
    />
  ),
};

export const TextareaStory: Story = {
  render: () => (
    <Textarea id="story-ta" label="Session notes" placeholder="What happened?" rows={3} />
  ),
};

export const SelectStory: Story = {
  render: () => (
    <Select
      id="story-sel"
      label="Status"
      placeholder="Choose…"
      defaultValue=""
      options={[
        { value: 'a', label: 'Active' },
        { value: 'b', label: 'Done' },
      ]}
    />
  ),
};
