import React from "react";

import styles from "../ComponentClasses.module.css";

interface TextareProps {
  label?: string;

  placeholder?: string;

  name?: string;

  register: any;

  getFieldState?: any;

  error?: any;
}

const Textarea = ({
  label,

  placeholder,

  name,

  register,

  getFieldState,

  error,
}: TextareProps) => {
  const { invalid, isTouched } = getFieldState(name);

  return (
    <div className="d-flex flex-column">
      {label && <label className={`${styles.label} pb-1`}>{label}</label>}

      <div
        className={`${styles.input} border border-2 p-2  ${
          error && "border-danger"
        } ${!invalid && isTouched && "border-success"}`}
      >
        <textarea placeholder={placeholder} {...register(name)} />
      </div>

      {error && (
        <div className={`${styles.font} text-danger`}>{error.message}</div>
      )}
    </div>
  );
};

export default Textarea;
