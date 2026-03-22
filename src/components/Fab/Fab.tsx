import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
} from 'react';
import './Fab.css';

function IconPlus({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconEdit({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 21h4l11-11a2.5 2.5 0 0 0 0-3.54l-1.46-1.46a2.5 2.5 0 0 0-3.54 0L3 16.5V21z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14 6l4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPage({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v4h4M8 12h8M8 16h6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICON_MAP: Record<
  FabActionIcon,
  ComponentType<{ className?: string }>
> = {
  add: IconPlus,
  edit: IconEdit,
  page: IconPage,
};

export type FabActionIcon = 'add' | 'edit' | 'page';

export type FabSpeedDialAction = {
  id: string;
  label: string;
  icon: FabActionIcon;
  onClick?: () => void;
};

export type FabSpeedDialProps = {
  actions: FabSpeedDialAction[];
  /**
   * `static` — `position: absolute` (parent should be `position: relative`).
   * `fixed` — pinned to the bottom-right of the viewport.
   */
  position?: 'static' | 'fixed';
  /** Accessible name for the main toggle (visually hidden). */
  mainLabel?: string;
  /** Close the dial after a secondary action fires. */
  closeOnAction?: boolean;
  className?: string;
};

/**
 * Floating action button with speed-dial secondary actions (built-in add / edit / page icons).
 */
export function FabSpeedDial({
  actions,
  position = 'static',
  mainLabel = 'Open quick actions',
  closeOnAction = true,
  className = '',
}: FabSpeedDialProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const posClass =
    position === 'fixed' ? 'art-fab art-fab--fixed' : 'art-fab art-fab--static';

  const wrapClass = [posClass, className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={wrapClass}>
      <button
        type="button"
        className={`art-fab__main${open ? ' art-fab__main--open' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="visually-hidden">{mainLabel}</span>
        <span className="art-fab__main-icon" aria-hidden="true">
          <IconPlus className="art-fab__svg" />
        </span>
      </button>

      <div
        id={menuId}
        className={`art-fab__actions${open ? ' art-fab__actions--open' : ''}`}
        role="group"
        aria-label="Quick actions"
        aria-hidden={!open}
      >
        {actions.map((action, index) => {
          const Icon = ICON_MAP[action.icon] ?? IconPlus;
          return (
            <div key={action.id} className="art-fab__action-row">
              <span className="art-fab__tooltip" id={`${menuId}-tip-${action.id}`}>
                {action.label}
              </span>
              <button
                type="button"
                className="art-fab__action"
                style={{ transitionDelay: open ? `${index * 40}ms` : '0ms' }}
                tabIndex={open ? 0 : -1}
                aria-labelledby={`${menuId}-tip-${action.id}`}
                onClick={() => {
                  action.onClick?.();
                  if (closeOnAction) close();
                }}
              >
                <Icon className="art-fab__svg art-fab__svg--action" />
                <span className="visually-hidden">{action.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Default trio for demos: page, edit, add (stacked bottom → top when open). */
export const FAB_DEMO_ACTIONS: Omit<FabSpeedDialAction, 'onClick'>[] = [
  { id: 'page', label: 'Page', icon: 'page' },
  { id: 'edit', label: 'Edit', icon: 'edit' },
  { id: 'add', label: 'Add', icon: 'add' },
];
