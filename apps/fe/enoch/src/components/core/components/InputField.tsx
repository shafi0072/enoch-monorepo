import classnames from "classnames";
import { InputFieldProps } from "./InputFieldWrapper";

export const InputField = ({
  type,
  placeholder,
  register,
  name,
  className,
}: InputFieldProps) => {
  return (
    <input
      className={classnames(className, "w-100")}
      {...register(name)}
      type={type}
      placeholder={placeholder}
    />
  );
};
