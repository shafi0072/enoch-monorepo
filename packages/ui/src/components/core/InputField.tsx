import { InputFieldProps } from './InputFieldWrapper';

export const InputField = ({ type, placeholder, register, name, className }: InputFieldProps) => {
  return <input className={className} {...register(name)} type={type} placeholder={placeholder} />;
};
