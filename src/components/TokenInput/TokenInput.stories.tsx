import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TokenInput } from './TokenInput';

const meta = {
  title: 'Artikit/TokenInput',
  component: TokenInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TokenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function PlaygroundStory() {
    const [tokens, setTokens] = useState(['ranger', 'wizard']);
    return (
      <TokenInput
        id="token-demo"
        label="Roles"
        value={tokens}
        onChange={setTokens}
        helperText="Press Enter or comma to add"
        placeholder="Add role…"
      />
    );
  },
};

export const WithError: Story = {
  args: {
    id: 'token-error',
    label: 'Tags',
    defaultValue: ['draft'],
    error: 'At least two tags are required',
  },
};
