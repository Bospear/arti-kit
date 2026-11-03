import {
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Select } from '../Input/Input';
import { Pagination, type PaginationProps } from '../Pagination/Pagination';
import { Skeleton } from '../Skeleton/Skeleton';
import { StatusBadge, type StatusBadgeStatus } from '../Tag/Tag';
import './Table.css';

export type TableSortDirection = 'none' | 'asc' | 'desc';
export type TableAlign = 'left' | 'center' | 'right';
export type TableDensity = 'compact' | 'comfortable';
export type TableRowState = 'default' | 'selected' | 'disabled' | 'expanded';
export type TableStatus = Extract<StatusBadgeStatus, 'success' | 'warning' | 'danger' | 'info'>;

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

function densityClass(density?: TableDensity): string | undefined {
  return density ? `art-table--density-${density}` : undefined;
}

function alignClass(prefix: string, align?: TableAlign): string | undefined {
  return align && align !== 'left' ? `${prefix}--${align}` : undefined;
}

function ariaSortValue(
  sortable: boolean | undefined,
  sort: TableSortDirection
): 'none' | 'ascending' | 'descending' | undefined {
  if (!sortable) return undefined;
  if (sort === 'asc') return 'ascending';
  if (sort === 'desc') return 'descending';
  return 'none';
}

/* ── TableHeaderCell ── */

export type TableHeaderCellProps = Omit<ThHTMLAttributes<HTMLTableCellElement>, 'children'> & {
  children?: ReactNode;
  /** Alias for children when you prefer an explicit label prop. */
  label?: ReactNode;
  sort?: TableSortDirection;
  align?: TableAlign;
  density?: TableDensity;
  sortable?: boolean;
  onSortClick?: () => void;
};

export function TableHeaderCell({
  children,
  label,
  sort = 'none',
  align = 'left',
  density = 'comfortable',
  sortable = false,
  onSortClick,
  className = '',
  scope = 'col',
  ...props
}: TableHeaderCellProps) {
  const content = children ?? label;
  const sorted = sort === 'asc' || sort === 'desc';

  const thClass = cx(
    'art-table__th',
    alignClass('art-table__th', align),
    densityClass(density),
    sortable && 'art-table__th--sortable',
    sorted && `art-table__th--sorted-${sort}`,
    className
  );

  if (sortable) {
    return (
      <th
        className={thClass}
        scope={scope}
        aria-sort={ariaSortValue(true, sort)}
        {...props}
      >
        <button
          type="button"
          className={cx(
            'art-table__sort-btn',
            alignClass('art-table__sort-btn', align)
          )}
          onClick={onSortClick}
        >
          <span className="art-table__sort-btn-text">{content}</span>
          <span className="art-table__sort-icons" aria-hidden="true">
            <span
              className={cx(
                'art-table__sort-chevron',
                'art-table__sort-chevron--up',
                sort === 'asc' && 'art-table__sort-chevron--active'
              )}
            />
            <span
              className={cx(
                'art-table__sort-chevron',
                'art-table__sort-chevron--down',
                sort === 'desc' && 'art-table__sort-chevron--active'
              )}
            />
          </span>
        </button>
      </th>
    );
  }

  return (
    <th className={thClass} scope={scope} {...props}>
      {content}
    </th>
  );
}

/* ── TableDataCell ── */

export type TableDataCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  align?: TableAlign;
  density?: TableDensity;
};

