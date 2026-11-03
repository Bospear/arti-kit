import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import './RichTextField.css';

export type RichTextFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  id?: string;
  label?: ReactNode;
  /** Toolbar slot (e.g. bold / italic buttons). */
  toolbar?: ReactNode;
  /** Initial HTML when uncontrolled. */
  defaultValue?: string;
  /**
   * Optional HTML sync when the parent needs to reset the editor.
   * Prefer uncontrolled + `onChange` for typing; setting `value` replaces inner HTML.
   */
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  /** Accessible name when `label` is omitted. */
  'aria-label'?: string;
};

/**
 * Accessible rich-text field shell matching Figma “Rich Text Field”.
 * Provides label, toolbar slot, contentEditable area, and helper/error — not a full editor.
 */
export function RichTextField({
  id: idProp,
  label,
  toolbar,
  defaultValue = '',
  value,
  onChange,
  placeholder,
  helperText,
  error,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: RichTextFieldProps) {
  const genId = useId();
  const id = idProp ?? genId;
  const editorRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy =
    [error ? errorId : null, helperText && !error ? helperId : null].filter(Boolean).join(' ') ||
    undefined;

  useEffect(() => {
    const el = editorRef.current;
    if (!el || seeded.current) return;
    el.innerHTML = defaultValue;
    seeded.current = true;
  }, [defaultValue]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || value === undefined) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value;
    }
  }, [value]);

  return (
    <div
      className={[
        'art-rich-text',
        error ? 'art-rich-text--error' : '',
        disabled ? 'art-rich-text--disabled' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {label != null && label !== '' && (
        <label htmlFor={id} className="art-rich-text__label">
          {label}
        </label>
      )}
      <div className="art-rich-text__frame">
        {toolbar != null && (
          <div className="art-rich-text__toolbar" role="toolbar" aria-label="Formatting">
            {toolbar}
          </div>
        )}
        <div
          ref={editorRef}
          id={id}
          className="art-rich-text__editor"
          role="textbox"
          aria-multiline="true"
          aria-label={label == null || label === '' ? ariaLabel : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-disabled={disabled || undefined}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={(e) => {
            if (disabled) return;
            onChange?.(e.currentTarget.innerHTML);
          }}
        />
      </div>
      {helperText && !error && (
        <span id={helperId} className="art-rich-text__helper">
          {helperText}
        </span>
      )}
      {error && (
        <span id={errorId} className="art-rich-text__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
