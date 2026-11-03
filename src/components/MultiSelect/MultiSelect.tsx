import { useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Tag } from '../Tag/Tag';
import './MultiSelect.css';

export type MultiSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type MultiSelectProps = {
  id?: string;
  label?: ReactNode;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
};

export function MultiSelect({
  id,
  label,
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select…',
  disabled = false,
  error,
  helperText,
  className = '',
}: MultiSelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listboxId = `${inputId}-listbox`;
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const selected = isControlled ? value : internal;

  const selectedOptions = useMemo(
    () => options.filter((o) => selected.includes(o.value)),
    [options, selected]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  function commit(next: string[]) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function toggle(optionValue: string) {
    const set = new Set(selected);
    if (set.has(optionValue)) set.delete(optionValue);
    else set.add(optionValue);
    commit(Array.from(set));
  }

  function remove(optionValue: string) {
    commit(selected.filter((v) => v !== optionValue));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !query && selected.length > 0) {
      remove(selected[selected.length - 1]!);
    }
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown') setOpen(true);
  }

  const describedBy = [
    error ? `${inputId}-error` : null,
    helperText ? `${inputId}-helper` : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div
      ref={rootRef}
      className={`art-multiselect art-input-group${error ? ' art-input-group--error' : ''}${disabled ? ' art-multiselect--disabled' : ''}${className ? ` ${className}` : ''}`}
    >
      {label && (
        <label htmlFor={inputId} className="art-input-group__label">
          {label}
        </label>
      )}
      <div
        className="art-multiselect__control"
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
      >
        <div className="art-multiselect__chips">
          {selectedOptions.map((opt) => (
            <Tag
              key={opt.value}
              tone="neutral"
              onRemove={disabled ? undefined : () => remove(opt.value)}
              removeLabel={`Remove ${opt.label}`}
            >
              {opt.label}
            </Tag>
          ))}
          <input
            id={inputId}
            className="art-multiselect__input"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-invalid={!!error}
            aria-describedby={describedBy}
            disabled={disabled}
            placeholder={selectedOptions.length === 0 ? placeholder : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              window.setTimeout(() => {
                if (!rootRef.current?.contains(document.activeElement)) setOpen(false);
              }, 0);
            }}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
      {open && !disabled && (
        <ul id={listboxId} role="listbox" aria-multiselectable="true" className="art-multiselect__list">
          {filtered.length === 0 && (
            <li className="art-multiselect__empty" role="presentation">
              No matches
            </li>
          )}
          {filtered.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={`art-multiselect__option${isSelected ? ' art-multiselect__option--selected' : ''}`}
                  disabled={option.disabled}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggle(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="art-input-group__helper">
          {helperText}
        </span>
      )}
      {error && (
        <span id={`${inputId}-error`} className="art-input-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
