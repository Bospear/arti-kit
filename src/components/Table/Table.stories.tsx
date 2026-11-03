import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../Button/IconButton';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { SearchInput } from '../Input/Input';
import { Tag } from '../Tag/Tag';
import { EmptyState } from '../EmptyState/EmptyState';
import {
  Table,
  TableActionsCell,
  TableAvatarCell,
  TableBodyRow,
  TableBulkActionToolbar,
  TableDataCell,
  TableFilterToolbar,
  TableHeaderCell,
  TableHeaderRow,
  TablePaginationBar,
  TableStatusCell,
  TableTagCell,
  type TableSortDirection,
} from './Table';

const meta = {
  title: 'Artikit/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

function ColumnsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M11.5 2.5l2 2L5 13H3v-2l8.5-8.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3.5" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="12.5" cy="8" r="1.25" fill="currentColor" />
    </svg>
  );
}

export const HeaderCells: Story = {
  render: () => (
    <Table
      density="comfortable"
      skeletonColumns={4}
      head={
        <TableHeaderRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell sortable sort="asc">
            Level
          </TableHeaderCell>
          <TableHeaderCell sortable sort="desc" align="right">
            XP
          </TableHeaderCell>
          <TableHeaderCell sortable sort="none" align="center">
            Status
          </TableHeaderCell>
        </TableHeaderRow>
      }
    >
      <TableBodyRow>
        <TableDataCell>Aria Stormwind</TableDataCell>
        <TableDataCell>12</TableDataCell>
        <TableDataCell align="right">48,200</TableDataCell>
        <TableStatusCell status="success">Active</TableStatusCell>
      </TableBodyRow>
    </Table>
  ),
};

export const CellVariants: Story = {
  render: () => (
    <Table
      density="comfortable"
      skeletonColumns={5}
      head={
        <TableHeaderRow>
          <TableHeaderCell>Hero</TableHeaderCell>
          <TableHeaderCell>Role</TableHeaderCell>
          <TableHeaderCell>Tags</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell align="right">Actions</TableHeaderCell>
        </TableHeaderRow>
      }
    >
      <TableBodyRow>
        <TableAvatarCell label="Kael Brightforge">KB</TableAvatarCell>
        <TableDataCell>Paladin</TableDataCell>
        <TableTagCell>
          <Tag tone="azure">Tank</Tag>
          <Tag tone="gold">Leader</Tag>
        </TableTagCell>
        <TableStatusCell status="success">Ready</TableStatusCell>
        <TableActionsCell>
          <IconButton aria-label="Edit" icon={<EditIcon />} variant="ghost" size="sm" />
          <IconButton aria-label="More" icon={<MoreIcon />} variant="ghost" size="sm" />
        </TableActionsCell>
      </TableBodyRow>
      <TableBodyRow>
        <TableAvatarCell label="Nyx Shadowstep">NS</TableAvatarCell>
        <TableDataCell>Rogue</TableDataCell>
        <TableTagCell>
          <Tag tone="crimson">DPS</Tag>
        </TableTagCell>
        <TableStatusCell status="warning">Injured</TableStatusCell>
        <TableActionsCell>
          <IconButton aria-label="Edit" icon={<EditIcon />} variant="ghost" size="sm" />
          <IconButton aria-label="More" icon={<MoreIcon />} variant="ghost" size="sm" />
        </TableActionsCell>
      </TableBodyRow>
      <TableBodyRow disabled>
        <TableAvatarCell label="Old Scout">OS</TableAvatarCell>
        <TableDataCell>Ranger</TableDataCell>
        <TableTagCell>
          <Tag tone="neutral">Retired</Tag>
        </TableTagCell>
        <TableStatusCell status="info">Away</TableStatusCell>
        <TableActionsCell>
          <IconButton aria-label="Edit" icon={<EditIcon />} variant="ghost" size="sm" disabled />
        </TableActionsCell>
      </TableBodyRow>
    </Table>
  ),
};

export const RowStates: Story = {
  render: () => (
    <Table
      density="compact"
      skeletonColumns={2}
      head={
        <TableHeaderRow density="compact">
          <TableHeaderCell density="compact">State</TableHeaderCell>
          <TableHeaderCell density="compact">Note</TableHeaderCell>
        </TableHeaderRow>
      }
    >
      <TableBodyRow density="compact">
        <TableDataCell density="compact">Default</TableDataCell>
        <TableDataCell density="compact">Hover via CSS</TableDataCell>
      </TableBodyRow>
      <TableBodyRow density="compact" selected>
        <TableDataCell density="compact">Selected</TableDataCell>
        <TableDataCell density="compact">aria-selected</TableDataCell>
      </TableBodyRow>
      <TableBodyRow density="compact" expanded>
        <TableDataCell density="compact">Expanded</TableDataCell>
        <TableDataCell density="compact">aria-expanded</TableDataCell>
      </TableBodyRow>
      <TableBodyRow density="compact" disabled>
        <TableDataCell density="compact">Disabled</TableDataCell>
        <TableDataCell density="compact">Non-interactive</TableDataCell>
      </TableBodyRow>
    </Table>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    stickyHeader: true,
    skeletonRows: 4,
    skeletonColumns: 3,
    head: (
      <TableHeaderRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Class</TableHeaderCell>
        <TableHeaderCell>Level</TableHeaderCell>
      </TableHeaderRow>
    ),
  },
};

