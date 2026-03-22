/**
 * Build ordered items for pagination UI: page numbers and ellipsis gaps.
 * Always includes page 1 and `total`, plus `current ± neighborCount` (clamped).
 */
export function buildPaginationItems(
  current: number,
  total: number,
  neighborCount: number
): Array<number | 'ellipsis'> {
  if (total < 1) return [];
  const set = new Set<number>();
  set.add(1);
  set.add(total);
  const n = Math.max(0, Math.floor(neighborCount));
  for (let i = current - n; i <= current + n; i++) {
    if (i >= 1 && i <= total) set.add(i);
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out: Array<number | 'ellipsis'> = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) {
      out.push('ellipsis');
    }
    out.push(sorted[i]!);
  }
  return out;
}
