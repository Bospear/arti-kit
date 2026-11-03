import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from './Button';

export type SplitButtonAction = {
  id: string;
  label: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
};

export type SplitButtonProps = {
  label: ReactNode;
  onClick?: () => void;
  actions: SplitButtonAction[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
  menuLabel?: string;
};

export function SplitButton({
  label,
  onClick,
  actions,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  className = '',
  menuLabel = 'More actions',
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
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
  }, [open]);

  return (
    <div className={`art-split-btn ${className}`.trim()} ref={rootRef}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        icon={icon}
        className="art-split-btn__main"
        onClick={onClick}
      >
        {label}
      </Button>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        className="art-split-btn__chevron art-icon-btn"
        aria-label={menuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        icon={
          <span aria-hidden="true" style={{ fontSize: '0.65em' }}>
            ▼
          </span>
        }
      />
      {open && (
        <ul id={menuId} role="menu" className="art-split-btn__menu">
          {actions.map((action) => (
            <li key={action.id} role="none">
              <button
                type="button"
                role="menuitem"
                className="art-split-btn__item"
                disabled={action.disabled}
                onClick={() => {
                  action.onSelect?.();
                  setOpen(false);
                }}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
