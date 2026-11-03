import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import './InformationPopover.css';

export type InformationPopoverProps = {
  trigger: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentProps?: HTMLAttributes<HTMLDivElement>;
};

/**
 * Interactive popover for essential/help content (Figma: Information Popover).
 * Prefer this over Tooltip when content includes links, buttons, or required info.
 */
export function InformationPopover({
  trigger,
  title,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className = '',
  contentProps,
}: InformationPopoverProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [internal, setInternal] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;

  function setOpen(next: boolean) {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    if (!isOpen) return;
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <div className={`art-info-popover${className ? ` ${className}` : ''}`} ref={rootRef}>
      <button
        type="button"
        className="art-info-popover__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpen(!isOpen)}
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="dialog"
          className="art-info-popover__panel"
          {...contentProps}
        >
          {title && <div className="art-info-popover__title">{title}</div>}
          <div className="art-info-popover__body">{children}</div>
        </div>
      )}
    </div>
  );
}