export function TableDataCell({
  children,
  align = 'left',
  density = 'comfortable',
  className = '',
  ...props
}: TableDataCellProps) {
  return (
    <td
      className={cx(
        'art-table__td',
        alignClass('art-table__td', align),
        densityClass(density),
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

/* ── TableStatusCell ── */

export type TableStatusCellProps = Omit<TdHTMLAttributes<HTMLTableCellElement>, 'children'> & {
  status: TableStatus;
  density?: TableDensity;
  children: ReactNode;
  showDot?: boolean;
};

export function TableStatusCell({
  status,
  density = 'comfortable',
  children,
  showDot = true,
  className = '',
  ...props
}: TableStatusCellProps) {
  return (
    <td className={cx('art-table__td', 'art-table__td--status', densityClass(density), className)} {...props}>
      <StatusBadge status={status} showDot={showDot}>
        {children}
      </StatusBadge>
    </td>
  );
}

/* ── TableTagCell ── */

export type TableTagCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  density?: TableDensity;
};

export function TableTagCell({
  children,
  density = 'comfortable',
  className = '',
  ...props
}: TableTagCellProps) {
  return (
    <td className={cx('art-table__td', 'art-table__td--tags', densityClass(density), className)} {...props}>
      <div className="art-table__tags">{children}</div>
    </td>
  );
}

/* ── TableAvatarCell ── */

export type TableAvatarCellProps = Omit<TdHTMLAttributes<HTMLTableCellElement>, 'children'> & {
  density?: TableDensity;
  /** Optional text beside the avatar. */
  label?: ReactNode;
  src?: string;
  alt?: string;
  /** Initials / fallback passed to Avatar when no `avatar` slot. */
  children?: ReactNode;
  size?: AvatarProps['size'];
  /** Full Avatar override; when set, src/alt/children/size are ignored. */
  avatar?: ReactNode;
};

export function TableAvatarCell({
  density = 'comfortable',
  label,
  src,
  alt,
  children,
  size = 'sm',
  avatar,
  className = '',
  ...props
}: TableAvatarCellProps) {
  return (
    <td className={cx('art-table__td', 'art-table__td--avatar', densityClass(density), className)} {...props}>
      <div className="art-table__avatar">
        {avatar ?? (
          <Avatar src={src} alt={alt} size={size}>
            {children}
          </Avatar>
        )}
        {label != null && label !== '' && <span className="art-table__avatar-label">{label}</span>}
      </div>
    </td>
  );
}

/* ── TableActionsCell ── */

export type TableActionsCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
  density?: TableDensity;
};

export function TableActionsCell({
  children,
  density = 'comfortable',
  className = '',
  ...props
}: TableActionsCellProps) {
  return (
    <td className={cx('art-table__td', 'art-table__td--actions', densityClass(density), className)} {...props}>
      <div className="art-table__actions">{children}</div>
    </td>
  );
}

/* ── TableBodyRow ── */

export type TableBodyRowProps = HTMLAttributes<HTMLTableRowElement> & {
  /** Visual state; also derived from selected / disabled / expanded when omitted. */
  state?: TableRowState;
  density?: TableDensity;
  selected?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  /** Optional selectable checkbox rendered as the first cell. */
  checkbox?: ReactNode;
};

function resolveRowState(
  state: TableRowState | undefined,
  selected: boolean,
  disabled: boolean,
  expanded: boolean
): TableRowState {
  if (state && state !== 'default') return state;
  if (disabled) return 'disabled';
  if (selected) return 'selected';
  if (expanded) return 'expanded';
  return state ?? 'default';
}

export function TableBodyRow({
  state,
  density = 'comfortable',
  selected = false,
  disabled = false,
  expanded = false,
  checkbox,
  onClick,
  className = '',
  children,
  ...props
}: TableBodyRowProps) {
  const resolved = resolveRowState(state, selected, disabled, expanded);
  const interactive = typeof onClick === 'function' && !disabled;

  return (
    <tr
      className={cx(
        'art-table__tr',
        `art-table__tr--${resolved}`,
        densityClass(density),
        interactive && 'art-table__tr--interactive',
        className
      )}
      aria-selected={selected || resolved === 'selected' ? true : undefined}
      aria-disabled={disabled || resolved === 'disabled' ? true : undefined}
      aria-expanded={expanded || resolved === 'expanded' ? true : undefined}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {checkbox != null && (
        <td className={cx('art-table__td', 'art-table__td--checkbox', densityClass(density))}>
          <div className="art-table__checkbox">{checkbox}</div>
        </td>
      )}
      {children}
    </tr>
  );
}

/* ── TableHeaderRow ── */

export type TableHeaderRowProps = HTMLAttributes<HTMLTableRowElement> & {
  density?: TableDensity;
  /** Optional select-all checkbox as the first header cell. */
  checkbox?: ReactNode;
};

export function TableHeaderRow({
  density = 'comfortable',
  checkbox,
  className = '',
  children,
  ...props
}: TableHeaderRowProps) {
  return (
    <tr className={cx('art-table__tr', 'art-table__tr--header', densityClass(density), className)} {...props}>
      {checkbox != null && (
        <th className={cx('art-table__th', 'art-table__th--checkbox', densityClass(density))} scope="col">
          <div className="art-table__checkbox">{checkbox}</div>
        </th>
      )}
      {children}
    </tr>
  );
}

/* ── TableFilterToolbar ── */

export type TableFilterToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /** Search input slot. */
  search?: ReactNode;
  /** Filter chips / TagSelector slot. */
  filters?: ReactNode;
  /** Actions slot (e.g. column visibility IconButton). */
  actions?: ReactNode;
};

export function TableFilterToolbar({
  search,
  filters,
  actions,
  className = '',
  children,
  ...props
}: TableFilterToolbarProps) {
  return (
    <div className={cx('art-table-filter-toolbar', className)} {...props}>
      {search != null && <div className="art-table-filter-toolbar__search">{search}</div>}
      {filters != null && <div className="art-table-filter-toolbar__filters">{filters}</div>}
      {children}
      {actions != null && <div className="art-table-filter-toolbar__actions">{actions}</div>}
    </div>
  );
}

/* ── TableBulkActionToolbar ── */

export type TableBulkActionToolbarProps = HTMLAttributes<HTMLDivElement> & {
  selectionCount: number;
  /** Action buttons / menus. */
  children?: ReactNode;
  onClear?: () => void;
  clearLabel?: string;
  selectedLabel?: (count: number) => ReactNode;
};

export function TableBulkActionToolbar({
  selectionCount,
  children,
  onClear,
  clearLabel = 'Clear selection',
  selectedLabel = (count) => `${count} selected`,
  className = '',
  ...props
}: TableBulkActionToolbarProps) {
  if (selectionCount <= 0) return null;

  return (
    <div
      className={cx('art-table-bulk-toolbar', className)}
      role="status"
      aria-live="polite"
      {...props}
    >
      <span className="art-table-bulk-toolbar__count">{selectedLabel(selectionCount)}</span>
      {children != null && <div className="art-table-bulk-toolbar__actions">{children}</div>}
      {onClear && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="art-table-bulk-toolbar__clear"
        >
          {clearLabel}
        </Button>
      )}
    </div>
  );
}

