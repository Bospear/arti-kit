import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FabSpeedDial, FAB_DEMO_ACTIONS } from './Fab';

describe('FabSpeedDial', () => {
  it('toggles open and invokes action onClick', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const actions = [
      ...FAB_DEMO_ACTIONS.map((a) =>
        a.id === 'add' ? { ...a, onClick: onAdd } : { ...a, onClick: () => {} }
      ),
    ];

    render(
      <div style={{ position: 'relative', minHeight: 200 }}>
        <FabSpeedDial actions={actions} mainLabel="Quick menu" />
      </div>
    );

    const toggle = screen.getByRole('button', { name: /quick menu/i });
    await user.click(toggle);

    const addBtn = screen.getByRole('button', { name: /add/i });
    await user.click(addBtn);

    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
