import type { SVGAttributes } from 'react';
import { icons, type IconName } from './icons';
import './Icon.css';

export type { IconName };
export { icons, iconNames } from './icons';

export type IconProps = {
  name: IconName;
  /** Visual size in px (number) or any CSS length. Defaults to `24`. */
  size?: number | string;
  /** When set, exposes the icon as an image with an accessible name. */
  title?: string;
  className?: string;
} & SVGAttributes<SVGSVGElement>;

/**
 * Stroke icon from the Artificer iconography set (24×24 viewBox).
 * Color inherits via `currentColor`. Decorative by default (`aria-hidden`) unless `title` is set.
 */
export function Icon({
  name,
  size = 24,
  title,
  className = '',
  ...rest
}: IconProps) {
  const content = icons[name];
  const labelled = Boolean(title);
  const dim = typeof size === 'number' ? `${size}` : size;

  return (
    <svg
      className={['art-icon', className].filter(Boolean).join(' ')}
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={labelled ? 'img' : undefined}
      aria-hidden={labelled ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  );
}
