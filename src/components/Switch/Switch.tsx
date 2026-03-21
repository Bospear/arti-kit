import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Switch.css';

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role' | 'onChange'> & {
  id?: string;
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function Switch({
  id,
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
  ...props
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  function handleClick() {
    if (disabled) return;
    const next = !on;
    if (!isControlled) {
      setInternal(next);
    }
    onChange?.(next);
  }

  const labelId = label && id ? `${id}-label` : undefined;

  return (
    <div className={`art-switch-row${className ? ` ${className}` : ''}`}>
      {label ? (
        <span className="art-switch__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={on}
        aria-labelledby={labelId}
        aria-label={!label ? 'Toggle' : undefined}
        disabled={disabled}
        className={`art-switch${on ? ' art-switch--on' : ''}`}
        onClick={handleClick}
        {...props}
      >
        <span className="art-switch__thumb" aria-hidden="true" />
      </button>
    </div>
  );
}
