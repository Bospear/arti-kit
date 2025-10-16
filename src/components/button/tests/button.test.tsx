import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '..';

const mockProps = {
  'aria-label': 'Mock aria',
  label: 'Click me',
  onClick: jest.fn(),
};

describe('react-button - Button', () => {
  beforeEach(jest.resetAllMocks);

  it('should render', () => {
    render(<Button {...mockProps} />);

    const button = screen.getByRole('button');
    expect(button).toBeVisible();
  });
});