import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  /** Initials or fallback content when no image. */
  children?: ReactNode;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
};

function initialsFromChildren(children: ReactNode): string | null {
  if (typeof children !== 'string') return null;
  const parts = children.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ''}${parts[1]![0] ?? ''}`.toUpperCase();
}

export function Avatar({
  children,
  src,
  alt = '',
  size = 'md',
  className = '',
  imgProps,
  ...props
}: AvatarProps) {
  const fallback = initialsFromChildren(children) ?? children;

  return (
    <span
      className={`art-avatar art-avatar--${size}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {src ? (
        <img className="art-avatar__img" src={src} alt={alt} {...imgProps} />
      ) : (
        <span className="art-avatar__fallback" aria-hidden={alt ? undefined : true}>
          {fallback}
        </span>
      )}
    </span>
  );
}
