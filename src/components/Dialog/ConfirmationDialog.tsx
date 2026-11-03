import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Dialog, DialogActions, type DialogProps } from './Dialog';

export type ConfirmationDialogTone = 'default' | 'destructive';

export type ConfirmationDialogProps = Omit<DialogProps, 'footer' | 'children'> & {
  children?: ReactNode;
  tone?: ConfirmationDialogTone;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  /** Disables confirm while an async action runs. */
  confirming?: boolean;
};

/**
 * Confirm/cancel dialog composed from `Dialog` + `Button`.
 * Destructive tone uses a danger confirm button.
 */
export function ConfirmationDialog({
  tone = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  confirming = false,
  children,
  closeOnOverlayClick = false,
  ...dialogProps
}: ConfirmationDialogProps) {
  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      footer={
        <DialogActions>
          <Button type="button" variant="ghost" onClick={onClose} disabled={confirming}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={tone === 'destructive' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={confirming}
          >
            {confirmLabel}
          </Button>
        </DialogActions>
      }
    >
      {children}
    </Dialog>
  );
}
