import { useCallback, useRef, useState } from 'react';

export type FieldRule = {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: unknown, values: Record<string, unknown>) => string | null | Promise<string | null>;
};

export type FormInstance = {
  getFieldValue: (name: string) => unknown;
  getFieldsValue: () => Record<string, unknown>;
  setFieldValue: (name: string, value: unknown) => void;
  setFieldsValue: (values: Record<string, unknown>) => void;
  getFieldError: (name: string) => string | undefined;
  getFieldsError: () => Record<string, string | undefined>;
  isFieldTouched: (name: string) => boolean;
  validateField: (name: string) => Promise<string | null>;
  validateFields: () => Promise<Record<string, string | null>>;
  resetFields: () => void;
  submit: () => void;

  /** @internal */
  _register: (name: string, rules?: FieldRule[]) => void;
  /** @internal */
  _unregister: (name: string) => void;
  /** @internal */
  _setInitialValues: (v: Record<string, unknown>) => void;
  /** @internal */
  _setOnFinish: (fn: ((values: Record<string, unknown>) => void) | undefined) => void;
  /** @internal */
  _setOnFinishFailed: (fn: ((errors: Record<string, string>) => void) | undefined) => void;
  /** @internal */
  _subscribe: (cb: () => void) => () => void;
  /** @internal */
  _getState: () => FormState;
};

type FormState = {
  values: Record<string, unknown>;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
};

function runRulesSync(value: unknown, rules: FieldRule[]): string | null {
  for (const rule of rules) {
    const strVal = typeof value === 'string' ? value : '';

    if (rule.required) {
      const empty = value == null || strVal.trim() === '';
      if (empty) return rule.message ?? 'This field is required';
    }

    if (rule.min != null && typeof value === 'string' && strVal.length < rule.min) {
      return rule.message ?? `Must be at least ${rule.min} characters`;
    }

    if (rule.max != null && typeof value === 'string' && strVal.length > rule.max) {
      return rule.message ?? `Must be at most ${rule.max} characters`;
    }

    if (rule.pattern && !rule.pattern.test(strVal)) {
      return rule.message ?? 'Invalid format';
    }
  }
  return null;
}

async function runRules(
  value: unknown,
  rules: FieldRule[],
  allValues: Record<string, unknown>,
): Promise<string | null> {
  const syncErr = runRulesSync(value, rules);
  if (syncErr) return syncErr;

  for (const rule of rules) {
    if (rule.validator) {
      const result = await rule.validator(value, allValues);
      if (result) return result;
    }
  }
  return null;
}

export function useForm(): [FormInstance] {
  const storeRef = useRef<{
    state: FormState;
    initialValues: Record<string, unknown>;
    rules: Record<string, FieldRule[]>;
    listeners: Set<() => void>;
    onFinish?: (values: Record<string, unknown>) => void;
    onFinishFailed?: (errors: Record<string, string>) => void;
  } | null>(null);

  if (!storeRef.current) {
    storeRef.current = {
      state: { values: {}, errors: {}, touched: {} },
      initialValues: {},
      rules: {},
      listeners: new Set(),
      onFinish: undefined,
      onFinishFailed: undefined,
    };
  }

  const store = storeRef.current;
  const notify = () => store.listeners.forEach((cb) => cb());

  // Force re-renders of the hook consumer when state changes
  const [, bump] = useState(0);
  const forceUpdate = useCallback(() => bump((n) => n + 1), []);

  const formRef = useRef<FormInstance | null>(null);
  if (!formRef.current) {
    formRef.current = {
      getFieldValue: (name) => store.state.values[name],

      getFieldsValue: () => ({ ...store.state.values }),

      setFieldValue: (name, value) => {
        store.state.values[name] = value;
        store.state.touched[name] = true;
        if (store.state.errors[name]) {
          store.state.errors[name] = undefined;
        }
        notify();
        forceUpdate();
      },

      setFieldsValue: (values) => {
        Object.assign(store.state.values, values);
        notify();
        forceUpdate();
      },

      getFieldError: (name) => store.state.errors[name],

      getFieldsError: () => ({ ...store.state.errors }),

      isFieldTouched: (name) => !!store.state.touched[name],

      validateField: async (name) => {
        const rules = store.rules[name];
        if (!rules || rules.length === 0) return null;
        const error = await runRules(store.state.values[name], rules, store.state.values);
        store.state.errors[name] = error ?? undefined;
        notify();
        forceUpdate();
        return error;
      },

      validateFields: async () => {
        const results: Record<string, string | null> = {};
        const names = Object.keys(store.rules);
        await Promise.all(
          names.map(async (name) => {
            const error = await runRules(
              store.state.values[name],
              store.rules[name],
              store.state.values,
            );
            results[name] = error;
            store.state.errors[name] = error ?? undefined;
          }),
        );
        notify();
        forceUpdate();
        return results;
      },

      resetFields: () => {
        store.state.values = { ...store.initialValues };
        store.state.errors = {};
        store.state.touched = {};
        notify();
        forceUpdate();
      },

      submit: async () => {
        const results = await formRef.current!.validateFields();
        const hasErrors = Object.values(results).some(Boolean);
        if (hasErrors) {
          const errors: Record<string, string> = {};
          for (const [k, v] of Object.entries(results)) {
            if (v) errors[k] = v;
          }
          store.onFinishFailed?.(errors);
        } else {
          store.onFinish?.({ ...store.state.values });
        }
      },

      _register: (name, rules) => {
        if (rules) store.rules[name] = rules;
        if (!(name in store.state.values) && name in store.initialValues) {
          store.state.values[name] = store.initialValues[name];
        }
      },

      _unregister: (name) => {
        delete store.rules[name];
      },

      _setInitialValues: (v) => {
        store.initialValues = v;
        for (const [key, val] of Object.entries(v)) {
          if (!(key in store.state.values)) {
            store.state.values[key] = val;
          }
        }
      },

      _setOnFinish: (fn) => {
        store.onFinish = fn;
      },

      _setOnFinishFailed: (fn) => {
        store.onFinishFailed = fn;
      },

      _subscribe: (cb) => {
        store.listeners.add(cb);
        return () => store.listeners.delete(cb);
      },

      _getState: () => store.state,
    };
  }

  return [formRef.current];
}
