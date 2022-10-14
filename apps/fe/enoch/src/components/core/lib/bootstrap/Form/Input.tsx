import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "../ComponentClasses.module.css";
import { FcCheckmark } from "react-icons/fc";

interface InputProps {
  label?: string;

  placeholder?: string;

  type?: "text" | "number" | "password";

  name?: string;

  register: any;

  error?: any;

  getFieldState?: any;
}

const Input = ({
  label,

  placeholder,

  type = "text",

  name,

  register,

  error,

  getFieldState,
}: InputProps) => {
  const { invalid, isTouched } = getFieldState(name);

  const [reveal, setreveal] = useState<boolean>(false);

  return (
    <div className="d-flex flex-column">
      {label && (
        <label className={`${styles.label} pb-1 text-muted`}>{label}</label>
      )}

      {type === "password" ? (
        <div
          className={`${styles.input} border border-2 p-2 ${
            error && "border-danger"
          } ${!invalid && isTouched && "border-success"}`}
        >
          <input
            type={!reveal ? "text" : "password"}
            placeholder={placeholder}
            name={name}
            {...register(name)}
          />

          <button
            className={styles.buttonIcon}
            onClick={() => setreveal(!reveal)}
          >
            {!reveal ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
      ) : (
        <div
          className={`${styles.input} border border-2 p-2 ${
            error && "border-danger"
          }  ${!invalid && isTouched && "border-success"}`}
        >
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            {...register(name)}
          />

          {!invalid && isTouched && !error && (
            <div className="d-flex align-items-center">
              <FcCheckmark />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className={`${styles.error} text-danger`}>{error.message}</div>
      )}
    </div>
  );
};

export default Input;
