import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge/Badge';
import { DataTable } from './DataTable';

type PartyRow = {
  id: string;
  name: string;
  role: string;
  region: string;
  status: string;
};

const SAMPLE_ROWS: PartyRow[] = [
  { id: '1', name: 'Elena Brightquill', role: 'Cleric', region: 'Ironpeak', status: 'active' },
  { id: '2', name: 'Keth Stonejaw', role: 'Fighter', region: 'Thornwall', status: 'active' },
  { id: '3', name: 'Mireya Ashveil', role: 'Wizard', region: 'Brindleford', status: 'retired' },
  { id: '4', name: 'Brother Calder', role: 'Monk', region: 'Ravenmoor', status: 'active' },
  { id: '5', name: 'Sable Rook', role: 'Rogue', region: 'Whispering Bog', status: 'missing' },
  { id: '6', name: 'Thora Ironhair', role: 'Barbarian', region: 'Frosthollow', status: 'active' },
  { id: '7', name: 'Pip Cogsworth', role: 'Artificer', region: 'Brindleford', status: 'active' },
  { id: '8', name: 'Sister Morwen', role: 'Paladin', region: 'Ironpeak', status: 'active' },
  { id: '9', name: 'Dain Copperkettle', role: 'Bard', region: 'Thornwall', status: 'retired' },
  { id: '10', name: 'Yrsa Blacktide', role: 'Warlock', region: 'Ravenmoor', status: 'active' },
  { id: '11', name: 'Garrett Moss', role: 'Ranger', region: 'Whispering Bog', status: 'missing' },
  { id: '12', name: 'Iris Vale', role: 'Sorcerer', region: 'Frosthollow', status: 'active' },
];

const COLUMNS = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'region', header: 'Region' },
  {
    key: 'status',
    header: 'Status',
    align: 'center' as const,
    render: (row: PartyRow) => (
      <Badge
        variant={
          row.status === 'active' ? 'crimson' : row.status === 'missing' ? 'azure' : 'steel'
        }
      >
        {row.status}
      </Badge>
    ),
    getSearchText: (row: PartyRow) => String(row.status),
  },
];

const meta = {
  title: 'Artikit/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: COLUMNS,
    rows: SAMPLE_ROWS,
    filterId: 'story-table-filter',
    filterLabel: 'Filter party',
    filterPlaceholder: 'Search name, role, region, or status…',
  },
};

export const WithCaption: Story = {
  args: {
    ...Default.args,
    caption: 'Adventurers (demo)',
  },
};

export const DefaultSort: Story = {
  args: {
    ...Default.args,
    defaultSortKey: 'name',
    defaultSortDir: 'asc',
  },
};

export const Paginated: Story = {
  args: {
    ...Default.args,
    rows: SAMPLE_ROWS,
    pageSize: 3,
    paginationAriaLabel: 'Party roster pages',
  },
};
