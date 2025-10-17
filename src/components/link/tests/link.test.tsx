import { render, screen } from '@testing-library/react';
import { Link } from '../link';

test("renders Link", () => {
  render(<Link />);
  expect(screen.getByText("Link component")).toBeInTheDocument();
});
