import type { HTMLAttributes, ReactNode } from 'react';
import './VisuallyHidden.css';

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  /** Render as a different element when needed (e.g. `div` for block content). */
  as?: 'span' | 'div';
};

/**
 * Hides content visually while keeping it available to assistive technology.
 */
export function VisuallyHidden({
  children,
  as: Comp = 'span',
  className = '',
  ...props
}: VisuallyHiddenProps) {
  return (
    <Comp className={['art-visually-hidden', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Comp>
  );
}
