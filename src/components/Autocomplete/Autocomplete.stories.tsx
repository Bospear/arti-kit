import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Artikit/Autocomplete',
  component: Autocomplete,
  args: {
    id: 'demo-autocomplete',
    placeholder: 'Search…',
  },
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

const MATERIALS: AutocompleteOption[] = [
  { value: 'iron', label: 'Iron Ingot' },
  { value: 'steel', label: 'Steel Bar' },
  { value: 'mithril', label: 'Mithril Ore' },
  { value: 'adamantine', label: 'Adamantine Shard' },
  { value: 'leather', label: 'Tanned Leather' },
  { value: 'silk', label: 'Enchanted Silk' },
  { value: 'oak', label: 'Seasoned Oak' },
  { value: 'ruby', label: 'Ruby Gemstone' },
  { value: 'sapphire', label: 'Sapphire Gemstone' },
  { value: 'emerald', label: 'Emerald Gemstone' },
];

export const Default: Story = {
  args: {
    label: 'Material',
    options: MATERIALS,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Choose Material',
    placeholder: 'Type to filter…',
    options: MATERIALS,
  },
};

export const WithError: Story = {
  args: {
    label: 'Material',
    options: MATERIALS,
    error: 'A material must be selected',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Material',
    options: MATERIALS,
    disabled: true,
    value: 'Iron Ingot',
  },
};

export const EmptyState: Story = {
  args: {
    label: 'Material',
    options: [],
    emptyMessage: 'No materials in your inventory',
  },
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState<AutocompleteOption | null>(null);

    return (
      <div style={{ maxWidth: 320 }}>
        <Autocomplete
          id="controlled-autocomplete"
          label="Material"
          placeholder="Type to filter…"
          options={MATERIALS}
          value={value}
          onInputChange={setValue}
          onSelect={(opt) => {
            setValue(opt.label ?? opt.value);
            setSelected(opt);
          }}
        />
        {selected && (
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
            Selected: <strong>{selected.label ?? selected.value}</strong> ({selected.value})
          </p>
        )}
      </div>
    );
  },
};
