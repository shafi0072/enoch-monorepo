import { FieldValues, UseFormRegister } from "react-hook-form";

type RadioInputProps = {
  type: string;
  register: any;
  name: string;
  error: any;
  checked?: boolean;
  handler: () => void;
};
export const RadioInput = ({
  type,
  checked,
  register,
  name,
  error,
  handler,
}: RadioInputProps) => {
  return (
    <>
      <input
        type={type}
        onClick={handler}
        checked={checked}
        {...register(name)}
      />
      <div className="error-msg">{error?.message}</div>
    </>
  );
};
