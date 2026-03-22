import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogActions } from './Dialog';

afterEach(() => {
  cleanup();
});

describe('Dialog', () => {
  it('renders nothing when open is false', () => {
    const { container } = render(
      <Dialog open={false} onClose={() => {}} title="T">
        Body
      </Dialog>
    );
    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders dialog with title and body when open', () => {
    render(
      <Dialog open onClose={() => {}} title="Quest log">
        <p>Save your notes before leaving.</p>
      </Dialog>
    );
    const dialog = screen.getByRole('dialog', { name: 'Quest log' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveTextContent('Save your notes before leaving.');
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Close me">
        Content
      </Dialog>
    );
    await user.click(screen.getByRole('button', { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Esc">
        X
      </Dialog>
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer with DialogActions', () => {
    render(
      <Dialog
        open
        onClose={() => {}}
        title="Actions"
        footer={
          <DialogActions>
            <button type="button">OK</button>
          </DialogActions>
        }
      >
        Body
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toContainElement(screen.getByRole('button', { name: 'OK' }));
  });
});
