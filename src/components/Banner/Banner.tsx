import type { HTMLAttributes, ReactNode } from 'react';
import './Banner.css';

export type BannerVariant = 'crimson' | 'azure' | 'parchment' | 'dark';
export type BannerSize = 'sm' | 'md' | 'lg';

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: BannerVariant;
  size?: BannerSize;
};

export function Banner({
  children,
  variant = 'crimson',
  size = 'md',
  className = '',
  ...props
}: BannerProps) {
  const classes = [
    'art-banner',
    `art-banner--${variant}`,
    `art-banner--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      <span className="art-banner__text">{children}</span>
    </div>
  );
}
