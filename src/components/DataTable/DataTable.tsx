import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Input } from '../Input/Input';
import { Pagination } from '../Pagination/Pagination';
import './DataTable.css';

export type DataTableSortType = 'auto' | 'string' | 'number';

export type DataTableColumn<TRow extends Record<string, unknown> = Record<string, unknown>> = {
  key: string;
  header: ReactNode;
  render?: (row: TRow) => ReactNode;
  align?: 'left' | 'center' | 'right';
  searchable?: boolean;
  getSearchText?: (row: TRow) => string;
  sortable?: boolean;
  sortValue?: (row: TRow) => unknown;
  sortType?: DataTableSortType;
};

export type DataTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> = {
  columns: DataTableColumn<TRow>[];
  rows: TRow[];
  /** Row property used for React keys (default `"id"`). */
  rowKey?: string;
  filterLabel?: string;
  filterPlaceholder?: string;
  filterId?: string;
  emptyMessage?: string;
  caption?: ReactNode;
  className?: string;
  defaultSortKey?: string | null;
  defaultSortDir?: 'asc' | 'desc';
  /** When set (greater than 0), slice rows per page and show `Pagination` under the table. */
  pageSize?: number | null;
  paginationAriaLabel?: string;
  paginationShowPageNumbers?: boolean;
  /** Neighbors on each side of current in the page strip (default 1 → three page buttons around current). */
  paginationNeighborCount?: number;
};

function getSortValue<TRow extends Record<string, unknown>>(
  row: TRow,
  col: DataTableColumn<TRow>
): unknown {
  if (typeof col.sortValue === 'function') {
    return col.sortValue(row);
  }
  if (col.key != null && row[col.key] !== undefined) {
    return row[col.key];
  }
  return '';
}

function compareValues(
  a: unknown,
  b: unknown,
  sortType: DataTableSortType = 'auto'
): number {
  if (sortType === 'number') {
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) {
      return na - nb;
    }
  }
  if (sortType === 'auto') {
    const na = Number(a);
    const nb = Number(b);
    if (
      a !== '' &&
      b !== '' &&
      a != null &&
      b != null &&
      !Number.isNaN(na) &&
      !Number.isNaN(nb) &&
      typeof a !== 'boolean' &&
      typeof b !== 'boolean'
    ) {
      return na - nb;
    }
  }
  const sa = a == null ? '' : String(a);
  const sb = b == null ? '' : String(b);
  return sa.localeCompare(sb, undefined, { sensitivity: 'base', numeric: true });
}

function isColumnSortable<TRow extends Record<string, unknown>>(
  col: DataTableColumn<TRow>
): boolean {
  if (col.sortable === false) return false;
  if (typeof col.sortValue === 'function') return true;
  if (col.key != null) return true;
  return false;
}

/**
 * Client-side filter + sort table matching Artificer UI styling (parchment header, sort chevrons).
 */
