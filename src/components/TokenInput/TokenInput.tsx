import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Tag } from '../Tag/Tag';
import './TokenInput.css';

export type TokenInputProps = {
  id?: string;
  label?: ReactNode;
  value?: string[];
  defaultValue?: string[];
  onChange?: (tokens: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  /** Called when a new token is committed; return false to reject. */
  onValidate?: (token: string) => boolean;
  /** Delimiters that commit the current draft (in addition to Enter). */
  delimiters?: string[];
  className?: string;
  'aria-label'?: string;
};

/**
 * Freeform chip/token field. Commit with Enter or configured delimiters;
 * Backspace removes the last token when the draft is empty.
 */
export function TokenInput({
  id,
  label,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Add…',
  disabled = false,
  error,
  helperText,
  onValidate,
  delimiters = [',', ';'],
  className = '',
  'aria-label': ariaLabel,
}: TokenInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [internal, setInternal] = useState(defaultValue);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;
  const tokens = isControlled ? value : internal;

  function commitTokens(next: string[]) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function addToken(raw: string) {
    const token = raw.trim();
    if (!token) return;
    if (tokens.includes(token)) {
      setDraft('');
      return;
    }
    if (onValidate && !onValidate(token)) return;
    commitTokens([...tokens, token]);
    setDraft('');
  }

  function removeToken(token: string) {
    commitTokens(tokens.filter((t) => t !== token));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      addToken(draft);
      return;
    }
    if (e.key === 'Backspace' && draft === '' && tokens.length > 0) {
      e.preventDefault();
      removeToken(tokens[tokens.length - 1]!);
      return;
    }
    if (delimiters.includes(e.key)) {
      e.preventDefault();
      addToken(draft);
    }
  }

  function onBlur() {
    if (draft.trim()) addToken(draft);
  }

  const describedBy = [
    error ? `${inputId}-error` : null,
    helperText && !error ? `${inputId}-helper` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const stateClass = error ? ' art-token-input--error' : '';

  return (
    <div
      className={`art-token-input${stateClass}${className ? ` ${className}` : ''}${disabled ? ' art-token-input--disabled' : ''}`}
    >
      {label != null && label !== '' && (
        <label htmlFor={inputId} className="art-token-input__label">
          {label}
        </label>
      )}
      <div
        className="art-token-input__field"
        onClick={() => inputRef.current?.focus()}
        role="presentation"
      >
        {tokens.map((token) => (
          <Tag
            key={token}
            onRemove={disabled ? undefined : () => removeToken(token)}
            removeLabel={`Remove ${token}`}
          >
            {token}
          </Tag>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          className="art-token-input__input"
          value={draft}
          disabled={disabled}
          placeholder={tokens.length === 0 ? placeholder : undefined}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          aria-label={label == null || label === '' ? ariaLabel : undefined}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </div>
      {helperText && !error && (
        <span id={`${inputId}-helper`} className="art-token-input__helper">
          {helperText}
        </span>
      )}
      {error && (
        <span id={`${inputId}-error`} className="art-token-input__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
