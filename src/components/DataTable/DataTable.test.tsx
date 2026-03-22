import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';

type Row = { id: string; name: string; role: string };

const ROWS: Row[] = [
  { id: 'a', name: 'Zara', role: 'Wizard' },
  { id: 'b', name: 'Aldric', role: 'Fighter' },
];

const COLS = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
];

describe('DataTable', () => {
  it('renders rows and filter label', () => {
    render(
      <DataTable<Row>
        columns={COLS}
        rows={ROWS}
        filterId="dt-test-filter"
        filterLabel="Search heroes"
      />
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByLabelText('Search heroes')).toBeInTheDocument();
    expect(screen.getByText('Zara')).toBeInTheDocument();
    expect(screen.getByText('Aldric')).toBeInTheDocument();
  });

  it('filters rows by search text', async () => {
    const user = userEvent.setup();
    render(
      <DataTable<Row>
        columns={COLS}
        rows={ROWS}
        filterId="dt-filter-2"
        filterLabel="Filter"
      />
    );

    const input = screen.getByLabelText('Filter');
    await user.type(input, 'Ald');

    const tbody = screen.getAllByRole('rowgroup')[1];
    expect(within(tbody).getByText('Aldric')).toBeInTheDocument();
    expect(within(tbody).queryByText('Zara')).not.toBeInTheDocument();
  });

  it('sorts by column when header button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DataTable<Row>
        columns={COLS}
        rows={ROWS}
        filterId="dt-sort"
        filterLabel="Filter"
      />
    );

    const nameSort = screen.getByRole('button', { name: /sort by name/i });
    await user.click(nameSort);

    const tbody = screen.getAllByRole('rowgroup')[1];
    const cells = within(tbody).getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('Aldric');
    expect(cells[2]).toHaveTextContent('Zara');
  });

  it('paginates rows when pageSize is set', async () => {
    const user = userEvent.setup();
    const many: Row[] = [
      { id: '1', name: 'Alpha', role: 'A' },
      { id: '2', name: 'Beta', role: 'B' },
      { id: '3', name: 'Gamma', role: 'C' },
      { id: '4', name: 'Delta', role: 'D' },
    ];
    render(
      <DataTable<Row>
        columns={COLS}
        rows={many}
        filterId="dt-page"
        filterLabel="Filter"
        pageSize={2}
      />
    );

    const tbody = screen.getAllByRole('rowgroup')[1];
    expect(within(tbody).getAllByRole('row')).toHaveLength(2);
    expect(within(tbody).getByText('Alpha')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /next page/i }));
    expect(within(tbody).getByText('Gamma')).toBeInTheDocument();
    expect(within(tbody).queryByText('Alpha')).not.toBeInTheDocument();
  });
});
