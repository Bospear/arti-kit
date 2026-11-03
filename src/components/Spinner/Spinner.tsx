import type { HTMLAttributes } from 'react';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: SpinnerSize;
  /** Accessible name announced while busy. Defaults to `"Loading"`. */
  label?: string;
};

/**
 * Indeterminate loading indicator. Sets `aria-busy` and exposes a visually hidden label.
 */
export function Spinner({
  size = 'md',
  label = 'Loading',
  className = '',
  ...props
}: SpinnerProps) {
  return (
    <div
      className={['art-spinner', `art-spinner--${size}`, className].filter(Boolean).join(' ')}
      role="status"
      aria-busy="true"
      {...props}
    >
      <span className="art-spinner__ring" aria-hidden="true" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </div>
  );
}
