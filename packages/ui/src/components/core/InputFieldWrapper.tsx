import { InputField } from './InputField';

export type InputFieldProps = {
  type: string;
  placeholder: string;
  label?: string;
  name?: string;
  register?: any;
  error?: any;
  getFieldState?: any;
  className?: string;
};

export const InputFieldWrapper = ({
  type,
  placeholder,
  label,
  name,
  register,
  error,
  getFieldState,
  className
}: InputFieldProps) => {
  const { invalid, isTouched } = getFieldState(name);
  return (
    <>
      <div className="input-label">{label}</div>
      <div className={`sign-form-input ${error && 'error-block'} ${!invalid && isTouched && 'green-boeder'}`}>
        <InputField {...{ type, placeholder, label, register, name, className }} />
        {type === 'password' ? (
          <span className="field-icon toggle-password">
            <img src="/images/eye.png" alt="eye" className="img-fluid eye1" />
            <img src="/images/eye2.png" alt="eye" className="img-fluid eye2" />
          </span>
        ) : (
          ''
        )}
        <div className="error-msg">{error?.message}</div>
      </div>
    </>
  );
};
