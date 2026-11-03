import { Dialog, type DialogProps } from './Dialog';
import './Dialog.css';

export type FullscreenModalProps = DialogProps;

/**
 * Viewport-filling dialog variant — same portal / focus / Escape behavior as `Dialog`.
 */
export function FullscreenModal({ className = '', ...props }: FullscreenModalProps) {
  return (
    <Dialog
      {...props}
      className={['art-dialog--fullscreen', className].filter(Boolean).join(' ')}
    />
  );
}
