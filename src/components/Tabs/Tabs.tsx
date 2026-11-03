import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import './Tabs.css';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>`);
  return ctx;
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
};

export function Tabs({
  value,
  defaultValue = '',
  onValueChange,
  children,
  className = '',
  ...props
}: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function setValue(next: string) {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  }

  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId }}>
      <div className={`art-tabs${className ? ` ${className}` : ''}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = HTMLAttributes<HTMLDivElement>;

export function TabsList({ children, className = '', onKeyDown, ...props }: TabsListProps) {
  const { value, setValue } = useTabsContext('TabsList');

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(e);
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
    );
    const idx = tabs.findIndex((t) => t.getAttribute('data-value') === value);
    if (idx < 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = tabs[(idx + 1) % tabs.length];
      const nextValue = next?.getAttribute('data-value');
      if (nextValue) {
        setValue(nextValue);
        next.focus();
      }
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = tabs[(idx - 1 + tabs.length) % tabs.length];
      const nextValue = next?.getAttribute('data-value');
      if (nextValue) {
        setValue(nextValue);
        next.focus();
      }
    }
  }

  return (
    <div
      role="tablist"
      className={`art-tabs__list${className ? ` ${className}` : ''}`}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export function TabsTrigger({
  value,
  children,
  className = '',
  disabled,
  ...props
}: TabsTriggerProps) {
  const { value: current, setValue, baseId } = useTabsContext('TabsTrigger');
  const selected = current === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      disabled={disabled}
      className={`art-tabs__trigger${selected ? ' art-tabs__trigger--selected' : ''}${className ? ` ${className}` : ''}`}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

export function TabsContent({ value, children, className = '', ...props }: TabsContentProps) {
  const { value: current, baseId } = useTabsContext('TabsContent');
  if (current !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={`art-tabs__content${className ? ` ${className}` : ''}`}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}
