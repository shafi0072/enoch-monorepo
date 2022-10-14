import classnames from "classnames";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputField } from "./InputField";

export type InputFieldProps = {
  type: string;
  placeholder?: string;
  label?: string;
  name?: string;
  register?: any;
  error?: any;
  getFieldState?: any;
  className?: string;
  customclassName?: string;
  parentClassName?: string;
  getValues?: any;
};

export const InputFieldWrapper = ({
  type,
  placeholder,
  label,
  name,
  register,
  error,
  getFieldState,
  className,
  customclassName,
  parentClassName = "sign-form-input",
  getValues,
}: InputFieldProps) => {
  const { invalid } = getFieldState(name);
  const fieldValue = getValues && getValues(name);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);
  const onTogglePasswordIcon = () => {
    setShowPassword(!showPassword);
    setInputType(!showPassword ? "text" : "password");
  };

  return (
    <div className="mb-3">
      {label && <div className="input-label">{label}</div>}
      <div
        className={classnames(
          parentClassName,
          className,
          customclassName,
          "overflow-hidden",
          "mb-1",
          { "error-block": error, "green-boeder": !invalid && fieldValue }
        )}
      >
        <InputField
          {...{
            type: inputType,
            placeholder,
            label,
            register,
            name,
            className,
          }}
        />
        {!invalid && fieldValue && !error && type !== "password" && (
          <span>
            <img src="/images/Check.png" className="img-fluid/" alt="Check" />
          </span>
        )}
        {type === "password" ? (
          <span className="field-icon toggle-password">
            {showPassword ? (
              <AiOutlineEyeInvisible
                style={{ color: "#231F20" }}
                onClick={onTogglePasswordIcon}
              />
            ) : (
              <AiOutlineEye
                style={{ color: "#231F20" }}
                onClick={onTogglePasswordIcon}
              />
            )}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="error-msg pt-1">{error?.message}</div>
    </div>
  );
};
