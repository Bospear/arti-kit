import type { CSSProperties, HTMLAttributes } from 'react';
import './Skeleton.css';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
};

/**
 * Placeholder shimmer for loading content. Decorative — `aria-hidden` by default.
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const dimStyle: CSSProperties = {
    ...style,
    ...(width != null ? { width: typeof width === 'number' ? `${width}px` : width } : null),
    ...(height != null ? { height: typeof height === 'number' ? `${height}px` : height } : null),
  };

  return (
    <div
      className={['art-skeleton', `art-skeleton--${variant}`, className].filter(Boolean).join(' ')}
      style={dimStyle}
      aria-hidden="true"
      {...props}
    />
  );
}
