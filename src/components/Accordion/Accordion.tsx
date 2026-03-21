import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import './Accordion.css';

export type AccordionContextValue = {
  baseId: string;
  openSet: Set<string>;
  toggle: (value: string) => void;
};

export type AccordionItemContextValue = {
  value: string;
  triggerId: string;
  panelId: string;
  disabled: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function normalizeDefaultOpen(defaultOpenIds: string[] | undefined, allowMultiple: boolean): Set<string> {
  if (!defaultOpenIds?.length) {
    return new Set();
  }
  if (allowMultiple) {
    return new Set(defaultOpenIds);
  }
  return new Set([defaultOpenIds[0]!]);
}

export type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  openIds?: string[];
  onOpenChange?: (ids: string[]) => void;
};

export function Accordion({
  children,
  className = '',
  allowMultiple = false,
  defaultOpenIds = [],
  openIds,
  onOpenChange,
  ...props
}: AccordionProps) {
  const baseId = useId();
  const isControlled = openIds !== undefined;
  const [internalOpen, setInternalOpen] = useState(() =>
    normalizeDefaultOpen(defaultOpenIds, allowMultiple)
  );

  const openSet = useMemo(() => {
    if (isControlled) {
      return new Set(openIds);
    }
    return internalOpen;
  }, [isControlled, openIds, internalOpen]);

  const toggle = useCallback(
    (value: string) => {
      if (isControlled) {
        const current = new Set(openIds);
        let next: Set<string>;
        if (allowMultiple) {
          next = new Set(current);
          if (next.has(value)) {
            next.delete(value);
          } else {
            next.add(value);
          }
        } else if (current.has(value)) {
          next = new Set();
        } else {
          next = new Set([value]);
        }
        onOpenChange?.([...next]);
      } else {
        setInternalOpen((prev) => {
          if (allowMultiple) {
            const next = new Set(prev);
            if (next.has(value)) {
              next.delete(value);
            } else {
              next.add(value);
            }
            return next;
          }
          if (prev.has(value)) {
            return new Set();
          }
          return new Set([value]);
        });
      }
    },
    [allowMultiple, isControlled, openIds, onOpenChange]
  );

  const ctx = useMemo(
    () => ({
      baseId,
      openSet,
      toggle,
    }),
    [baseId, openSet, toggle]
  );

  return (
    <AccordionContext.Provider value={ctx}>
      <div className={`art-accordion${className ? ` ${className}` : ''}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  value: string;
  disabled?: boolean;
};

export function AccordionItem({ value, children, className = '', disabled = false }: AccordionItemProps) {
  const acc = useContext(AccordionContext);
  if (!acc) {
    throw new Error('AccordionItem must be used inside Accordion');
  }

  const triggerId = `${acc.baseId}-trigger-${value}`;
  const panelId = `${acc.baseId}-panel-${value}`;

  const itemCtx = useMemo(
    () => ({ value, triggerId, panelId, disabled }),
    [value, triggerId, panelId, disabled]
  );

  return (
    <AccordionItemContext.Provider value={itemCtx}>
      <div
        className={`art-accordion__item${className ? ` ${className}` : ''}`}
        data-disabled={disabled ? 'true' : undefined}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function AccordionTrigger({ children, className = '', ...props }: AccordionTriggerProps) {
  const acc = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!acc || !item) {
    throw new Error('AccordionTrigger must be used inside AccordionItem');
  }

  const open = acc.openSet.has(item.value);

  return (
    <button
      type="button"
      id={item.triggerId}
      className={`art-accordion__trigger${className ? ` ${className}` : ''}`}
      aria-expanded={open}
      aria-controls={item.panelId}
      disabled={item.disabled}
      data-state={open ? 'open' : 'closed'}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (!e.defaultPrevented) {
          acc.toggle(item.value);
        }
      }}
    >
      <span className="art-accordion__trigger-text">{children}</span>
      <span className="art-accordion__chevron" aria-hidden="true">
        ▾
      </span>
    </button>
  );
}

export type AccordionPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function AccordionPanel({ children, className = '', ...props }: AccordionPanelProps) {
  const acc = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (!acc || !item) {
    throw new Error('AccordionPanel must be used inside AccordionItem');
  }

  const open = acc.openSet.has(item.value);

  return (
    <div
      id={item.panelId}
      role="region"
      aria-labelledby={item.triggerId}
      className={`art-accordion__panel${className ? ` ${className}` : ''}`}
      data-state={open ? 'open' : 'closed'}
      aria-hidden={!open}
      {...props}
    >
      <div className="art-accordion__panel-sizer">
        <div className="art-accordion__panel-inner" inert={!open ? true : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
