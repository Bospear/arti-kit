import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('toggles visible class on focus and blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" variant="message">
        <button type="button">Trigger</button>
      </Tooltip>
    );

    const tip = screen.getByRole('tooltip');
    expect(tip).not.toHaveClass('art-tooltip--visible');

    const btn = screen.getByRole('button', { name: 'Trigger' });
    await user.click(btn);
    expect(btn).toHaveFocus();
    expect(tip).toHaveClass('art-tooltip--visible');

    await user.tab();
    expect(tip).not.toHaveClass('art-tooltip--visible');
  });

  it('wraps non-element children in a focusable trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Note" variant="warning">
        Plain label
      </Tooltip>
    );

    const tip = screen.getByRole('tooltip');
    expect(screen.getByText('Plain label')).toBeInTheDocument();

    await user.tab();
    expect(tip).toHaveClass('art-tooltip--visible');
  });
});
