import {
  useId,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import './Slider.css';

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode;
  showValue?: boolean;
  formatValue?: (value: number) => ReactNode;
};

export function Slider({
  id,
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  showValue = true,
  formatValue,
  disabled,
  className = '',
  onChange,
  ...props
}: SliderProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const numeric =
    value !== undefined
      ? Number(value)
      : defaultValue !== undefined
        ? Number(defaultValue)
        : Number(min);
  const display = formatValue ? formatValue(numeric) : numeric;

  return (
    <div className={`art-slider${disabled ? ' art-slider--disabled' : ''}${className ? ` ${className}` : ''}`}>
      {(label || showValue) && (
        <div className="art-slider__header">
          {label && (
            <label htmlFor={inputId} className="art-slider__label">
              {label}
            </label>
          )}
          {showValue && <span className="art-slider__value">{display}</span>}
        </div>
      )}
      <input
        {...props}
        id={inputId}
        type="range"
        className="art-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        style={
          {
            '--art-slider-progress': `${((numeric - Number(min)) / (Number(max) - Number(min) || 1)) * 100}%`,
          } as CSSProperties
        }
      />
    </div>
  );
}
