import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';
import './SegmentedControl.css';

export type SegmentedOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedControlProps = {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = 'Segmented control',
}: SegmentedControlProps) {
  const groupId = useId();
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function select(next: string) {
    if (disabled) return;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const enabled = options.filter((o) => !o.disabled);
    const idx = enabled.findIndex((o) => o.value === current);
    if (idx < 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = enabled[(idx + 1) % enabled.length];
      if (next) select(next.value);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = enabled[(idx - 1 + enabled.length) % enabled.length];
      if (next) select(next.value);
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`art-segmented${disabled ? ' art-segmented--disabled' : ''}${className ? ` ${className}` : ''}`}
      onKeyDown={onKeyDown}
    >
      {options.map((option) => {
        const selected = option.value === current;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            id={`${groupId}-${option.value}`}
            aria-checked={selected}
            disabled={disabled || option.disabled}
            className={`art-segmented__segment${selected ? ' art-segmented__segment--selected' : ''}`}
            onClick={() => select(option.value)}
            tabIndex={selected ? 0 : -1}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
