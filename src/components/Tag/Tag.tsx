import {
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import './Tag.css';

export type TagTone = 'neutral' | 'crimson' | 'azure' | 'bark' | 'steel' | 'gold';

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: TagTone;
  onRemove?: () => void;
  removeLabel?: string;
};

export function Tag({
  children,
  tone = 'neutral',
  onRemove,
  removeLabel = 'Remove',
  className = '',
  ...props
}: TagProps) {
  return (
    <span className={`art-tag art-tag--${tone}${className ? ` ${className}` : ''}`} {...props}>
      <span className="art-tag__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="art-tag__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
}

export type StatusBadgeStatus =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'current';

export type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  status?: StatusBadgeStatus;
  showDot?: boolean;
};

export function StatusBadge({
  children,
  status = 'default',
  showDot = true,
  className = '',
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={`art-status-badge art-status-badge--${status}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {showDot && <span className="art-status-badge__dot" aria-hidden="true" />}
      <span className="art-status-badge__label">{children}</span>
    </span>
  );
}

export type TagSelectorOption = { value: string; label: ReactNode; tone?: TagTone };

export type TagSelectorProps = {
  options: TagSelectorOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
  'aria-label'?: string;
};

export function TagSelector({
  options,
  value,
  defaultValue = [],
  onChange,
  className = '',
  'aria-label': ariaLabel = 'Tag selector',
}: TagSelectorProps) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  function toggle(nextValue: string) {
    const set = new Set(selected);
    if (set.has(nextValue)) set.delete(nextValue);
    else set.add(nextValue);
    const next = Array.from(set);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  return (
    <div
      className={`art-tag-selector${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const active = selected.includes(option.value);
        const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
          type: 'button',
          className: `art-tag art-tag--${option.tone ?? 'neutral'}${active ? ' art-tag--selected' : ''}`,
          'aria-pressed': active,
          onClick: () => toggle(option.value),
        };
        return (
          <button key={option.value} {...buttonProps}>
            <span className="art-tag__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
