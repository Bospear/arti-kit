import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo, LOGO_SRC } from './Logo';

describe('Logo', () => {
  it('renders with default alt', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: /artificer tools/i })).toBeInTheDocument();
  });

  it('exposes bundled src string', () => {
    expect(typeof LOGO_SRC).toBe('string');
    expect(LOGO_SRC.length).toBeGreaterThan(0);
  });
});
