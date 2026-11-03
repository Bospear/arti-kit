import {
  createContext,
  useContext,
  useId,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import './Radio.css';

type RadioGroupContextValue = {
  name: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  children?: ReactNode;
  value: string;
};

export function Radio({
  children,
  value,
  id,
  className = '',
  disabled,
  ...props
}: RadioProps) {
  const group = useContext(RadioGroupContext);
  const autoId = useId();
  const inputId = id ?? autoId;
  const name = group?.name ?? props.name;
  const isDisabled = disabled || group?.disabled;
  const checked = group ? group.value === value : props.checked;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e);
    if (e.target.checked) group?.onChange?.(value);
  }

  return (
    <label
      className={`art-radio${isDisabled ? ' art-radio--disabled' : ''}${className ? ` ${className}` : ''}`}
      htmlFor={inputId}
    >
      <input
        {...props}
        id={inputId}
        type="radio"
        className="art-radio__native"
        name={name}
        value={value}
        disabled={isDisabled}
        checked={group ? checked : props.checked}
        defaultChecked={group ? undefined : props.defaultChecked}
        onChange={handleChange}
      />
      <span className="art-radio__face" aria-hidden="true" />
      {children != null && children !== '' && (
        <span className="art-radio__text">{children}</span>
      )}
    </label>
  );
}

export type RadioGroupProps = {
  children: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  legend?: ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
};

export function RadioGroup({
  children,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  legend,
  className = '',
  orientation = 'vertical',
}: RadioGroupProps) {
  const autoName = useId();
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  function handleChange(next: string) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  return (
    <fieldset
      className={`art-radio-group art-radio-group--${orientation}${className ? ` ${className}` : ''}`}
      disabled={disabled}
    >
      {legend != null && <legend className="art-radio-group__legend">{legend}</legend>}
      <RadioGroupContext.Provider
        value={{
          name: name ?? autoName,
          value: current,
          disabled,
          onChange: handleChange,
        }}
      >
        <div className="art-radio-group__options" role="presentation">
          {children}
        </div>
      </RadioGroupContext.Provider>
    </fieldset>
  );
}
