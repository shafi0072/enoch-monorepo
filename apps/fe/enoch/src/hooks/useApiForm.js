import React from "react";
import { useForm } from "react-hook-form";
import FormApiError from "../services/FromError";
import { noopFunc } from "../utils";

const _useApiForm = function ({ ...obj }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState([]);
  const { handleSubmit: oldHandleSubmit, setError, ...rest } = useForm(obj);

  const clearFormErrors = React.useCallback(() => {
    setFormErrors([]);
  }, []);

  const handleSubmit = React.useCallback(
    (onSubmit, onError = noopFunc) => {
      return oldHandleSubmit(async (data) => {
        setIsSubmitting(true);
        try {
          await onSubmit(data);
        } catch (e) {
          if (e instanceof FormApiError) {
            for (const f of Reflect.ownKeys(e.errors.fields || {})) {
              setError(f, {
                type: "manual",
                message: e.errors.fields[f][0],
              });
            }
            setFormErrors(e.errors.form);
          } else {
            console.error(e);
          }
          onError(e);
        }
        setIsSubmitting(false);
      });
    },
    [oldHandleSubmit, setError]
  );

  return {
    ...rest,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
    setError,
    formErrors,
    setFormErrors,
    clearFormErrors,
  };
};

export function useApiForm({ onSubmit, onError = noopFunc, ...restInputs }) {
  const { handleSubmit, ...restOutput } = _useApiForm(restInputs);
  const handleFormSubmit = React.useMemo(
    () => handleSubmit(onSubmit, onError),
    [handleSubmit, onSubmit, onError]
  );
  return { handleSubmit: handleFormSubmit, ...restOutput };
}
