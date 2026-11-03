import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Dialog, DialogActions, type DialogProps } from './Dialog';
import './AlertDialog.css';

export type AlertDialogStatus = 'success' | 'warning' | 'danger' | 'info';

export type AlertDialogProps = Omit<DialogProps, 'footer' | 'children'> & {
  children?: ReactNode;
  status?: AlertDialogStatus;
  /** Primary dismiss / acknowledge label. Defaults to `"OK"`. */
  actionLabel?: string;
  onAction?: () => void;
};

const STATUS_LABEL: Record<AlertDialogStatus, string> = {
  success: 'Success',
  warning: 'Warning',
  danger: 'Error',
  info: 'Information',
};

/**
 * Status-styled alert dialog composed from `Dialog`.
 * Defaults to a single acknowledge action that closes the dialog.
 */
export function AlertDialog({
  status = 'info',
  actionLabel = 'OK',
  onAction,
  onClose,
  children,
  title,
  className = '',
  closeOnOverlayClick = true,
  ...dialogProps
}: AlertDialogProps) {
  function handleAction() {
    onAction?.();
    onClose();
  }

  return (
    <Dialog
      {...dialogProps}
      title={title ?? STATUS_LABEL[status]}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      className={['art-alert-dialog', `art-alert-dialog--${status}`, className]
        .filter(Boolean)
        .join(' ')}
      footer={
        <DialogActions>
          <Button
            type="button"
            variant={status === 'danger' ? 'danger' : 'primary'}
            onClick={handleAction}
          >
            {actionLabel}
          </Button>
        </DialogActions>
      }
    >
      {children}
    </Dialog>
  );
}