/* ── TablePaginationBar ── */

export type TablePaginationBarProps = Omit<PaginationProps, 'className'> & {
  className?: string;
  /** Current page size; enables the page-size select when set with options. */
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeLabel?: string;
  pageSizeId?: string;
};

export function TablePaginationBar({
  className = '',
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  pageSizeLabel = 'Rows per page',
  pageSizeId = 'art-table-page-size',
  ...paginationProps
}: TablePaginationBarProps) {
  const showSize =
    typeof pageSize === 'number' &&
    pageSize > 0 &&
    typeof onPageSizeChange === 'function' &&
    pageSizeOptions.length > 0;

  return (
    <div className={cx('art-table-pagination-bar', className)}>
      {showSize && (
        <div className="art-table-pagination-bar__size">
          <Select
            id={pageSizeId}
            label={pageSizeLabel}
            value={String(pageSize)}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            options={pageSizeOptions.map((n) => ({ value: String(n), label: String(n) }))}
            className="art-table-pagination-bar__select"
          />
        </div>
      )}
      <Pagination className="art-table-pagination-bar__pagination" {...paginationProps} />
    </div>
  );
}

/* ── Table shell ── */

export type TableProps = Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> & {
  density?: TableDensity;
  stickyHeader?: boolean;
  loading?: boolean;
  /** Skeleton row count while loading (default 5). */
  skeletonRows?: number;
  /** Column count for skeleton / empty / error colspan (default 4). */
  skeletonColumns?: number;
  /** Empty-state panel; shown when set and not loading/error. Header (`head`) is preserved. */
  empty?: ReactNode;
  /** Error-state panel; shown when set and not loading. Header (`head`) is preserved. */
  error?: ReactNode;
  /** Content for `<thead>` (e.g. TableHeaderRow). */
  head?: ReactNode;
  /** Body rows when not in loading / empty / error. */
  children?: ReactNode;
  /** Optional caption. */
  caption?: ReactNode;
  /** Extra class on the outer wrap. */
  wrapClassName?: string;
};

function SkeletonRows({
  rows,
  columns,
  density,
}: {
  rows: number;
  columns: number;
  density: TableDensity;
}) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={rowIndex} className={cx('art-table__tr', 'art-table__tr--skeleton', densityClass(density))}>
          {Array.from({ length: columns }, (_, colIndex) => (
            <td key={colIndex} className={cx('art-table__td', densityClass(density))}>
              <Skeleton variant="text" width={`${60 + ((rowIndex + colIndex) % 3) * 12}%`} height={12} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function Table({
  density = 'comfortable',
  stickyHeader = false,
  loading = false,
  skeletonRows = 5,
  skeletonColumns = 4,
  empty,
  error,
  head,
  children,
  caption,
  className = '',
  wrapClassName = '',
  ...props
}: TableProps) {
  const showError = !loading && error != null;
  const showEmpty = !loading && !showError && empty != null;
  const showSkeleton = loading;
  const showBody = !showSkeleton && !showError && !showEmpty;

  return (
    <div className={cx('art-table-wrap', wrapClassName)}>
      <table
        className={cx(
          'art-table',
          densityClass(density),
          stickyHeader && 'art-table--sticky-header',
          className
        )}
        {...props}
      >
        {caption != null && <caption className="art-table__caption">{caption}</caption>}
        {head != null && <thead className="art-table__head">{head}</thead>}
        <tbody className="art-table__body">
          {showSkeleton && (
            <SkeletonRows rows={skeletonRows} columns={skeletonColumns} density={density} />
          )}
          {showError && (
            <tr className="art-table__tr art-table__tr--panel">
              <td className="art-table__td art-table__td--panel" colSpan={skeletonColumns}>
                <div className="art-table__panel art-table__panel--error" role="alert">
                  {error}
                </div>
              </td>
            </tr>
          )}
          {showEmpty && (
            <tr className="art-table__tr art-table__tr--panel">
              <td className="art-table__td art-table__td--panel" colSpan={skeletonColumns}>
                <div className="art-table__panel art-table__panel--empty" role="status">
                  {empty}
                </div>
              </td>
            </tr>
          )}
          {showBody && children}
        </tbody>
      </table>
    </div>
  );
}
