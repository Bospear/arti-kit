import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('disables previous on first page', () => {
    render(<Pagination page={1} totalPages={3} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next page/i })).not.toBeDisabled();
  });

  it('calls onPageChange when next is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={3} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: /next page/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('clamps page to totalPages', () => {
    render(<Pagination page={99} totalPages={2} onPageChange={() => {}} />);
    expect(screen.getByRole('navigation', { name: /pagination/i })).toHaveTextContent('Page 2 of 2');
  });

  it('renders page number buttons including first and last', () => {
    render(<Pagination page={5} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /^page 1$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^page 10$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^page 5$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange when a page number is clicked', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: /^page 4$/i }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('hides numeric strip when showPageNumbers is false', () => {
    render(
      <Pagination page={2} totalPages={10} onPageChange={() => {}} showPageNumbers={false} />
    );
    expect(screen.queryByRole('button', { name: /^page 1$/i })).not.toBeInTheDocument();
  });
});
