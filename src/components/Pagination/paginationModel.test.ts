import { describe, it, expect } from 'vitest';
import { buildPaginationItems } from './paginationModel';

describe('buildPaginationItems', () => {
  it('includes first, last, and neighbors with ellipses when needed', () => {
    expect(buildPaginationItems(5, 10, 1)).toEqual([1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]);
  });

  it('uses three consecutive pages around current (neighborCount 1)', () => {
    expect(buildPaginationItems(5, 10, 1).filter((x) => typeof x === 'number')).toContain(4);
    expect(buildPaginationItems(5, 10, 1).filter((x) => typeof x === 'number')).toContain(5);
    expect(buildPaginationItems(5, 10, 1).filter((x) => typeof x === 'number')).toContain(6);
  });

  it('omits ellipsis when everything is contiguous', () => {
    expect(buildPaginationItems(2, 4, 1)).toEqual([1, 2, 3, 4]);
  });

  it('clamps neighbors at bounds', () => {
    expect(buildPaginationItems(1, 10, 1)).toEqual([1, 2, 'ellipsis', 10]);
    expect(buildPaginationItems(10, 10, 1)).toEqual([1, 'ellipsis', 9, 10]);
  });
});
