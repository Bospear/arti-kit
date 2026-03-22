import {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import './Tooltip.css';

export type TooltipVariant = 'message' | 'error' | 'success' | 'warning';
export type TooltipPlacement = 'top' | 'bottom';

export type TooltipProps = {
  /** Tooltip body (plain text or rich node). */
  content: ReactNode;
  /**
   * Trigger: a single React element (e.g. `<button>`) or arbitrary content wrapped in a
   * focusable span.
   */
  children: ReactNode;
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  /** Optional stable id for `role="tooltip"` (defaults to `useId`). */
  id?: string;
  className?: string;
};

type TriggerProps = {
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
};

function mergeTriggerHandlers(
  existing: TriggerProps,
  show: () => void,
  hide: () => void
): TriggerProps {
  return {
    onMouseEnter: (e: MouseEvent) => {
      existing.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: MouseEvent) => {
      existing.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: FocusEvent) => {
      existing.onFocus?.(e);
      show();
    },
    onBlur: (e: FocusEvent) => {
      existing.onBlur?.(e);
      hide();
    },
    onKeyDown: (e: KeyboardEvent) => {
      existing.onKeyDown?.(e);
      if (e.key === 'Escape') hide();
    },
  };
}

/**
 * Accessible tooltip: hover + focus, `aria-describedby` while visible, Escape to dismiss.
 * Variants: message (neutral), error, success, warning.
 */
export function Tooltip({
  content,
  children,
  variant = 'message',
  placement = 'top',
  id: idProp,
  className = '',
}: TooltipProps) {
  const genId = useId();
  const tooltipId = idProp ?? `art-tooltip-${genId}`;
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const describedBy = visible ? tooltipId : undefined;

  let trigger: ReactNode;
  if (isValidElement(children)) {
    const child = children as ReactElement<TriggerProps>;
    const merged = mergeTriggerHandlers(child.props ?? {}, show, hide);
    trigger = cloneElement(child, {
      ...merged,
      'aria-describedby': describedBy,
    } as Partial<TriggerProps & { 'aria-describedby': string | undefined }>);
  } else {
    trigger = (
      <span
        className="art-tooltip__fallback-trigger"
        tabIndex={0}
        aria-describedby={describedBy}
        {...mergeTriggerHandlers({}, show, hide)}
      >
        {children}
      </span>
    );
  }

  const tipClass = [
    'art-tooltip',
    `art-tooltip--${variant}`,
    `art-tooltip--placement-${placement}`,
    visible && 'art-tooltip--visible',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapClass = ['art-tooltip-wrap', className].filter(Boolean).join(' ');

  return (
    <span className={wrapClass}>
      {trigger}
      <span id={tooltipId} role="tooltip" className={tipClass}>
        <span className="art-tooltip__inner">{content}</span>
      </span>
    </span>
  );
}