export function DataTable<TRow extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  rows,
  rowKey = 'id',
  filterLabel = 'Filter',
  filterPlaceholder = 'Search rows…',
  filterId = 'art-data-table-filter',
  emptyMessage = 'No rows match your filter.',
  caption,
  className = '',
  defaultSortKey = null,
  defaultSortDir = 'asc',
  pageSize: pageSizeProp = null,
  paginationAriaLabel = 'Table pagination',
  paginationShowPageNumbers = true,
  paginationNeighborCount = 1,
}: DataTableProps<TRow>) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey ?? null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(
    defaultSortKey ? defaultSortDir : null
  );
  const [page, setPage] = useState(1);

  const pageSize =
    typeof pageSizeProp === 'number' && pageSizeProp > 0 ? Math.floor(pageSizeProp) : null;

  const needle = query.trim().toLowerCase();

  const filteredRows = useMemo(() => {
    if (!needle) return rows;
    return rows.filter((row) =>
      columns.some((col) => {
        if (col.searchable === false) return false;
        let text = '';
        if (typeof col.getSearchText === 'function') {
          text = col.getSearchText(row) ?? '';
        } else if (col.key != null && row[col.key] != null) {
          text = String(row[col.key]);
        }
        return text.toLowerCase().includes(needle);
      })
    );
  }, [rows, columns, needle]);

  const displayedRows = useMemo(() => {
    if (!sortKey || !sortDir) return filteredRows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !isColumnSortable(col)) return filteredRows;

    const type = col.sortType ?? 'auto';
    const sorted = [...filteredRows].sort((rowA, rowB) => {
      const va = getSortValue(rowA, col);
      const vb = getSortValue(rowB, col);
      const c = compareValues(va, vb, type);
      return sortDir === 'asc' ? c : -c;
    });
    return sorted;
  }, [filteredRows, columns, sortKey, sortDir]);

  const totalPages =
    !pageSize || displayedRows.length === 0
      ? 1
      : Math.max(1, Math.ceil(displayedRows.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [needle, rows.length]);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const currentPage = Math.min(Math.max(1, page), totalPages);

  const visibleRows = useMemo(() => {
    if (!pageSize || displayedRows.length === 0) return displayedRows;
    const start = (currentPage - 1) * pageSize;
    return displayedRows.slice(start, start + pageSize);
  }, [displayedRows, pageSize, currentPage]);

  function handleSortClick(col: DataTableColumn<TRow>) {
    if (!isColumnSortable(col)) return;
    const key = col.key;
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
      return;
    }
    if (sortDir === 'asc') {
      setSortDir('desc');
      return;
    }
    if (sortDir === 'desc') {
      setSortKey(null);
      setSortDir(null);
      return;
    }
    setSortDir('asc');
  }

  function ariaSortFor(col: DataTableColumn<TRow>): 'ascending' | 'descending' | undefined {
    if (!isColumnSortable(col) || sortKey !== col.key || !sortDir) {
      return undefined;
    }
    return sortDir === 'asc' ? 'ascending' : 'descending';
  }

  const wrapClass = ['art-data-table-wrap', className].filter(Boolean).join(' ');

  const tableElement = (
    <table className="art-data-table">
      {caption != null && <caption className="art-data-table__caption">{caption}</caption>}
      <thead>
        <tr>
          {columns.map((col) => {
            const sortable = isColumnSortable(col);
            const active = sortKey === col.key && sortDir;
            const thClass = [
              'art-data-table__th',
              col.align === 'right' && 'art-data-table__th--right',
              col.align === 'center' && 'art-data-table__th--center',
              sortable && 'art-data-table__th--sortable',
              active && sortDir === 'asc' && 'art-data-table__th--sorted-asc',
              active && sortDir === 'desc' && 'art-data-table__th--sorted-desc',
            ]
              .filter(Boolean)
              .join(' ');

            const headerLabel = typeof col.header === 'string' ? col.header : String(col.key);

            return (
              <th key={col.key} scope="col" className={thClass} aria-sort={ariaSortFor(col)}>
                {sortable ? (
                  <button
                    type="button"
                    className={[
                      'art-data-table__sort-btn',
                      col.align === 'right' && 'art-data-table__sort-btn--right',
                      col.align === 'center' && 'art-data-table__sort-btn--center',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSortClick(col)}
                    aria-label={`Sort by ${headerLabel}${
                      active ? `, ${sortDir === 'asc' ? 'ascending' : 'descending'}` : ''
                    }`}
                  >
                    <span className="art-data-table__sort-btn-text">{col.header}</span>
                    <span className="art-data-table__sort-icons" aria-hidden="true">
                      <span
                        className={[
                          'art-data-table__sort-chevron',
                          'art-data-table__sort-chevron--up',
                          active && sortDir === 'asc' ? 'art-data-table__sort-chevron--active' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                      <span
                        className={[
                          'art-data-table__sort-chevron',
                          'art-data-table__sort-chevron--down',
                          active && sortDir === 'desc' ? 'art-data-table__sort-chevron--active' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      />
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {displayedRows.length === 0 ? (
          <tr>
            <td className="art-data-table__empty" colSpan={columns.length}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          visibleRows.map((row, index) => {
            const rawKey = row[rowKey];
            const rk = rawKey !== undefined && rawKey !== null ? rawKey : index;
            return (
              <tr key={String(rk)} className="art-data-table__tr">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      'art-data-table__td',
                      col.align === 'right' && 'art-data-table__td--right',
                      col.align === 'center' && 'art-data-table__td--center',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );

  return (
    <div className={wrapClass}>
      <div className="art-data-table__toolbar">
        <Input
          id={filterId}
          label={filterLabel}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={filterPlaceholder}
          autoComplete="off"
          className="art-data-table__filter"
        />
        <p className="art-data-table__count" aria-live="polite">
          {pageSize && displayedRows.length > 0 ? (
            <>
              Showing{' '}
              <strong>
                {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, displayedRows.length)}
              </strong>
              <span className="art-data-table__count-sep"> of </span>
              <strong>{displayedRows.length}</strong>
              <span className="art-data-table__count-sep"> filtered · </span>
              {rows.length} total
            </>
          ) : (
            <>
              <strong>{displayedRows.length}</strong>
              <span className="art-data-table__count-sep"> / </span>
              {rows.length} rows
            </>
          )}
        </p>
      </div>

      {pageSize ? (
        <div className="art-data-table__shell art-data-table__shell--paginated">
          <div className="art-data-table__scroll">{tableElement}</div>
          {displayedRows.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              ariaLabel={paginationAriaLabel}
              showPageNumbers={paginationShowPageNumbers}
              neighborCount={paginationNeighborCount}
            />
          )}
        </div>
      ) : (
        <div className="art-data-table__scroll">{tableElement}</div>
      )}
    </div>
  );
}
