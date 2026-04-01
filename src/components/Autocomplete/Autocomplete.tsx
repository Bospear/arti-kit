import { useState, useRef, useEffect, useCallback } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Autocomplete.css';

export type AutocompleteOption = {
  value: string;
  label?: string;
};

export type AutocompleteProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'id' | 'value' | 'onChange' | 'onSelect'
> & {
  id: string;
  label?: string;
  error?: string;
  options: AutocompleteOption[];
  value?: string;
  /** Fires on every keystroke in the text field. */
  onInputChange?: (query: string) => void;
  /** Fires when the user picks an option (click or Enter). */
  onSelect?: (option: AutocompleteOption) => void;
  /** Content shown when no options match the filter. */
  emptyMessage?: ReactNode;
  /** Disable built-in client-side filtering (useful when the parent supplies pre-filtered options). */
  disableFilter?: boolean;
};

export function Autocomplete({
  id,
  label,
  error,
  options,
  value = '',
  onInputChange,
  onSelect,
  placeholder,
  disabled = false,
  className = '',
  emptyMessage = 'No results found',
  disableFilter = false,
  ...props
}: AutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = disableFilter
    ? options
    : options.filter((o) => {
        const text = o.label ?? o.value;
        return text.toLowerCase().includes(query.toLowerCase());
      });

  const openMenu = useCallback(() => {
    if (!disabled) {
      setOpen(true);
      setActiveIndex(-1);
    }
  }, [disabled]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const selectOption = useCallback(
    (option: AutocompleteOption) => {
      setQuery(option.label ?? option.value);
      onSelect?.(option);
      onInputChange?.(option.label ?? option.value);
      closeMenu();
    },
    [onSelect, onInputChange, closeMenu],
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onInputChange?.(val);
    openMenu();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      openMenu();
      e.preventDefault();
      return;
    }

    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i < filtered.length - 1 ? i + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : filtered.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && filtered[activeIndex]) {
          selectOption(filtered[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeMenu();
        break;
      case 'Tab':
        closeMenu();
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [closeMenu]);

  const listboxId = `${id}-listbox`;

  return (
    <div
      ref={rootRef}
      className={`art-input-group ${error ? 'art-input-group--error' : ''} ${className}`.trim()}
    >
      {label && (
        <label htmlFor={id} className="art-input-group__label">
          {label}
        </label>
      )}

      <div className="art-autocomplete">
        <div className="art-select-wrapper">
          <input
            ref={inputRef}
            id={id}
            type="text"
            role="combobox"
            className="art-input art-select"
            placeholder={placeholder}
            disabled={disabled}
            value={query}
            onChange={handleInput}
            onFocus={openMenu}
            onKeyDown={handleKeyDown}
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
            }
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            autoComplete="off"
            {...props}
          />
          <span className="art-select-wrapper__chevron" aria-hidden="true">
            &#9662;
          </span>
        </div>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="art-autocomplete__menu"
          >
            {filtered.length > 0 ? (
              filtered.map((option, i) => (
                <li
                  key={option.value}
                  id={`${id}-option-${i}`}
                  role="option"
                  className={`art-autocomplete__option ${i === activeIndex ? 'art-autocomplete__option--active' : ''}`}
                  aria-selected={i === activeIndex}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(option);
                  }}
                >
                  {option.label ?? option.value}
                </li>
              ))
            ) : (
              <li className="art-autocomplete__empty" role="presentation">
                {emptyMessage}
              </li>
            )}
          </ul>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} className="art-input-group__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
