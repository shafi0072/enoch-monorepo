import { FieldValues, UseFormRegister } from 'react-hook-form';

type RadioInputProps = {
  type: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  error: any;
};
export const RadioInput = ({ type, register, name, error }: RadioInputProps) => {
  return (
    <>
      <input type={type} {...register(name)} />
      <div className="error-msg">{error?.message}</div>
    </>
  );
};
