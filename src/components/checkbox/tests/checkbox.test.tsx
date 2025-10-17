import { render, screen } from '@testing-library/react';
import { Checkbox } from '../checkbox';

test("renders Checkbox", () => {
  render(<Checkbox />);
  expect(screen.getByText("Checkbox component")).toBeInTheDocument();
});
