import {
  useCallback,
  useState,
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react';
import './Checkbox.css';

export type CheckState = 'unchecked' | 'checked' | 'doubleChecked';

const TRIPLE_ORDER: CheckState[] = ['unchecked', 'checked', 'doubleChecked'];

function nextTripleState(current: CheckState): CheckState {
  const i = TRIPLE_ORDER.indexOf(current);
  const idx = i === -1 ? 0 : i;
  return TRIPLE_ORDER[(idx + 1) % TRIPLE_ORDER.length]!;
}

function tripleAriaLabel(labelText: string, state: CheckState): string {
  const stateWord =
    state === 'unchecked' ? 'unchecked' : state === 'checked' ? 'checked' : 'double checked';
  if (labelText) {
    return `${labelText}, ${stateWord}`;
  }
  return `Checkbox, ${stateWord}`;
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'size'> & {
  id: string;
  children?: ReactNode;
  /** Three-state checkbox (button); mutually exclusive with native `checked` / `onChange` usage patterns. */
  triple?: boolean;
  checkState?: CheckState;
  defaultCheckState?: CheckState;
  onCheckStateChange?: (state: CheckState) => void;
};

export const Checkbox = forwardRef<HTMLInputElement | HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    {
      id,
      children,
      className = '',
      disabled = false,
      triple = false,
      checkState,
      defaultCheckState = 'unchecked',
      onCheckStateChange,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    forwardedRef
  ) {
    const [internalTriple, setInternalTriple] = useState<CheckState>(defaultCheckState);
    const isTripleControlled = checkState !== undefined;
    const tripleState = isTripleControlled ? checkState : internalTriple;

    const setRefs = useCallback(
      (el: HTMLInputElement | HTMLButtonElement | null) => {
        if (typeof forwardedRef === 'function') {
          forwardedRef(el);
        } else         if (forwardedRef) {
          (forwardedRef as MutableRefObject<HTMLInputElement | HTMLButtonElement | null>).current =
            el;
        }
      },
      [forwardedRef]
    );

    const labelText = typeof children === 'string' ? children : '';

    function cycleTriple() {
      if (disabled) return;
      const next = nextTripleState(tripleState);
      if (!isTripleControlled) {
        setInternalTriple(next);
      }
      onCheckStateChange?.(next);
    }

    function onTripleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        cycleTriple();
      }
    }

    if (triple) {
      const faceClass = [
        'art-checkbox__face',
        'art-checkbox__face--triple',
        `art-checkbox__face--${tripleState}`,
      ].join(' ');

      return (
        <label
          className={`art-checkbox art-checkbox--triple${disabled ? ' art-checkbox--disabled' : ''}${className ? ` ${className}` : ''}`}
          htmlFor={id}
        >
          <button
            ref={setRefs as Ref<HTMLButtonElement>}
            type="button"
            id={id}
            role="checkbox"
            disabled={disabled}
            className={`art-checkbox__triple ${faceClass}`}
            aria-checked={tripleState !== 'unchecked'}
            aria-label={tripleAriaLabel(labelText, tripleState)}
            data-check-state={tripleState}
            {...(props as unknown as ButtonHTMLAttributes<HTMLButtonElement>)}
            onClick={cycleTriple}
            onKeyDown={onTripleKeyDown}
          />
          {children != null && children !== '' && (
            <span className="art-checkbox__text">{children}</span>
          )}
        </label>
      );
    }

    const isControlled = checked !== undefined;

    return (
      <label
        className={`art-checkbox${disabled ? ' art-checkbox--disabled' : ''}${className ? ` ${className}` : ''}`}
        htmlFor={id}
      >
        <input
          ref={setRefs as Ref<HTMLInputElement>}
          id={id}
          type="checkbox"
          className="art-checkbox__native"
          disabled={disabled}
          checked={isControlled ? checked : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={onChange}
          {...props}
        />
        <span className="art-checkbox__face" aria-hidden="true" />
        {children != null && children !== '' && (
          <span className="art-checkbox__text">{children}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
