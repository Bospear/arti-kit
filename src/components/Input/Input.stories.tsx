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

/** Native `<datalist>` — type or pick from the dropdown. */
export const WithSuggestions: Story = {
  render: () => (
    <Input
      id="story-ac"
      label="Location"
      placeholder="Search a town…"
      name="location"
      suggestions={['Brindleford', 'Thornwall', 'Ironpeak', 'Ravenmoor']}
    />
  ),
};

/** `autoComplete` hints for browsers / password managers (MDN: HTML autocomplete). */
export const BrowserAutocomplete: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input id="ac-name" label="Character name" name="name" autoComplete="name" />
      <Input id="ac-email" label="Email" name="email" type="email" autoComplete="email" />
      <Input
        id="ac-quest"
        label="Quest title"
        suggestions={[
          { value: 'lost-forge', label: 'The Lost Forge of Moradin' },
          { value: 'missing-cargo', label: "The Merchant's Missing Cargo" },
        ]}
      />
    </div>
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
