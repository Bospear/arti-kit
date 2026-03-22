import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('uses role alert for error variant', () => {
    render(
      <Alert variant="error" title="Failed">
        Bad
      </Alert>
    );
    const el = screen.getByRole('alert');
    expect(el).toHaveAttribute('aria-live', 'assertive');
    expect(el).toHaveTextContent('Failed');
    expect(el).toHaveTextContent('Bad');
  });

  it('uses role status for message variant', () => {
    render(<Alert variant="message">Info</Alert>);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('calls onDismiss when dismiss is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert variant="success" onDismiss={onDismiss}>
        Saved
      </Alert>
    );
    await user.click(screen.getByRole('button', { name: /dismiss alert/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