export const Empty: Story = {
  args: {
    skeletonColumns: 3,
    empty: (
      <EmptyState
        title="No heroes found"
        description="Adjust filters or recruit a new companion."
      />
    ),
    head: (
      <TableHeaderRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Class</TableHeaderCell>
        <TableHeaderCell>Level</TableHeaderCell>
      </TableHeaderRow>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    skeletonColumns: 3,
    error: <EmptyState title="Could not load roster" description="Check your connection and try again." />,
    head: (
      <TableHeaderRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Class</TableHeaderCell>
        <TableHeaderCell>Level</TableHeaderCell>
      </TableHeaderRow>
    ),
  },
};

function ComposedExample() {
  const [sort, setSort] = useState<TableSortDirection>('asc');
  const [selected, setSelected] = useState<string[]>(['2']);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');

  const rows = [
    { id: '1', name: 'Aria Stormwind', role: 'Wizard', status: 'success' as const, tags: ['Caster'] },
    { id: '2', name: 'Kael Brightforge', role: 'Paladin', status: 'success' as const, tags: ['Tank', 'Leader'] },
    { id: '3', name: 'Nyx Shadowstep', role: 'Rogue', status: 'warning' as const, tags: ['DPS'] },
    { id: '4', name: 'Bram Ironhide', role: 'Fighter', status: 'danger' as const, tags: ['Frontline'] },
  ];

  const filtered = rows.filter((row) =>
    `${row.name} ${row.role}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  function toggleSort() {
    setSort((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? 'none' : 'asc'));
  }

  function toggleRow(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.includes(r.id));

  return (
    <div>
      <TableFilterToolbar
        search={
          <SearchInput
            id="table-story-search"
            label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search heroes…"
          />
        }
        filters={
          <>
            <Tag tone="azure">Party</Tag>
            <Tag tone="neutral" onRemove={() => undefined}>
              Level 10+
            </Tag>
          </>
        }
        actions={
          <IconButton
            aria-label="Column visibility"
            icon={<ColumnsIcon />}
            variant="outline"
            size="sm"
          />
        }
      />

      <TableBulkActionToolbar
        selectionCount={selected.length}
        onClear={() => setSelected([])}
      >
        <Button type="button" variant="outline" size="sm">
          Assign quest
        </Button>
        <Button type="button" variant="danger" size="sm">
          Remove
        </Button>
      </TableBulkActionToolbar>

      <Table
        stickyHeader
        density="comfortable"
        skeletonColumns={5}
        caption="Party roster"
        head={
          <TableHeaderRow
            checkbox={
              <Checkbox
                id="table-select-all"
                aria-label="Select all rows"
                checked={allChecked}
                onChange={() => {
                  if (allChecked) setSelected((prev) => prev.filter((id) => !filtered.some((r) => r.id === id)));
                  else setSelected((prev) => Array.from(new Set([...prev, ...filtered.map((r) => r.id)])));
                }}
              />
            }
          >
            <TableHeaderCell sortable sort={sort} onSortClick={toggleSort}>
              Name
            </TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Tags</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell align="right">Actions</TableHeaderCell>
          </TableHeaderRow>
        }
        empty={
          filtered.length === 0 ? (
            <EmptyState title="No matching heroes" description="Try a different search." />
          ) : undefined
        }
      >
        {filtered.map((row) => (
          <TableBodyRow
            key={row.id}
            selected={selected.includes(row.id)}
            checkbox={
              <Checkbox
                id={`table-row-${row.id}`}
                aria-label={`Select ${row.name}`}
                checked={selected.includes(row.id)}
                onChange={() => toggleRow(row.id)}
              />
            }
          >
            <TableAvatarCell label={row.name}>
              {row.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </TableAvatarCell>
            <TableDataCell>{row.role}</TableDataCell>
            <TableTagCell>
              {row.tags.map((tag) => (
                <Tag key={tag} tone="neutral">
                  {tag}
                </Tag>
              ))}
            </TableTagCell>
            <TableStatusCell status={row.status}>
              {row.status === 'success'
                ? 'Ready'
                : row.status === 'warning'
                  ? 'Injured'
                  : 'Down'}
            </TableStatusCell>
            <TableActionsCell>
              <IconButton aria-label={`Edit ${row.name}`} icon={<EditIcon />} variant="ghost" size="sm" />
              <IconButton aria-label={`More for ${row.name}`} icon={<MoreIcon />} variant="ghost" size="sm" />
            </TableActionsCell>
          </TableBodyRow>
        ))}
      </Table>

      <TablePaginationBar
        page={page}
        totalPages={3}
        onPageChange={setPage}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 25]}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        ariaLabel="Roster pagination"
      />
    </div>
  );
}

export const Composed: Story = {
  render: () => <ComposedExample />,
};
