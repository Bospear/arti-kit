import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Dialog, DialogActions, type DialogProps } from './Dialog';
import './Dialog.css';

export type WizardDialogStep = {
  id: string;
  label: ReactNode;
};

export type WizardDialogProps = Omit<DialogProps, 'footer' | 'children'> & {
  steps: WizardDialogStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: ReactNode;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  onFinish: () => void;
  /** Disables navigation actions while an async step runs. */
  loading?: boolean;
};

/**
 * Multi-step dialog with a step indicator and back / next / finish actions.
 */
export function WizardDialog({
  steps,
  currentStep,
  onStepChange,
  children,
  backLabel = 'Back',
  nextLabel = 'Next',
  finishLabel = 'Finish',
  onFinish,
  onClose,
  loading = false,
  closeOnOverlayClick = false,
  className = '',
  ...dialogProps
}: WizardDialogProps) {
  const lastIndex = Math.max(steps.length - 1, 0);
  const safeStep = Math.min(Math.max(currentStep, 0), lastIndex);
  const isFirst = safeStep <= 0;
  const isLast = safeStep >= lastIndex;

  return (
    <Dialog
      {...dialogProps}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      className={['art-wizard-dialog', className].filter(Boolean).join(' ')}
      footer={
        <DialogActions>
          {!isFirst && (
            <Button
              type="button"
              variant="ghost"
              disabled={loading}
              onClick={() => onStepChange(safeStep - 1)}
            >
              {backLabel}
            </Button>
          )}
          {isLast ? (
            <Button type="button" variant="primary" loading={loading} onClick={onFinish}>
              {finishLabel}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              disabled={loading}
              onClick={() => onStepChange(safeStep + 1)}
            >
              {nextLabel}
            </Button>
          )}
        </DialogActions>
      }
    >
      <ol className="art-wizard-dialog__steps" aria-label="Progress">
        {steps.map((step, index) => {
          const state =
            index < safeStep ? 'complete' : index === safeStep ? 'current' : 'upcoming';
          return (
            <li
              key={step.id}
              className={[
                'art-wizard-dialog__step',
                `art-wizard-dialog__step--${state}`,
              ].join(' ')}
              aria-current={index === safeStep ? 'step' : undefined}
            >
              <span className="art-wizard-dialog__step-index" aria-hidden="true">
                {index + 1}
              </span>
              <span className="art-wizard-dialog__step-label">{step.label}</span>
            </li>
          );
        })}
      </ol>
      <div className="art-wizard-dialog__body">{children}</div>
    </Dialog>
  );
}
