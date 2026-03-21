import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './Input.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label?: string;
  id: string;
  error?: string;
};

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  disabled = false,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={`art-input-group ${error ? 'art-input-group--error' : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="art-input-group__label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="art-input"
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="art-input-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  label?: string;
  id: string;
  error?: string;
};

export function Textarea({
  label,
  id,
  placeholder,
  error,
  disabled = false,
  rows = 4,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className={`art-input-group ${error ? 'art-input-group--error' : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="art-input-group__label">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className="art-input art-textarea"
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="art-input-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export type SelectOption = { value: string; label: string };

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  label?: string;
  id: string;
  options?: SelectOption[];
  placeholder?: string;
  error?: string;
};

export function Select({
  label,
  id,
  options = [],
  placeholder,
  error,
  disabled = false,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className={`art-input-group ${error ? 'art-input-group--error' : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="art-input-group__label">
          {label}
        </label>
      )}
      <div className="art-select-wrapper">
        <select
          id={id}
          className="art-input art-select"
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="art-select-wrapper__chevron" aria-hidden="true">
          &#9662;
        </span>
      </div>
      {error && (
        <span id={`${id}-error`} className="art-input-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
