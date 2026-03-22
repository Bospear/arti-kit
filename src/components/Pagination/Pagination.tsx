import { Button } from '../Button/Button';
import { buildPaginationItems } from './paginationModel';
import './Pagination.css';

export type PaginationProps = {
  /** Current page (1-based). */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  /**
   * When true (default), show page 1, last page, and a window around the current page
   * (see `neighborCount`). Ellipses mark gaps.
   */
  showPageNumbers?: boolean;
  /**
   * How many page numbers to show on each side of the current page in the strip
   * (default `1` → three pages: current−1, current, current+1, plus always 1 and last).
   */
  neighborCount?: number;
  className?: string;
};

/** Accessible page controls (1-based). Pair with `DataTable` via `pageSize` or use standalone. */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  ariaLabel = 'Pagination',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  showPageNumbers = true,
  neighborCount = 1,
  className = '',
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), safeTotal);
  const atFirst = current <= 1;
  const atLast = current >= safeTotal;

  const pageItems =
    showPageNumbers && safeTotal > 1
      ? buildPaginationItems(current, safeTotal, neighborCount)
      : [];

  const wrapClass = ['art-pagination', className].filter(Boolean).join(' ');

  return (
    <nav className={wrapClass} aria-label={ariaLabel}>
      <div className="art-pagination__controls">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={atFirst}
          onClick={() => onPageChange(current - 1)}
          aria-label={`${previousLabel} page`}
          className="art-pagination__btn"
        >
          {previousLabel}
        </Button>

        {pageItems.length > 0 && (
          <ol className="art-pagination__pages" aria-label="Pages">
            {pageItems.map((item, index) =>
              item === 'ellipsis' ? (
                <li key={`e-${index}`} className="art-pagination__pages-item" aria-hidden="true">
                  <span className="art-pagination__ellipsis">…</span>
                </li>
              ) : (
                <li key={item} className="art-pagination__pages-item">
                  <Button
                    type="button"
                    variant={item === current ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(item)}
                    aria-label={`Page ${item}`}
                    aria-current={item === current ? 'page' : undefined}
                    className="art-pagination__page-btn"
                  >
                    {item}
                  </Button>
                </li>
              )
            )}
          </ol>
        )}

        <p className="art-pagination__summary" aria-live="polite">
          Page <span className="art-pagination__current">{current}</span> of{' '}
          <span className="art-pagination__total">{safeTotal}</span>
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={atLast}
          onClick={() => onPageChange(current + 1)}
          aria-label={`${nextLabel} page`}
          className="art-pagination__btn"
        >
          {nextLabel}
        </Button>
      </div>
    </nav>
  );
}
