import { useId, type FormEvent, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Dialog, DialogActions, type DialogProps } from './Dialog';
import './Dialog.css';

export type FormDialogProps = Omit<DialogProps, 'footer' | 'children'> & {
  /** Form fields / body content. */
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  /** Called when the form is submitted (Enter or primary action). */
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  /** Disables actions and shows loading on the submit button. */
  loading?: boolean;
  /** Optional error banner above the form body. */
  error?: ReactNode;
  /** Optional explicit form id (auto-generated when omitted). */
  formId?: string;
};

/**
 * Dialog with a form body slot and primary submit / secondary cancel footer.
 */
export function FormDialog({
  children,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  onClose,
  loading = false,
  error,
  formId: formIdProp,
  closeOnOverlayClick = false,
  className = '',
  ...dialogProps
}: FormDialogProps) {
  const autoId = useId();
  const formId = formIdProp ?? autoId;

  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      className={['art-form-dialog', className].filter(Boolean).join(' ')}
      footer={
        <DialogActions>
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button type="submit" form={formId} variant="primary" loading={loading}>
            {submitLabel}
          </Button>
        </DialogActions>
      }
    >
      <form
        id={formId}
        className="art-form-dialog__form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) onSubmit(e);
        }}
        noValidate
      >
        {error != null && error !== false && error !== '' && (
          <div className="art-form-dialog__error" role="alert">
            {error}
          </div>
        )}
        <div className="art-form-dialog__body">{children}</div>
      </form>
    </Dialog>
  );
}
