import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  cloneElement,
  isValidElement,
} from 'react';
import type { ReactNode, ReactElement, FormHTMLAttributes } from 'react';
import type { FormInstance, FieldRule } from './useForm';
import { useForm } from './useForm';
import './Form.css';

export type FormLayout = 'vertical' | 'horizontal' | 'inline';

const FormContext = createContext<FormInstance | null>(null);

export function useFormInstance(): FormInstance {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useFormInstance must be used within a <Form>');
  return ctx;
}

/* ─────────────────────────────────────────────
   Form
   ───────────────────────────────────────────── */

export type FormProps = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  form?: FormInstance;
  initialValues?: Record<string, unknown>;
  layout?: FormLayout;
  disabled?: boolean;
  onFinish?: (values: Record<string, unknown>) => void;
  onFinishFailed?: (errors: Record<string, string>) => void;
  children: ReactNode;
};

export function Form({
  form: externalForm,
  initialValues,
  layout = 'vertical',
  disabled = false,
  onFinish,
  onFinishFailed,
  children,
  className = '',
  ...props
}: FormProps) {
  const [internalForm] = useForm();
  const form = externalForm ?? internalForm;

  useEffect(() => {
    if (initialValues) form._setInitialValues(initialValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { form._setOnFinish(onFinish); }, [form, onFinish]);
  useEffect(() => { form._setOnFinishFailed(onFinishFailed); }, [form, onFinishFailed]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      form.submit();
    },
    [form],
  );

  const classes = [
    'art-form',
    `art-form--${layout}`,
    disabled ? 'art-form--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <FormContext.Provider value={form}>
      <form className={classes} onSubmit={handleSubmit} {...props}>
        <fieldset disabled={disabled} className="art-form__fieldset">
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   Form.Item
   ───────────────────────────────────────────── */

export type FormItemProps = {
  name: string;
  label?: ReactNode;
  rules?: FieldRule[];
  children: ReactElement;
  help?: ReactNode;
  /** Override trigger prop name (default: "onChange") */
  trigger?: string;
  /** Override value prop name (default: "value") */
  valuePropName?: string;
  /** Extract value from event — default handles native events and raw values */
  getValueFromEvent?: (...args: unknown[]) => unknown;
};

function defaultGetValue(...args: unknown[]): unknown {
  const first = args[0];
  if (
    first &&
    typeof first === 'object' &&
    'target' in first &&
    (first as { target: { value?: unknown } }).target
  ) {
    return (first as { target: { value: unknown } }).target.value;
  }
  return first;
}

export function FormItem({
  name,
  label,
  rules,
  children,
  help,
  trigger = 'onChange',
  valuePropName = 'value',
  getValueFromEvent = defaultGetValue,
}: FormItemProps) {
  const form = useContext(FormContext);
  if (!form) throw new Error('Form.Item must be used within a <Form>');

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    form._register(name, rules);
    const unsub = form._subscribe(() => forceUpdate((n) => n + 1));
    return () => {
      form._unregister(name);
      unsub();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, name]);

  const value = form.getFieldValue(name) ?? '';
  const error = form.getFieldError(name);
  const fieldId = `form-field-${name}`;

  const handleChange = useCallback(
    (...args: unknown[]) => {
      const val = getValueFromEvent(...args);
      form.setFieldValue(name, val);
    },
    [form, name, getValueFromEvent],
  );

  const handleBlur = useCallback(() => {
    if (form.isFieldTouched(name) && rules && rules.length > 0) {
      form.validateField(name);
    }
  }, [form, name, rules]);

  const isRequired = rules?.some((r) => r.required) ?? false;

  const childProps: Record<string, unknown> = {
    [valuePropName]: value,
    [trigger]: handleChange,
    onBlur: handleBlur,
    id: fieldId,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${fieldId}-error` : undefined,
  };

  if (isValidElement(children)) {
    const existingProps = children.props as Record<string, unknown>;
    if (existingProps.error === undefined && error) {
      childProps.error = error;
    }
    if (existingProps.label === undefined && label) {
      childProps.label = undefined;
    }
  }

  return (
    <div className={`art-form-item ${error ? 'art-form-item--error' : ''}`}>
      {label && (
        <label htmlFor={fieldId} className="art-form-item__label">
          {label}
          {isRequired && <span className="art-form-item__required" aria-hidden>*</span>}
        </label>
      )}
      <div className="art-form-item__control">
        {isValidElement(children) ? cloneElement(children, childProps) : children}
      </div>
      {error && (
        <span id={`${fieldId}-error`} className="art-form-item__error" role="alert">
          {error}
        </span>
      )}
      {help && !error && (
        <span className="art-form-item__help">{help}</span>
      )}
    </div>
  );
}

Form.Item = FormItem;
