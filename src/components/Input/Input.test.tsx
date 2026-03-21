import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('links datalist when suggestions are provided', () => {
    render(
      <Input
        id="loc"
        label="Town"
        suggestions={['Alpha', 'Beta']}
      />
    );

    const input = screen.getByRole('combobox', { name: /town/i });
    expect(input).toHaveAttribute('list', 'loc-datalist');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');

    const datalist = document.getElementById('loc-datalist');
    expect(datalist).toBeInTheDocument();
    expect(datalist?.querySelectorAll('option')).toHaveLength(2);
  });

  it('does not render datalist without suggestions', () => {
    render(<Input id="plain" label="Plain" />);
    expect(document.querySelector('datalist')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Plain')).not.toHaveAttribute('list');
  });
});
