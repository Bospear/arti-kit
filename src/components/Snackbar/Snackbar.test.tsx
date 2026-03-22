import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Snackbar } from './Snackbar';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Snackbar', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Snackbar open={false} onClose={() => {}}>
        Hi
      </Snackbar>
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows content and status role for message variant', () => {
    render(
      <Snackbar open onClose={() => {}} variant="message">
        <p>Done</p>
      </Snackbar>
    );
    expect(screen.getByRole('status')).toHaveTextContent('Done');
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('uses alert role for error variant', () => {
    render(
      <Snackbar open onClose={() => {}} variant="error">
        <p>Failed</p>
      </Snackbar>
    );
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('calls onClose when dismiss is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Snackbar open onClose={onClose}>
        <p>X</p>
      </Snackbar>
    );
    await user.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onAction when action button is used', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <Snackbar open onClose={() => {}} actionLabel="Undo" onAction={onAction}>
        <p>Y</p>
      </Snackbar>
    );
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(
      <Snackbar open onClose={onClose} duration={1000}>
        <p>Timer</p>
      </Snackbar>
    );
    vi.advanceTimersByTime(1000);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
