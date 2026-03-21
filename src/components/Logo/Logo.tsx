import type { ImgHTMLAttributes } from 'react';
import logoSrc from '../../assets/logo.png';
import './Logo.css';

/**
 * Default `src` for the Artificer mark (bundled; large PNG may inline in library builds).
 * For a separate file, copy `src/assets/logo.png` from the package and pass `src` yourself.
 */
export const LOGO_SRC: string = logoSrc;

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

export type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  /** Accessible label; defaults to “Artificer Tools”. */
  alt?: string;
  /** Preset width; image keeps aspect ratio. */
  size?: LogoSize;
  /** Override image URL (e.g. CDN or copied `logo.png`). */
  src?: string;
};

/**
 * Brand mark: open book, tools, and ribbon banners (Artificer / Artikit identity).
 */
export function Logo({
  alt = 'Artificer Tools',
  size = 'md',
  src = LOGO_SRC,
  className = '',
  ...props
}: LogoProps) {
  const classes = ['art-logo', `art-logo--${size}`, className].filter(Boolean).join(' ');

  return <img src={src} alt={alt} className={classes} decoding="async" {...props} />;
}
