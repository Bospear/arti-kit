import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('binary: toggles with click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox id="cb1" onChange={onChange} />);
    const el = screen.getByRole('checkbox');
    await user.click(el);
    expect(onChange).toHaveBeenCalled();
  });

  it('triple: cycles state', async () => {
    const user = userEvent.setup();
    const onCheckStateChange = vi.fn();
    render(
      <Checkbox id="cb2" triple defaultCheckState="unchecked" onCheckStateChange={onCheckStateChange} />
    );
    const btn = screen.getByRole('checkbox');
    await user.click(btn);
    expect(onCheckStateChange).toHaveBeenCalledWith('checked');
  });
});
