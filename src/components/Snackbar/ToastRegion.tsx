import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import './ToastRegion.css';

export type ToastRegionPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center';

export type ToastRegionContextValue = {
  mount: HTMLElement | null;
  inRegion: boolean;
};

export const ToastRegionContext = createContext<ToastRegionContextValue>({
  mount: null,
  inRegion: false,
});

export function useToastRegion(): ToastRegionContextValue {
  return useContext(ToastRegionContext);
}

export type ToastStackProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

/** Vertical stack layout for toast panels (used inside `ToastRegion`). */
export const ToastStack = forwardRef<HTMLDivElement, ToastStackProps>(
  function ToastStack({ children, className = '', ...props }, ref) {
    return (
      <div
        ref={ref}
        className={['art-toast-stack', className].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export type ToastRegionProps = HTMLAttributes<HTMLDivElement> & {
  position?: ToastRegionPosition;
  children?: ReactNode;
  /** Accessible name for the live region landmark. */
  'aria-label'?: string;
};

/**
 * Provides a fixed-position stack for toasts. Children stay in place;
 * `Toast` / `Snackbar` portal into the stack when no `container` is set.
 */
export function ToastRegion({
  position = 'bottom-right',
  children,
  className = '',
  'aria-label': ariaLabel = 'Notifications',
  ...props
}: ToastRegionProps) {
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const canPortal = typeof document !== 'undefined';

  return (
    <ToastRegionContext.Provider value={{ mount, inRegion: true }}>
      {children}
      {canPortal &&
        createPortal(
          <div
            className={[
              'art-toast-region',
              `art-toast-region--${position}`,
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            role="region"
            aria-label={ariaLabel}
            {...props}
          >
            <ToastStack ref={setMount} />
          </div>,
          document.body
        )}
    </ToastRegionContext.Provider>
  );
}
